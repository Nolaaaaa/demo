(function () {
  // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
  var canvasname = document.getElementById("canvas");
  if (canvasname === null) return false;
  if (canvasname.getContext) {
    var context = canvasname.getContext('2d');

    // 画棋盘
    getViewPort()
  
    // 画棋盘的格子
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        context.strokeRect(canvas.height/15 * j, canvas.width/15 * i, canvas.height/15, canvas.width/15);
      }
    }

    // 下棋
    {
      // 棋子初始化，先下白棋还是黑棋，1 是白的，0是黑的
      var n = 0
      canvas.onmousedown = function (event) {
        if (n === 0) {
          playChess('#000000', 24)
          n = n + 1
        } else if (n === 1) {
          playChess('#ffffff', 24)
          n = n - 1
        }
      }
    }









    /************函数部分不要看***********/
    
    // 检测所使用的设备，并确定画布的宽高
    function getViewPort(){
      // console.log(navigator.platform)
      var viewHeight = window.innerHeight||document.documentElement.clientHeight;
      var viewWidth = window.innerWidth||document.documentElement.clientWidth;
      if(navigator.platform.indexOf('Win') === 0 || navigator.platform.indexOf('Mac') === 0 || navigator.platform.indexOf('iPhone') === 0 || navigator.platform.indexOf('iPhone') === 0 || navigator.platform.indexOf('ipad') === 0){
          canvas.width = Math.min(viewWidth, viewHeight) - 100
          canvas.height = Math.min(viewWidth, viewHeight) - 100
      }
    }

    // 下棋的函数
    function playChess(fillColor, radius) {
      context.fillStyle = fillColor
        context.strokeStyle = '#000000'
        var x = event.layerX;
        var y = event.layerY;
        drawCircle(x, y, radius)
    }

    // 画一个圆的函数
    function drawCircle(x, y, radius) {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    }
  }

})()