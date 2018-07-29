!function(){
    var code = ` 
        .preview{
            /* 设置画布的颜色 */
            background: #fee433;
        }
        .nose{
            /* 定位让鼻子居中 */
            position: absolute;
            left: 50%;
            top: 28px;
            margin-left: -12px;
            /* 以下是画鼻子的扇形 */
            width: 0;
            height: 0;
            border: 12px solid;
            border-color: black transparent transparent;
            border-radius: 12px;
            /* 调整扇形的宽度 */
            border-width: 12px;
        }
        .eye{
            /* 开始画眼黑 */
            background: black;
            width: 49px;
            height: 49px;
            position: absolute;
            border-radius: 50%;
            border: 2px solid black;
        }
        .eye::before{
            /* 画眼睛白 */
            background: white;
            position: absolute;
            content: '';
            width: 24px;
            height: 24px;
            top: 4px;
            left: 2px;
            border: 2px solid black;
            border-radius: 50%;
        }
        .eye.left{
            right: 50%;
            margin-right: 90px;
        }
        .eye.right{
            left: 50%;
            margin-left: 90px;
        }
        .face{
            /* 开始画脸 */
            width: 68px;
            height: 68px;
            border: 2px solid black;
            background: #fc0d1c;
            position: absolute;
            border-radius: 50%;
            top: 40%;
        }
        .face.left{
            right: 50%;
            margin-right: 118px;
        }
        .face.right{
            left: 50%;
            margin-left: 118px;
        }
        .upperLip{
            /* 开始嘴 */
            height: 20px;
            width: 70px;
            position: absolute;
            border: 2px solid black;
            background: #fee433;
            /* 调整鼻子和上嘴唇的距离 */
            top: 48px;
        }
        .upperLip.left{
            border-bottom-left-radius: 40px 25px;
            border-top: none;
            border-right: none;
            transform: rotate(-20deg);
            left: 50%;
            margin-left: -70px;      
        }
        .upperLip.right{
            border-bottom-right-radius: 40px 25px;
            border-top: none;
            border-left: none;
            transform: rotate(20deg);
            right: 50%;
            margin-right: -70px;
        }
        .lowerLip{
            width: 160px;
            height: 1600px;
            background: #990513;
            border-radius: 100px/600px;
            border: 2px solid black;
            position: absolute;
            bottom: 0;
            overflow: hidden;
        }
        .lowerLip::after{
            /* 画舌头 */
            background: red;
            margin-left: -50px;
            left: 50%;
            border-radius: 75px;
        }
        /* 好啦我画完啦，萌萌哒的皮卡丘送给你 */
    `
    //写代码
    writeCode('',code)
    //调速度
    changeSpeed()
    var duration = 50; //速度默认为50
    function writeCode(prefix,code,fn){
        let domCode = document.querySelector('.code')
        let styleTag = document.querySelector('.styleTag')
        domCode.innerHTML = prefix || ''
        let n = 0
        let timer = setTimeout(function run(){
            n += 1
            domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css); //页码放到HTML中同时让代码高亮
            domCode.scrollTop = domCode.scrollHeight
            styleTag.innerHTML = prefix + code.substring(0,n)   //code的内容放code中，文字部分注释起来
            if (n < code.length) {     //停止计时器
                setTimeout(run, duration)
            }else{
                fn&fn.call()
            }
        },duration)
    }
    function changeSpeed(){
        let button = document.querySelector(".actions");
        button.addEventListener('click',function(e){
                let target = e.target   //找到绑定事件的元素
                let speed = target.getAttribute('data-speed')  //获取属性内容
                let meAndBrother = button.children
                for (let i=0;i<meAndBrother.length;i++){
                    meAndBrother[i].classList.remove('active')
                }
                target.classList.add('active')
                if(speed === 'slow') duration = 100 ;
                if(speed === 'normal') duration = 50 ;
                if(speed === 'fast') duration = 10 ;
        },false)
    }

}.call()