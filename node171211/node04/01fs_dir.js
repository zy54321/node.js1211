

/*
rwx权限值  r:4  w:2  x:1
所有者 用户组 其他  chmod 修改权限值
*/

var fs = require("fs");
// mkdir 创建目录文件夹
// mode:设置读写执行权限 回调
/*fs.mkdir("test","0777",(err)=>{  //括号内:目录名,mode:设置读写执行权限,回调
    if (err) {
        console.error();
    } else {
        console.log("创建成功!");
    }
});*/

//readdir 读取目录文件夹
fs.readdir("test",(err,files)=>{
    if (err) {
        console.error();
    } else {
        console.log(files); //属于对象
    }
});

//stat 目录详情
fs.stat("test",(err,files)=>{
    if (err) {
        console.error();
    } else {
        console.log(files);
    }
});

//exists 判断目录文件夹是否存在
fs.exists("test/2.txt",(bol)=>{
    if (bol) {
        console.log("存在");
    } else {
        console.log("不存在");
    }
});

//给目录文件夹改名
fs.rename("test/2.txt","test/1.txt",(err)=>{ //括号内
    if (err) {
        console.error();
    } else {
        console.log("改名成功");
    }
});


