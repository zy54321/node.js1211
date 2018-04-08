
const request = require("request");
const cheerio = require("cheerio");
const url = require("url");
const path = require("path");
const fs = require("fs");

/*
终端环境配置指令
npm  init 初始化
npm  install request --save 请求
npm  install cheerio —save
*/

//爬取地址
let zhihuUrl = "http://daily.zhihu.com";
//爬取数据
let requestData = (requrl)=>{
    //request  网络请求组件
    request(requrl,(err,res,body)=>{
        if (err) {
            console.error(err);
            return;
        }
        //打印爬取网址的body下所有代码0
        // console.log(body);

        //cheerio  类似于jQuery
        $ = cheerio.load(body);
        // console.log($);
        let datas = []; //解析出来的数据
        // console.log($('.link-button'));
        //遍历.link-button标签
        $(".link-button").each((index,element)=>{
            var imgPath = download($(element).find('img').attr('src'),'img');
            let obj = {
                'title':$(element).text(), //text 获取标签内容
                'img':$(element).find('img').attr('src'), //寻找并获取图片src属性
                'url':zhihuUrl + $(element).attr('href') //图片url地址
            }
            datas.push(obj);
        });
        console.log(datas);
    });
};

let download = (imgurl,savePath)=>{
    //解析图片url
    let srcObj = url.parse(imgurl);
    //拼接路径
    let newPath = path.join(__dirname,savePath);
    //判断一下储存图片路径是否存在
    let isExists = fs.existsSync(savePath);
    if (!isExists) {
        //目录不存在就创建目录
        fs.mkdir(newPath,(err)=>{
            if (err) {
                console.error(err);
            } else {
                console.log("创建成功");
            }
        })
    }
    //pathname 可能会包含路径 需要解析出名字
    // srcObj.pathname
    //解析出文件名
    let newImageName = path.parse(srcObj.pathname).base;
    //img存储路径
    let newImagePath = path.join(newPath,newImageName);
    //从网络上下载图片 拷贝到本地指定目录
    request(imgurl).pipe(fs.createWriteStream(newImagePath));
    return newImagePath;
};
//开启请求
requestData(zhihuUrl);

