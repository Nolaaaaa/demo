import { STYLE_MAP, POLYFILL_MAP } from './constants';
import { html2json } from './html2json.js';

const resultList = [];
const canvasId = parseInt(Math.random() * 100000, 10);
Component({
  properties: {
    // html 格式内容
    html: {
      type: String,
      value: '',
      observer: 'htmlHandler'
    },
    // 自定义 canvasId
    canvasId: {
      type: String,
      value: `rich-text-${canvasId}`
    },
  },

  data: {
    // 控制预览蒙层是否展示
    nodes: [],
    showCanvas: false
  },

  methods: {
    htmlHandler(html) {
      const svgList = [];
      const content = html
        // 去除解析出来的视频链接
        .replace(/<a class="video-link".*?\/a>/g, '')
        // svg 标签特殊处理
        .replace(/(<svg .*?\/svg>)/g, (svgContent) => { return `<svg src="${encodeURI(svgContent)}"></svg>` })
        // 去除不支持的标签
        .replace(/<(canvas|audio|iframe) .*?\/\1>/g, '');

      const parsedData = html2json(content, this.data.canvasId);
      const nodes = (parsedData.nodes || []).map(elementPolyfill).map((item) => {
        return toRichNodes(item, svgList);
      });

      this.setData({
        nodes,
        showCanvas: !!svgList.length
      }, () => {
        svgList.length && this.drawSvgImages(svgList);
      });
    },

    // 绘制 svg 图片列表，运行形如：Promise1().then(Promise2).then(Promise3)....
    drawSvgImages(svgList) {
      svgList.reduce((promise, nextSvg) => {
        return promise.then(this.svgDrawerPromise.bind(this, nextSvg));
      }, Promise.resolve()).then(() => {
        this.setSvgImages(() => {
          this.setData({ showCanvas: false });
        });
      }).catch((e) => {
        console.warn('---ERROR---', e);
      });
    },

    // 绘制单个 svg 并生成临时路径
    svgDrawerPromise(svg) {
      const { width, height, src } = svg;
      return new Promise((resolve, reject) => {
        const ctx = wx.createCanvasContext(this.data.canvasId, this);
        ctx.drawImage(src, 0, 0, width, height);
        ctx.draw(false, () => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width,
            height,
            canvasId: this.data.canvasId,
            success: (res) => {
              resultList.push({
                src: res.tempFilePath,
                index: svg.index
              });
              resolve();
            },
            fail: reject
          }, this);
        });
      });
    },

    // 将 svg 转成的 img 标签中的 src 替换成临时文件路径
    setSvgImages(callback) {
      const nodes = this.data.nodes;
      resultList.forEach(({ index, src }) => {
        const indexList = index.split('.');
        let target = indexList.reduce((prev, i) => {
          if (typeof prev === 'object' && Array.isArray(prev.children)) {
            return prev.children[i];
          }
          return prev[i];
        }, nodes);
        typeof target === 'object' && typeof target.attrs === 'object' && (target.attrs.src = src);
      });
      this.setData({
        nodes
      }, callback);
    },
    canvasErrorCallback(e) {
      console.warn('CanvasError: ', e.detail.errMsg);
    }
  }
});

// 用 Data URI Scheme 替代
function handleSvg(content) {
  let svgString = '';
  let imgStyle = '';
  if (content.indexOf('http://www.w3.org') < 0) {
    // 不存在 xmlns 时补上
    svgString = content.replace(/<svg(.*?)>/, (str, $1) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" ${$1}>`;
    });
  } else {
    // 规范 xmlns 写法
    svgString = content.replace(/\s+.*?http:\/\/www\.w3\.org.*?\s+/, ' xmlns="http://www.w3.org/2000/svg" ');
  }
  svgString = svgString.replace(/<svg(.*?)\s+style=('|")(.*?)\2/g, (str, attrs, brace, style) => {
    imgStyle = style;
    return `<svg ${attrs} `;
  });

  const dataURI = `data:image/svg+xml;utf8,${encodeURI(svgString)}`;
  let svgObject = {};

  svgString.replace(/<svg(.*?)\s+viewbox=('|")(.*?)\2/g, (str, attrs, brace, viewboxString) => {
    const [, , width, height] = viewboxString.split(' ');
    svgObject = {
      src: dataURI,
      width,
      height
    };
  });

  // 判断是否有在 canvas 上渲染所需参数
  const isValidSvgObject = svgObject.width
    && typeof +svgObject === 'number'
    && svgObject.height
    && typeof +svgObject.height === 'number';

  return {
    src: isValidSvgObject ? '' : dataURI,
    svgItem: isValidSvgObject ? svgObject : null,
    style: imgStyle
  };
}

function toRichNodes(item, svgList) {
  const { attr = {}, index } = item;
  // 元素节点
  if (item.node === 'element') {
    // svg 特殊处理
    if (item.tag === 'svg') {
      const { src, style, svgItem } = handleSvg(decodeURI(attr.src));
      Array.isArray(svgList) && svgList.push({
        ...svgItem,
        index
      });
      return {
        type: 'node',
        name: 'img',
        attrs: {
          ...attr,
          src,
          style
        }
      };
    }
    return {
      type: 'node',
      name: item.tag,
      attrs: {
        ...attr,
        class: getClass(item.tag, attr.class),
        style: getStyle(item.tag, item.styleStr || '')
      },
      children: (item.nodes || []).map((child) => { return toRichNodes(child, svgList) })
    };
  } else if (item.node === 'text') {
    // 文本节点
    return {
      type: 'text',
      text: item.text
    };
  }
  return {};
}

function getClass(tag, elementClass) {
  let classList = Array.isArray(elementClass) ? elementClass : [elementClass || ''];
  classList.push(tag);
  return classList.join(' ');
}

function getStyle(tag, styleStr) {
  return (STYLE_MAP[tag] || '') + (styleStr || '');
}

function elementPolyfill(item) {
  const tag = POLYFILL_MAP[item.tag] || item.tag;
  return {
    ...item,
    tag,
    nodes: (item.nodes || []).map(elementPolyfill)
  };
}
