//引入require模块
var http = require("http");
//创建服务器
http.createServer((req,res)=>{
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    res.end('Hello World');
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');