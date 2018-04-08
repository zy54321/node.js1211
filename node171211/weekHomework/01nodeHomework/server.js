
var express = require("express");
var app = new express();
var formidable = require("formidable");
var fs = require("fs");
//引入mongoose  先在终端输入npm install mongoose
var mongoose = require("mongoose");

//复制页面
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/login", (req,res) => {
    res.sendFile(__dirname + "/login.html");
});

//查询并返回数据库信息
app.post("/login", (req,res) => {
    var form1 = new formidable.IncomingForm();
    form1.parse(req, (err, args, file) => {
        if (err) {
            console.error(err);
        } else {
            console.log(args);
            var user = args;

            //schema: 一种以文件形成存储的数据模型骨架
            var schema = new mongoose.Schema({
                userName:{type:String},
                password:{type:String}
            },{
                collection:"userMes"
            });


            //连接数据库 默认连接到test
            var url = "mongodb://127.0.0.1:27017/node1211";
            var db = mongoose.connect(url,(err)=>{
                if (err) {
                    console.error("连接失败" + err);
                } else {
                    console.log("连接成功");
                }
            });

            //model :由schema构造生成的数据模型
            var Model = mongoose.model("userMes",schema);
            Model.find((err,doc)=>{
                if (err) {
                    console.error(err);
                } else {
                    console.log(doc);
                    var mes = doc;

                    //如果括号内空，默认查第一条.有条件就查符合条件的第一条
                    Model.findOne({userName:user["userName"],password:user["password"]},(err,doc)=>{
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(doc);
                            // res.send("12");
                            if (doc != null) {
                                //跳转
                                res.redirect("http://127.0.0.1:8080/login");
                            }
                        }
                    });
                }
            });
        }
    });

});

//获取注册数据
app.post("/register", (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, args, file) => {
        if (err) {
            console.error(err);
        } else {
            console.log(args);

            //schema: 一种以文件形成存储的数据模型骨架
            var schema = new mongoose.Schema({
                userName:{type:String},
                password:{type:String}
            },{
                collection:"userMes"
            });

            //连接数据库 默认连接到test
            var url = "mongodb://127.0.0.1:27017/node1211";
            var db = mongoose.connect(url,(err)=>{
                if (err) {
                    console.error("连接失败" + err);
                } else {
                    console.log("连接成功");
                }
            });
            //model :由schema构造生成的数据模型
            var Model = mongoose.model("userMes",schema);
            //构建一个文档
            var userMes = new Model({
                userName:args["userName2"],
                password:args["password2"]
            });
            //将文档存储到数据库
            userMes.save((err,doc)=>{
                if (err) {
                    console.error(err);
                } else {
                    console.log(doc);
                }
            });
            res.send("添加用户成功!");
        }
    });
});

//抽奖
app.get("/gift",(req,res)=>{
    var num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    switch (num) {
        case 1:
            res.send("1");
            break;
        case 2:
            res.send("2");
            break;
        case 3:
            res.send("3");
            break;
        case 4:
            res.send("4");
            break;
        case 5:
            res.send("5");
            break;
        case 6:
            res.send("6");
            break;
        default:
            console.log("输入错误");
            break;
    }
});


//网页文件以外的所有文件
app.all("*", (req,res) => {
    res.sendFile(__dirname + req.path);
});

app.listen(8080);
