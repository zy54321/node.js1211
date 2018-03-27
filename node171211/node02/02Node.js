//require 引入模块
var http = require("http"); //http 实现webserver

var server = http.createServer((req,res) => { //创建一个服务器

    // function (req,res) {}
    // req: request  请求对象 客户端传入数据
    // res: response 响应对象 服务器给客户端的响应
    // console.log(req); //浏览器发送回来的数据
    res.write('<head><meta charset="UTF-8"></head>'); //utf-8编码显示,直接插入到html的head里
    // res.write('<body><div>123</div></body>');
    // res.write("欢迎光临我的网站!"); //向前台响应内容(收)
    // res.write(1); //运行报错,write括号内内容必须是字符串或者buffer

    console.log(req.url); //显示网络地址拼接字段和标题图标
    var url = req.url;
    var data = url.split('?'); //分割字符串
    console.log(data);

    //通过不同拼接字段地址反馈不同数据
    if (req.url == '/home') {
        res.write("这是home页面");
    } else if (data[0] == '/ajax') { //输入的ajax字段拼接为/ajax?name=zy&age=18
        var param = data[1]; //[name=zy&age=18]
        var params = param.split('&'); //['name=zy','age=18']

        var data = {
            "name":params[0].split('=')[1], //['name','zy']
            "age":params[1].split('=')[1] //['age','18']
        };
        //转换成json
        res.end(JSON.stringify(data));
    } else {
        res.write("页面没找到!!");
    }
    res.end();
});

//开启服务器设置端口号 8080 ip:127.0.0.1 本地ip地址
server.listen(8080); //服务器监听