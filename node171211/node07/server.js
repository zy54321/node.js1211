/**
 * Created by liumingyu on 2018/4/1.
 */
var express = require("express");
var formidable = require("formidable");
var app = express();
//引入mongoose  先在终端输入npm install mongoose
var mongoose = require("mongoose");
//连接数据库 默认连接到test
var url = "mongodb://127.0.0.1:27017/node1211";

var db = mongoose.connect(url,(err)=>{
    if (err) {
        console.error("连接失败" + err);
    } else {
        console.log("连接成功");
    }
});

//schema: 一种以文件形成存储的数据模型骨架
var schema = new mongoose.Schema({
    verity:{type:Number}
},{
    collection:"verity"
});

//model :由schema构造生成的数据模型
var Model = mongoose.model("verity",schema);
//schema: 一种以文件形成存储的数据模型骨架
var schema2 = new mongoose.Schema({
    verity:{type:Number},
    userName:{type:String},
    userPhone:{type:Number},
    giftName:{type:String},
    giftCode:{type:String},
},{
    collection:"user"
});
//model :由schema构造生成的数据模型
var Model2 = mongoose.model("user",schema2);



//复制文件
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/activate.html");//绝对路径
});

//抽奖
app.get("/lotto",(req,res)=>{
    var form = new formidable.IncomingForm();
    //错误   参数  文件
    form.parse(req,(err,args,files)=>{
        if(err){
            console.error(err);
        }else {
            console.log(args);
            var index = get_rand(arr);
            var obj = {
                err:0,
                index:Number(index)
            };
            res.send(obj);
        }
    });
});

//验证申请
var getCode = 0;
app.post("/verify",(req,res)=>{
    //从前台获取验证码
    var form = new formidable.IncomingForm();
    form.parse(req,(err,args,files)=>{
        if (err) {
            console.error(err);
        } else {
            console.log(args);
            getCode = args;

            Model.findOne({verity:getCode["code"]},(err,doc)=>{
                if (err) {
                    console.error(err);
                } else {
                    if (doc == null) {
                        res.send("0");
                    } else {
                        //验证用户验证码是否重复使用
                        Model2.findOne({verity:getCode["code"]},(err,doc)=>{
                            if (err) {
                                console.error(err);
                            } else {
                                if (doc == null) {
                                    res.send("1");
                                    //验证成功获取用户信息入库
                                    //构建一个文档
                                    var user = new Model2({
                                        verity:getCode["code"],
                                        userName:getCode["userName"],
                                        userPhone:getCode["userPhone"],
                                        giftName:"0",
                                        giftCode:"0"
                                    });
                                    //将文档存储到数据库
                                    user.save((err,doc)=>{
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log("66");
                                            console.log(doc);
                                        }
                                    });
                                } else {
                                    res.send("0");
                                }
                            }
                        });

                    }
                }
            });
        }
    });
});

//map
var arr = {
    "1":10,
    "2":10,
    "3":10,
    "4":10,
    "5":10,
    "6":10
};

//验证通过进入抽奖界面
app.post("/login",(req,res)=>{
    //转入抽奖界面
    res.send("/lotto.html");//绝对路径
});

function get_rand(proArr) {
    var result = '';
    //概率数组的总概率精度
    var proSum = 0;
    for(var item in proArr){
        proSum += proArr[item];
    }
    console.log(proSum);
    var result = 0;
    ////概率数组循环
    for(var item in proArr){
        var randNum = Math.floor(Math.random()* proSum);
        if(randNum <= proArr[item]){
            result = item;
            break;
        }else {
            proSum -= proArr[item];
        }
    }
    return result;
}

//获取用户获奖信息并写入数据库
app.post("/gift",(req,res)=>{
    //获取用户获奖信息
    var form = new formidable.IncomingForm();
    form.parse(req,(err,args,files)=>{
        if (err) {
            console.error(err);
        } else {
            console.log(args);
            var userGift = args;

            //修改用户数据
            Model2.update({userPhone:getCode["userPhone"]},{$set:{giftName:userGift["giftName"],giftCode:userGift["giftCode"]}},{multi:true},(err,doc)=>{
                if (err) {
                    console.error(err);
                } else {
                    console.log(doc);
                }
            });
        }
    });
});


app.all("*",(req,res)=>{
    //console.log(req.path);
    res.sendFile(__dirname + req.path);
});

//设置端口号
app.listen(8080);