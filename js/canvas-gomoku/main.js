(function () {
  let canvas = document.getElementById("canvas");
  if (canvas === null) return false;
  if (canvas.getContext) {

    // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
    let context = canvas.getContext('2d');

    // 画棋盘
    setChecker()
    
    const width = canvas.width/15
    const height = canvas.height/15
    

    // 建一个二维数组用来存下过的棋，i 指 y 轴坐标，j 指 x 轴坐标
    const arr = new Array();
    for (let i = 1; i < 15; i++) {
      arr[i] = new Array()
      for (let j = 1; j < 15; j++) {
        arr[i][j] = 0
      }
    }

    // 画棋盘的格子
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        context.strokeRect(width * i, height * j, width, height)
      }
    }

    // 下棋
    {
      // 棋子初始化，先下白棋还是黑棋，2 是白的，1是黑的ssss
      let n = 1
      canvas.onmousedown = function (e) {
        if (n === 1) {
          let a = playChess('#000000', width/2.5, n)
          if(a) n = n + 1
        } else if (n === 2) {
          let a = playChess('#ffffff', width/2.5, n) 
          if(a) n = n - 1
        }
      }
    }




    /************函数部分不要看***********/

    // 检测所使用的设备，并确定画布的宽高
    function setChecker(){
      // console.log(navigator.platform)
      let viewHeight = Math.floor(window.innerHeight||document.documentElement.clientHeight)
      let viewWidth = Math.floor(window.innerWidth||document.documentElement.clientWidth)
      canvas.width = Math.min(viewWidth, viewHeight) - 60
      canvas.height =  canvas.width

    }

    // 下棋的函数
    function playChess(fillColor, radius, n) {
      // 设置棋子内部填充颜色和边的颜色
      context.fillStyle = fillColor
      context.strokeStyle = '#000000'

      // 点击的坐标位置
      let x = event.layerX
      let y = event.layerY
      let indX = Math.round(x/width)
      let indY = Math.round(y/height)

      // 禁止下在边缘上
      if(indX == 0 || indX == 15 || indY == 0 || indY == 15) return false

      // 下过的地方不允许下
      if(arr[indY][indX] !== 0) return false

      // 保存下棋的状态
      arr[indY][indX] = n

      // 让棋子下在交叉线的位置
      x = indX * width + 4
      y = indY * height + 4
      drawCircle(x, y, radius)

      return true
    }


    // 画一个圆的函数
    function drawCircle(x, y, radius) {
      context.beginPath()
      context.arc(x-4, y-4, radius, 0, Math.PI * 2)
      context.fill()
      context.stroke()
    }
  }

})()