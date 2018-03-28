
//fs处理文件的组件  读 写文件
var fs = require("fs");

//异步
/*fs.readFile("./1.txt","utf-8",(err,data)=>{
    console.log(err); //报错提示
    console.log(data); //文本内容
});
console.log("结束");*/

//同步
var data = fs.readFileSync("./1.txt","utf-8"); //阻塞,会按顺序执行
console.log(data);
console.log("结束");
