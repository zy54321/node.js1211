//定义的常量不能改变,但对象指向的内容是可变的,必须在创建和输出时先赋值
//有块级作用域
const PI = 3.1415926;
// PI = 3.14;
console.log(PI);
const per = {};
per.name = "zy";
per.name = "zzy";
console.log(per);

//解构赋值
let [a,b,c] = [1,2,3];
console.log(a);
console.log(b);
console.log(c);

//Map
const m = new Map();
m.set("name","66啊"); //定义key和value值
m.set("age",33);
m.set(undefined,"un");
console.log(m.get("name")); //get获取key对应的value值
console.log(m.keys()); //获取所有key值
console.log(m.values()); //获取所有的Value值

//箭头函数
var f = v => v; //变量f = function (v) { return v }
console.log(5);
var sun = () => 515;
console.log(sun());
//简化回调函数
var fun = (a,b) => {
    var c = a + b;
    return c;
}
console.log(fun(3,7));