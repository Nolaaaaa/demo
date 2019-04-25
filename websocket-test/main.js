!function(){
  const ws = new WebSocket('ws://121.40.165.18:8800')

  let inputValue = document.getElementById("input").value
  let chatArea = document.getElementById("chat-area")
  let submit = document.getElementById("submit")

  // 检查当前状态
  switch (ws.readyState) {
    case WebSocket.CONNECTING:
      // ...
      break;
  
    case WebSocket.OPEN:
      // ...
      break;
  
    case WebSocket.CLOSING:
      // ...
      break;
  
    case WebSocket.CLOSED:
      // ...
      break;
  
    default:
      // this never happens
      break;
  }

  // 提交服务器发来的消息
  submit.addEventListener('click', function (event) {
    console.log(inputValue)
    createElement('div', inputValue,'left',chatArea)
    // ws.send(inputValue)
  })

  // 获取服务器发来的消息
  ws.onmessage = function(e) {
    console.log(e)
    createElement('div', e.data,'right',chatArea)
  }


  /********************封装的函数部分*******************/

  // 创建一个元素并添加内容，class，并添加到父元素中
  function createElement(tagName,content,className,father) {
    ele = document.createElement(tagName)
    ele.innerHTML = content
    ele.className = className
    father.appendChild(ele)
  }
}()