console.log("hello world");
//let ES6新的定义变量,但是有作用域,不允许重复声明变量

{
    var a = 10;
    let b = 110;//let 有作用域的 只在当前代码段,出了括号区域就失效
    console.log(b);

}
console.log(a);
// console.log(b);

var a = [];
//变量是let声明的,当前的i只在本轮循环有效,所以每一次循环的i都是新的变量,所以最后输出的是6
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[9]();
