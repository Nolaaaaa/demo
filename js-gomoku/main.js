(function () {
  let canvas = document.getElementById("canvas");
  if (canvas === null) return false;
  if (canvas.getContext) {

    // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
    let context = canvas.getContext('2d');

    // 画棋盘
    setChecker()
    
    let width = canvas.width/15
    let height = canvas.height/15
    

    // 画棋盘的格子
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        context.strokeRect(width * i, height * j, width, height)
      }
    }

    // 建一个二维数组
    var arr = new Array();
    for (let i = 1; i < 15; i++) {
      arr[i] = new Array()
      for (let j = 1; j < 15; j++) {
        arr[i][j] = 0
      }
    }

    // 下棋
    {
      // 棋子初始化，先下白棋还是黑棋，1 是白的，0是黑的ssss
      let n = 0
      canvas.onmousedown = function (e) {
        if (n === 0) {
          playChess('#000000', width/2.5)
          n = n + 1
        } else if (n === 1) {
          playChess('#ffffff', width/2.5)
          n = n - 1
        }
      }
    }



    /************函数部分不要看***********/

    // 检测所使用的设备，并确定画布的宽高
    function setChecker(){
      // console.log(navigator.platform)
      var viewHeight = Math.floor(window.innerHeight||document.documentElement.clientHeight)
      var viewWidth = Math.floor(window.innerWidth||document.documentElement.clientWidth)
      canvas.width = Math.min(viewWidth, viewHeight) - 60
      canvas.height =  canvas.width

    }

    // 下棋的函数
    function playChess(fillColor, radius) {
      context.fillStyle = fillColor
      context.strokeStyle = '#000000'
      // 点击的坐标位置
      var x = event.layerX
      var y = event.layerY
      var indX = Math.round(x/width)
      var indY = Math.round(y/height)
      
      console.log(arr[indX][indY])
      if(arr[indX][indY] == 1) {
        console.log('这里已经下过啦，换个地方试试')
        return 
      }
      arr[indX][indY] = 1
      // 让棋子下在交叉线的位置
      x = indX * width + 4
      y = indY * height + 4
      drawCircle(x, y, radius)
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