

/*
中间件
*/
var express = require("express");
var app = express();

/*
中间件特点:
1,每个中间件都可以控制流程是否继续执行
2,每个中间件中的req和res都是同一个对象
3,如果出错,转交给错误处理中间件
4,一个中间件处理完数据可以把响应传递给下一个中间件继续处理
*/

//朝廷拨款赈灾 每个发100两
app.use((req,res,next)=>{
    req.money = 100; //给每个发 100
    next(); //没有next()就会停止执行这条指令
});
//知府
app.use((req,res,next)=>{
    req.money -= 20; //知府贪了 20
    next();
});
//县衙门
app.use((req,res,next)=>{
    req.money -= 50; //县令贪了50
    next("钱被劫了!"); //提示报错信息,可以自定义错误方式,用户出现某种错误可以反馈
});
//报错处理中间件
//当出现错误时自动把错误交给该中间件处理
app.use((err,req,res,next)=>{
    console.error(err);
    res.send(err); //向前端报错
});
//赈灾响应发钱的请求对象
app.all("*",(req,res)=>{
    console.log("发钱");
    res.send("每人发" + req.money); //实际到手30
});
app.listen(8080);

