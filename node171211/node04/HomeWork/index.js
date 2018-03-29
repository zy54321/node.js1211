//引入express模块
var express = require("express");
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var fs = require("fs");
//定义用户文件
var ws = fs.createWriteStream("./user.txt");

//初始化
var app = express();

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");//绝对路径
});

app.post("/user",(req,res)=>{
    form.parse(req,(err,args,)=>{ //括号内三个参数分别是 错误  参数  文件
        if (err) {
            console.error(err);
        } else {
            fs.writeFile("./user.txt",JSON.stringify(args),{
                flag:"a"
            },(err)=>{
                //判断写入是否成功
                if (err) {
                    console.error(err);
                } else {
                    console.log("写入成功");
                }
            });
            console.log(args); //获取参数
        }
    });
    res.end();
})

//任何方式请求都可以得到  *指任意符号  没有匹配路由 就进入all
app.all("*",(req,res)=>{
    res.sendFile(__dirname + req.path);
});



//设置端口号
app.listen(8080);



