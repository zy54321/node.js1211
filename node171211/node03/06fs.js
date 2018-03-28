

/*
fs
文件操作
目录操作

同步异步,同步优先执行,异步次之
*/

var fs = require("fs");
//异步
fs.readFile("./1.png","",(err,data)=>{
    console.log("我是划分线~~~~~~~~~~~~");
    console.log(data);
    console.log("我是划分线~~~~~~~~~~~~");
});
//同步
var data = fs.readFileSync("./1.png","");
console.log(data);

// 写数据 w覆盖写 a追加写
// 异步
// 1,console
// 2,复制文件的方法 封装成模块 异步&同步两个方法
fs.writeFile("./1.txt","我要写数据",{
    flag:"a"
},(err)=>{
    //判断写入是否成功
    if (err) {
        console.error(err);
    } else {
        console.log("写入成功");
    }
});
//同步
/*fs.writeFileSync("./1.txt","同步写入数据",{
    flag:"a"
})*/
