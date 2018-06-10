/*
window.jQuery = function(nodeOrSelector){
  let nodes = {}
  nodes.addClass = function(){}
  nodes.html = function(){}
  return nodes
}
window.$ = window.jQuery


方法一  funciton(options){}
let url
if(arguments.length === 1){
    url = options.url
}else if(arguments.length === 2){
    url = arguments[0]
    options = arguments[1]
}
let method = options.method
let body = options.method
let successFn = options.successFn
let failFn = options.failFn
let headers = options.headers
方法二  function({url,method,body,successFn,failFn,hearders}){}
ES6解构赋值
let {url,method,body,successFn,failFn,hearders} = options

代码如下：
window.jQuery.ajax = function({url, method, body, successFn, failFn, headers}){
  let request = new XMLHttpRequest()
  request.open(method, url) // 配置request
  for(let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = ()=>{
    if(request.readyState === 4){
      if(request.status >= 200 && request.status < 300){
        successFn.call(undefined, request.responseText)
      }else if(request.status >= 400){
        failFn.call(undefined, request)
      }
    }
  }
  request.send(body)
}

function f1(responseText){}
function f2(responseText){}

myButton.addEventListener('click', (e)=>{
  window.jQuery.ajax({
    url: '/frank',
    method: 'get',
    headers: {
      'content-type':'application/x-www-form-urlencoded',
      'nola': '18'
    },
    successFn: (x)=>{
      f1.call(undefined,x)
      f2.call(undefined,x)
    },
    failFn: (x)=>{
      console.log(x)
      console.log(x.status)
      console.log(x.responseText)
    }
  })
})

方法三  function({url,method,body,hearders}){}
调用Promise，成功了调用resolve，失败了调用reject

*/
window.Promise = function(fn){
    // ...
    return {
      then: function(){}
    }
  }


//封装的函数
window.jQuery.ajax = function({url,method,body,hearders}){
    return new Promise(function(resolve,reject){
        let request = new XMLHttpRequest()
        request.open(method,url)
        for(let key in headers){
            let value = headers[key]
            request.setRequestHeader(key,value)
        }
        request.onreadystatechange=function(){
            if(request.readyState === 4){
                console.log('请求响应完毕了')
                if(request.status >= 200 && request.status < 300){
                    resolve.call(undefined,request.responseText)
                }else if(request.status >= 400){
                    reject.call(undefined,request)
                }
            }
        }
        request.send(body)
    })
}


//调用函数
myButton.addEventListener('click',function(e){
        let promise = window.jQuery.ajax({
            url: '/xxx',
            method: 'get',
            headers: {
                'content-type':'application/x-www-form-urlencoded',
                'nola': '18'
              },
        })  
        promise.then(
          function(text){console.log(text)},      //如果上面的window.jQuery.ajax成功了则调用这个
          function(request){console.log(request)} //失败了调用这个
        )
})