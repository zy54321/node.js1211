

/******************************点击抽奖*********************************/
var oStart = document.getElementById("start");
var oGift = document.getElementById("gift");
var oWelName = document.getElementById("welName");
var oLogin = document.getElementById("login");
var flag = true;
oStart.onclick = function () {
    /**************************验证用户是否登录*****************************/
    if (oWelName.innerHTML == "") {
        flag = false;
        oLogin.style.display = "block";
    }
    if (flag) {
        var deg = 0;
        flag = false;
        setInterval(function () {
            deg += 2;
            oGift.style.transform = "rotate(" + deg + "deg)";
        },1);
        flag = false;
    }
}
/******************************用户注册*********************************/
var oReferRight = document.getElementById("referRight");
var oZhuce = document.getElementById("zhuce");
oReferRight.onclick = function () {
    oZhuce.style.display = "block";
}

/******************************用户登录*********************************/
var oRefer = document.getElementById("refer");
var oUserName = document.getElementById("userName");
oRefer.onclick = function () {
    oWelName.innerHTML = oUserName.value;
}

//ajax请求函数
function ajax_get(url, fn) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var theData = xhr.responseText;
            if (fn) {
                fn(theData);
            }
        }
    };
    xhr.open("get", url, true);
    xhr.send();
}

