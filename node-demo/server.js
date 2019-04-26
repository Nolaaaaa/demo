// 1. 加载http模块
var http = require('http');

// 2. 创建http服务器
// 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数
var server = http.createServer(function (request, response) {
    // 有人访问的时候调用
    console.log("狼来了")
    response.write('Hello World')
    response.end()
})

// 3. 绑定端口
server.listen(8888, 'localhost')

// 4. 执行
console.log('http://localhost:8888')