var fs = require("fs");
fs.readFile("./2.txt","",(err,data)=>{
    console.log(data);
})