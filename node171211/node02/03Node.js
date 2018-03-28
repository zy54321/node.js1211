


var http = require("http"); //引入模块
var url = require("url"); //引入url模块
// console.log(url);
//url 模块用于解析url路径和参数
http.createServer((req,res) => {
    //url:
    // method : get 和 post
    //   请求地址和端口/根目录/子目录? 参数
    //  127.0.0.1:8080/home/data?name=啦啦&age=12
    res.write('<head><meta charset="UTF-8"> </head>');
    //解析url  当参数为true时,query解析为对象
    var urlobj = url.parse(req.url,true);

    if (urlobj.pathname == "/home") {
        console.log(urlobj);
        //将url的拼接字段转换成json
        res.write(JSON.stringify(urlobj.query));
    }

    res.end(); //结束请求

}).listen(8080);