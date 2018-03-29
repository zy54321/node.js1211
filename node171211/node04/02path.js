
/*
路径处理
*/
var path = require("path");
var str = "./a/b/../d/y/u/../../../q";
//规范化路径 可以理解为化简路径
console.log(path.normalize(str));
//获取当前所在目录文件夹路径
console.log(__dirname); ///Users/dllo/Desktop/node.js1211/node171211/node04
//连接路径
console.log(path.join(__dirname,str,"m")); ///Users/dllo/Desktop/node.js1211/node171211/node04/a/q/m/n


