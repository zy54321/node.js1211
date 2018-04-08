

/******************************点击抽奖*********************************/
var oStart = document.getElementById("start");
var oGift = document.getElementById("gift");
var oWelName = document.getElementById("welName");
var oLogin = document.getElementById("login");
var flag = true;
oStart.onclick = function () {
    if (flag) {
        var deg = 0;
        flag = false;
        var timer = setInterval(function () {
            deg += 5;
            oGift.style.transform = "rotate(" + deg + "deg)";
        },1);
        // flag = false;
        setTimeout(function () {
            ajax_get("/gift",function (data) {
                clearInterval(timer);
                var speed = 5;
                var deg2 = 0;
                var timer2 = setInterval(function () {
                    if (deg2 < (parseInt(data) + 6) * 60 * 0.3) {
                        speed = 4;
                        deg2 += speed;
                    }
                    if (deg2 < (parseInt(data) + 6) * 60 * 0.54) {
                        speed = 3;
                        deg2 += speed;
                    }
                    if (deg2 < (parseInt(data) + 6) * 60 * 0.70) {
                        speed = 2;
                        deg2 += speed;
                    }
                    if (deg2 < (parseInt(data) + 6) * 60) {
                        speed = 1;
                        deg2 += speed;
                    }
                    oGift.style.transform = "rotate(" + deg2 + "deg)";
                    if (deg2 == (parseInt(data) + 6) * 60) {
                        oGift.style.transform = "rotate(" + parseInt(data) * 60 + "deg)";
                    }
                },20)
            })
        },1000)

    }
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

