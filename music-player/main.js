//图片按钮
var btn = document.getElementById("photo");
//音乐
var music = document.getElementById("music");
//歌词
var text = document.getElementById("lyrics-content")
//歌词的内容区
var content = document.getElementById("content");
//标记播放还是停止
var flag = false;
btn.onclick = function () {
    if (!flag) {
        flag = true;
        this.className += "rotate"
        music.play();
    } else {
        flag = false;
        this.className = "";
        music.pause()
    }


}

var Irc = text.value;
var IrcArr = Irc.split("[");
var html = "";
for (var i = 0; i < IrcArr.length; i++) {
    var arr = IrcArr[i].split("]")
    var time = arr[0].split(".")
    var timer = time[0].split(":")
    var ms = timer[0] * 60 + timer[1] * 1;
    var text = arr[1];
    if (text) {
        html += "<p id=" + ms + ">" + text + "</p > "
    }
    content.innerHTML = html;
}


var num = 0
var oP = content.getElementsByTagName("p")
music.addEventListener("timeupdate", function () {
    var curTime = parseInt(this.currentTime)
    if (document.getElementById(curTime)) {
        for (var i = 0; i < oP.length; i++) {
            oP[i].style.cssText = "font-size: 15px;"
        }
        document.getElementById(curTime).style.cssText = "background: linear-gradient(-3deg,#eebd89 0%,#d13abd 100%);-webkit-background-clip: text;color: transparent;font-size: 20px;"
        if (oP[7 + num].id == curTime) {
            content.style.top = -20 * num + "px"
            num++
        }
    }
})