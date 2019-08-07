
Page({
  data: {
    obj: {
      canvasId: 'pie',                                // String：canvasID
      color: ['#FFA500', '#C0FF3E', '#00FFFF', '#FFD700'], // Array：颜色
      width: [8, 12, 16, 24],                              // Array|Number：圆弧宽度
      degree: [30, 70, 100, 160],                          // Array：度数
      rotate: 120,                                         // Number：旋转角度
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
  onTap() {
    let obj = this.data.obj, step = this.data.step, curPieIndex = this.data.curPieIndex
    // 根据点击的位置不同动态改变 curPieIndex 的值
    /*🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒*/

    // 如果 curPieIndex 值不对，return
    if (curPieIndex > obj.degree.length - 1) return

    // 这个圆弧中点旋转到底部 Math.PI/2 所需要的角度
    let temp = (Math.PI / 2 - (step[curPieIndex] + step[curPieIndex + 1]) / 2) * 180 / Math.PI
    let disRotate = temp > 0 ? temp : 360 + temp      // 从当前开始需要旋转的角度

    // 旋转到目标位置
    let curRotate = JSON.parse(JSON.stringify(obj.rotate))      // 初始角度
    let i = curRotate, timerId = setInterval(() => {
      obj.rotate = i
      this.init(obj)
      i > disRotate + curRotate ? clearInterval(timerId) : i++
    }, 4)

    // 数据存起来
    this.setData({
      obj,
      curPieIndex
    })
  },
})