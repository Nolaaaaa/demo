(function(){
  var canvasname=document.getElementById("canvas");
  if(canvasname.getContext){
      var context=canvasname.getContext('2d');
  }
  setCanvasSize()
  window.onresize=function(){
      setCanvasSize();
  }


  /*******函数部分*******/
  function setCanvasSize(){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
    canvas.width=pageWidth;
    canvas.height=pageHeight;
  }
})()