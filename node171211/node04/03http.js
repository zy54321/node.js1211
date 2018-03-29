

var http = require("http");
var url = require("url");
var fs = require("fs");
var formidable = require("formidable");

http.createServer((req,res)=>{
    //获取请求地址
    var urlStr = req.url;
    //判断请求方式  GET 或者 POST
    var urlmethod = req.method;
    //解析urlStr地址
    var urlObj = url.parse(urlStr,true)
    // console.log(urlObj);
    //index.html
    if (urlObj.pathname == "/" || urlObj.pathname == "/index.html") {
        //返回index.html数据
        //先读取html数据
        var rs = fs.createReadStream("./index.html");
        //将数据复制给res
        rs.pipe(res);
    } else if (urlObj.pathname == "/formApi") {
        /*var args = null;
        req.on("data",(chunk)=>{ //获取提交的数据
            args += chunk;
            console.log(chunk);
        });
        req.on("end",()=>{
            console.log("读取完成");
            console.log(args);
            res.end(args);
        });*/
        // res.end(JSON.stringify(urlObj));

        //推荐使用方法
        //先在终端npm install formidable 解析form表单生成模块
        var form = new formidable.IncomingForm();
        form.parse(req,(err,args,files)=>{ //括号内三个参数分别是 错误  参数  文件
            if (err) {
                console.error(err);
            } else {
                console.log(args); //获取参数{ username: 'ppppp', password: 'ppppp' }
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log(files); //{ fileId: File {...
                //读取并复制(pipe)缓存图片
                fs.createReadStream(files.fileId.path).pipe(fs.createWriteStream("./upload/" + files.fileId.name));
            }

        });
        res.end();
    } else if (urlObj.pathname == "/ajaxApi") {
        var date = new Date();
        res.end(date.toString());
    } else if (urlObj.pathname != "/favicon.ico") {
        fs.createReadStream("." + urlObj.pathname).pipe(res);
    }else {
        res.end();
    }

}).listen(8080);
