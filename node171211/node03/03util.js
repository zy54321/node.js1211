

/*
1,实现继承
2,输出对象
3,验证类型
*/

//引入工具类
var util = require("util");
//call apply
//1,类继承
function Person(name,age) {
    this.name = name;
    this.age = age;
    this.sayHello = ()=>{
        console.log("hello");
    }
}
//定义一个原型 方法  箭头函数不能应用于原型方法
Person.prototype.showName = function () {
    console.log(this.name);
};

function Student(name,age) {
    //要继承构造函数内部的属性和方法可以用call和apply
    //call 将Person里的属性和方法替换自己的上下文
    //call 使用参数列传递  apply 使用数组传递
    // Person.call(this,name,age);
    Person.apply(this,[name,age]);
}

//util 只能继承原型链的属性和方法(包括原型方法)
//ES6 里继承使用class
//括号内先写子类,然后父类
util.inherits(Student,Person); // 先写子类,后写父类

var studentObj = new Student("校长","24");
studentObj.sayHello();
studentObj.showName();
console.log(studentObj.name);



class Car {
    //构造方法
    constructor(color,price){
        this.color = color;
        this,price = price;
    }
    move(){
        console.log("车跑了!");
    }
}
var car = new Car("红","100K");
console.log(car.color);
car.move();
//Byd继承自car
class Byd extends Car {
    constructor(color,price,speed) {
        super(color,price);//super继承Car类属性
        this.speed = speed;
    }
    currSpeed() {
        console.log(this.speed);
    }
}

var byd = new Byd("蓝色","20K","100");
byd.currSpeed();

//输出对象
console.log(studentObj);

console.log(util.inspect(studentObj));

//验证类型
console.log(typeof []);
console.log(util.isArray([]));
