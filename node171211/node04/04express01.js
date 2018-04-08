

/*
是一个简洁而灵活的 node.js Web应用框架
1,路由
2,中间件
3,模板引擎
*/

//引入express模块
var express = require("express");

//初始化
var app = express();

// get(path,cb(回调函数));  可以用于复制网页并展示
app.get("/",(req,res)=>{
    //res.send()
    // res.send("express请求");
    res.sendFile(__dirname + "/index.html");//__dirname 绝对路径
});

//收到ajax的请求时返回,返回的内容可以自己定义,取决于大括号内
app.get("/ajaxApi",(req,res)=>{
    var date = new Date();
    res.send(date.toString());
});


app.get("/article/:id/:name",(req,res)=>{
    // console.log(req.query);
    console.log(req.params); //使用路径参数
});

app.post("/formApi",(req,res)=>{
    console.log(req.query); //query解析不了post
    // formidable
    res.send();
})


app.get("/query",(req,res)=>{
    console.log(req.query.name);
    console.log(req.query);
})

//任何方式请求都可以得到  *指任意符号  没有匹配路由 就进入all
app.all("*",(req,res)=>{
    console.log(req.path);
    res.sendFile(__dirname + req.path);
});


//设置端口号
app.listen(8080);

