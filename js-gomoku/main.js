(function () {
  // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
  var canvasname = document.getElementById("canvas");
  if (canvasname === null) return false;
  if (canvasname.getContext) {
    var context = canvasname.getContext('2d');

    // 画棋盘
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++)
        context.strokeRect(60 * j, 60 * i, 60, 60);
    }
    
    // 初始化，先下白棋还是黑棋，1 是白的，0是黑的
    var n = 0

    // 点击画布下棋
    canvas.onmouseup = function (event) {
      // console.log(event)

      if (n === 0) {
        //下黑棋
        playChess('#000000', 24)
        n = n + 1
      } else if (n === 1) {
        //下白棋
        playChess('#ffffff', 24)
        n = n - 1
      }
    }


    /************函数部分不要看***********/
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