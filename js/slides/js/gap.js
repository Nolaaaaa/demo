$(document).ready(function(){
  //1  allButtons是DOM节点
  var allButtons=$('#buttons>button') 

  //2  遍历所有的按钮并设置点击效果
  for(var i=0;i<allButtons.length;i++){
    //2.1 鼠标浮动到元素上时
    $(allButtons[i]).on('mouseenter',function(x){
      var index=$(x.currentTarget).index() 
      var n=index
      allButtons.eq(n).trigger('click') 
      activeButton(allButtons.eq(n))
      window.clearInterval(timeId)
      console.log('我到按钮上了，暂停轮播')
    })
    $(allButtons[i]).on('mouseleave',function(x){
      var index=$(x.currentTarget).index() 
      var n=index
      allButtons.eq(n).trigger('click')
      activeButton(allButtons.eq(n))
      timeId=setTimer()
      console.log('我离开按钮了，开始轮播')
    })
    //2.2 元素被点击的时候
    $(allButtons[i]).on('click',function(x){
      //2.2.1找到点击的是第几个元素
      var index=$(x.currentTarget).index()
      //2.2.2算出的距离
      var p=index*(-300)
      //2.2.3添加CSS
      $('#images').css({
        transform:'translate(' + p + 'px)'
      })
      //2.2.4 使点击的当前元素等于n，并给等于n的元素添加red类，再去除red类的同类元素的red类
      var n=index
      activeButton(allButtons.eq(n))
      console.log('点击按钮啦')
    })
  }  

  var n=0
  var size=allButtons.length
  allButtons.eq(n%size).trigger('click') 
  activeButton(allButtons.eq(n%size))

  //3 设置自动轮播
  var timeId=setTimer()
  function setTimer(){
    return setInterval(function(){
    n += 1
    allButtons.eq(n%size).trigger('click')  
    },3000)
    
    console.log('我在自动轮播')
  }

  //4 设置鼠标放上去的时候轮播暂停
  $('.gap').on('mouseenter',function(){
    window.clearInterval(timeId)
    console.log('暂停轮播')
  })

  //5 设置鼠标离开的时候轮播重新开始
  $('.gap').on('mouseleave',function(){
    timeId=setTimer()
    console.log('重新开始轮播')
  })


  /*************************************/
  //一个给当前节点添加颜色并移除其他兄弟节点的颜色的函数 
  function activeButton($button){
    $button.addClass('red').siblings('.red').removeClass('red')
  }

})