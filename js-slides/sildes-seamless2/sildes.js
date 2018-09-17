$(document).ready(function(){
    let $buttons = $('#buttonWrapper>button')
    let $slides = $('#worksPic')
    let $images = $slides.children('.portfolio .sildes .works .worksPic img')
    let current = 0

    makeFakeSlides()
    $slides.css({transform:'translateX(-940px)'})
    bindEvents()
    $(next).on('click', function(x){
      goToSlide(current+1)
      x.preventDefault() //阻止a的默认跳转
    })
    $(previous).on('click', function(x){
      goToSlide(current-1)
      x.preventDefault()
    })

    let timer = setInterval(function(){
      goToSlide(current+1)
      $('.buttonWrapper button').addClass('highlight')
      
    },2000)
    $('.sildes').on('mouseenter', function(){
      window.clearInterval(timer)
    }).on('mouseleave', function(){
      timer = setInterval(function(){
        goToSlide(current+1)
      },2000)
    })

    function bindEvents(){
      $('#buttonWrapper').on('click', 'button', function(e){
        let $button = $(e.currentTarget) 
        let index = $button.index()
        goToSlide(index)
      })
    }

    //importent
    function goToSlide(index){
      if(index > $buttons.length-1){
        index = 0
      }else if(index <0){
        index = $buttons.length - 1
      }
      console.log('current', 'index')
      console.log(current, index)
      if(current === $buttons.length -1 && index === 0){
        // 最后一张到第一张
        console.log('here')
        $slides.css({transform:`translateX(${-($buttons.length + 1) * 940}px)`})
          .one('transitionend', function(){
            $slides.hide()
            $slides.offset() 
            $slides.css({transform:`translateX(${-(index+1)*940}px)`}).show()
          })
        
      }else if(current === 0 && index === $buttons.length - 1){
        // 第一张到最后一张
        $slides.css({transform:`translateX(0px)`})
          .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*940}px)`}).show()
          })
        
      }else{
        $slides.css({transform:`translateX(${- (index+1) * 940}px)`})
      }
      current = index
    }

    function makeFakeSlides(){
      let $firstCopy = $images.eq(0).clone(true)
      let $lastCopy = $images.eq($images.length-1).clone(true)
    
      $slides.append($firstCopy)
      $slides.prepend($lastCopy)
    }
  })

    