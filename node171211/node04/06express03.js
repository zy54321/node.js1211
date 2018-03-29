

/*
模板引擎
*/
var express = require("express");
var app = express();
//使用前先在终端输入 npm install ejs 安装引擎

//指定渲染引擎
app.set("view engine","ejs");
//设置模板文件目录
app.set("views",__dirname); //当前目录路径
app.get("/",(req,res)=>{
    res.render("muban",{
        name:"张三",
        age:18
    });
});
app.listen(8080);
