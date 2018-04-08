var express = require("express");
var formidable = require("formidable");
var app = express();
var fs = require("fs");

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/addUser.html");
});

app.get("/ajax", (req,res) => {
    fs.readFile("./database.txt", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            var fileData = data;
            console.log(fileData);
            res.send(fileData);
        }
    });
});

app.post("/post", (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, args, file) => {
        if (err) {
            console.error(err);
        } else {
            //写入文件时候,将获得的数据转为JSON字符串
            var data = JSON.stringify(args);
            console.log(data);
            fs.writeFile("./database.txt", data + ".", {
                flag:"a"
            }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("写入成功");
                    res.send("添加用户成功!");
                }
            });
        }
    });
});

app.all("*", (req,res) => {
    res.sendFile(__dirname + req.path);
});

app.listen(8080);