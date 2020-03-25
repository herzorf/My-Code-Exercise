var div = document.createElement("div");
document.body.appendChild(div);
var lastX;
var lastY;
var flag = false;
div.onmousedown = function (e) {
    lastX = e.clientX;
    lastY = e.clientY;
    flag = true;
}
document.body.onmousemove = function (e) {
    if (flag) {
        var deltaX = e.clientX - lastX;
        var deltaY = e.clientY - lastY;
        div.style.left = (parseInt(div.style.left) || 0) + deltaX + "px";
        div.style.top = (parseInt(div.style.top) || 0) + deltaY + "px";
        lastX = e.clientX;
        lastY = e.clientY;
    }

}
div.onmouseup = function () {
    flag = false;
}