
Page({
  data: {
    obj: {
      canvasId: 'pie',                                // String：canvasID
      color: ['#FFA500', '#C0FF3E', '#00FFFF', '#FFD700'], // Array：颜色
      width: [20, 20, 20, 20],                              // Array|Number：圆弧宽度
      degree: [30, 70, 100, 160],                          // Array：度数
      rotate: 0,                                         // Number：旋转角度
      origin: [110, 110],                                  // Array：圆心
      radius: 60,                                          // Number：半径
    },
    step: [],            // 旋转的位置
    curPieIndex: 2,      // 当前点击的 pie 的 index
  },

  onReady() {
    let obj = this.data.obj
    this.init(obj)
  },

  // 圆环图初始化
  init(obj) {
    let context = wx.createCanvasContext(obj.canvasId, this)
    // 如果传入的圆弧宽度是一个数字不是数组，做一下处理
    obj.width = Array.isArray(obj.width) ? obj.width : Array(obj.degree.length).fill(obj.width)
    // 确定圆环的位置
    let step = []
    step[0] = obj.rotate * (1 / 180) * Math.PI
    for (let i = 0; i < obj.degree.length; i++) {
      step[i + 1] = obj.degree[i] * (1 / 180) * Math.PI + step[i]
    }
    // 画圆环
    for (let i = 0; i < obj.degree.length; i++) {
      // 圆环的样式：圆环宽、颜色
      let style = {
        width: obj.width[i],
        color: obj.color[i],
      }
      // 圆环的位置：圆心、起始和结束
      let position = {
        origin: obj.origin,
        start: step[i],
        end: step[i + 1],
      }
      this.drawCircle(context, obj.radius, style, position)
    }
    context.draw()

    // 数据存起来
    this.setData({
      step
    })
  },

  // 画单个圆环
  drawCircle(context, radius, style, position) {
    context.setLineWidth(style.width)
    context.setStrokeStyle(style.color)
    context.beginPath()
    context.arc(position.origin[0], position.origin[1], radius, position.start, position.end, false)
    context.stroke()
  },

  // 点击 pie 的时候
  onTap(e) {
    let obj = this.data.obj, 
        step = this.data.step, 
        curPieIndex = this.data.curPieIndex, 
        delay = 200,
        larger = 4
    // 根据点击的位置不同动态改变 curPieIndex 的值
    wx.canvasGetImageData({
      canvasId: obj.canvasId,
      x: e.detail.x - e.target.offsetLeft,
      y: e.detail.y - e.target.offsetTop,
      width: 1,
      height: 1,
      success: res => {
        const color = [].slice.call(res.data, 0, 3).map(item => {
          const hex = item.toString(16)
          return hex < 16 ? `0${hex}` : hex
        }).join('').toUpperCase()
        curPieIndex = obj.color.findIndex(item => item.indexOf(color) > 0)
        obj.width[curPieIndex] = Number(obj.width[curPieIndex]) + larger

        // 如果 curPieIndex 值不对，return
        if (curPieIndex > obj.degree.length - 1 || curPieIndex < 0) return

        // 这个圆弧中点旋转到底部 Math.PI/2 所需要的角度
        let a = (step[curPieIndex] + step[curPieIndex + 1]) / 2
        a = a > 2 * Math.PI ? a - 2 * Math.PI : a
        let b = (Math.PI / 2 - a) * 180 / Math.PI
        let disRotate = b > 0 ? b : 360 + b      // 从当前开始需要旋转的角度

        // 旋转到目标位置
        obj.rotate = obj.rotate >= 360 ? obj.rotate - 360 : obj.rotate
        let curRotate = JSON.parse(JSON.stringify(obj.rotate))      // 初始角度
        let i = curRotate, timerId = setInterval(() => {
          obj.rotate = i
          this.init(obj)
          i > disRotate + curRotate ? clearInterval(timerId) : i++
        }, 2)
        setTimeout(() => {
          obj.width[curPieIndex] = Number(obj.width[curPieIndex]) - larger
          this.setData({
            obj
          })
        }, delay)
        // 数据存起来
        this.setData({
          obj,
          curPieIndex
        })
      }
    })
  },
})