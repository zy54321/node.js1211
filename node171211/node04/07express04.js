

/*
coolie
*/
//第一步先下载cookie模块  在终端输入 npm install cookie 和 npm install cookie-parser

var express = require("express");
var cookie = require("cookie-parser");
var app = express();

//使用中间件对cookie初始化
app.use(cookie());

app.get("/",(req,res)=>{

    if (req.cookies.login) { //cookies 是多个
        res.send("你已经访问过这个网站");
    } else {
        //需要先创建获取时间
        // var date = new Date();
        // date.setDate(date.getMinutes() + 1);
        res.cookie("login","1",{ //名字name : login  值value : 1
            // expire:date
            //设置cookie过期时间
            maxAge:1000 * 30
        });
        //发送  包含了write和end,相当于write后又end
        res.send("你第一次访问这个网站");
    }

});
app.listen(8080);


