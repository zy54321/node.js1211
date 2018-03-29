

/*
stream 主要大数据文件处理(指几十M的文件)
*/

var fs = require("fs");
var rs = fs.createReadStream("./1.txt");
var ws = fs.createWriteStream("./2.txt");
/*//循环触发  每次读取64
var count = 0;
rs.on("data",(chunk)=>{
    // console.log(chunk);
    count++;
    console.log(count);
    ws.write(chunk,(err)=>{
        if (err) {
            console.error(err);
        } else {
            console.log("本次拷贝成功");
        }
    });
});
rs.on("end",()=>{
    console.log("数据读取结束");
});*/

//上述代码简写
rs.pipe(ws);
