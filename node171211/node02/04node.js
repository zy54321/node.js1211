

//node 是模块化开发,将功能拆分成一个个模块
//每个模块只具有特定功能
//需要使用想用功能时,引入模块就可以
// var computer = require("./computer");

var computer = require("computer");
console.log(computer.dd(1,2));
console.log(computer.y);
computer.index.addX(10);