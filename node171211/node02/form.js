


var http = require("http"); //引入模块
var url = require("url"); //引入url模块
//url 模块用于解析url路径和参数
http.createServer((req,res) => {
    res.write('<head><meta charset="UTF-8"> </head>');
    //解析url  当参数为true时,query解析为对象
    var urlobj = url.parse(req.url,true);
    if (urlobj.pathname == "/ajax") {
        res.write(JSON.stringify(urlobj.query));
    }
    res.end(); //结束请求
}).listen(8080);