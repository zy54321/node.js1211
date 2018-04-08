
const request = require("request");
const cheerio = require("cheerio");
const url = require("url");
const path = require("path");
const fs = require("fs");

//爬取地址
let doubanUrl = "http://book.douban.com/tag/";
var index = 0;//计数器
//爬取数据
let requestData = (requrl,tag,page,maxPage)=>{
    //构建url
    let newUrl = requrl + encodeURIComponent(tag) + "?start="+(page * 20)+"&type=T";
    console.log(newUrl);
    //request  网络请求组件
    request(newUrl,(err,res,body)=>{
        if (err) {
            console.error(err);
            return;
        }
        // console.log(body);
        //cheerio  类似于jQuery
        $ = cheerio.load(body);
        // console.log($);
        let datas = []; //解析出来的数据
        $('.subject-item').each((index,element)=>{
            let imgUrl = download($(element).find('img').attr('src'),'doubanImg');
            let obj = {
                'title':$(element).find('h2').text().trim(),
                'author':$(element).find('.pub').text().trim(),
                'rating_nums':$(element).find('.rating_nums').text().trim(),
                'details':$(element).find('p').text().trim(),
                'url':$(element).find('h2 a').attr('href'),
                'img':imgUrl
            }
            console.log(obj);
            datas.push(obj);
        });
        // console.log(datas);
    });
    // console.log("***************************1 page over****************************");
    index++;
    if (index < maxPage) {
        //多页面下载
        requestData(requrl,tag,index,maxPage);
    }
};


//下载图片
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
requestData(doubanUrl,"小说",0,50);

