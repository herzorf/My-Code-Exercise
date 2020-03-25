var div = document.createElement("div");
div.style.height = "100px";
div.style.width = "100px";
div.style.border = "1px solid red";
div.style.position = "absolute";
document.body.appendChild(div);
var flag = false;
var position = [0, 0]
div.onmousedown = function (e) {
    flag = true;
    position[0] = e.clientX;
    position[1] = e.clientY;
}

document.onmousemove = function (e) {
    if (flag) {
        console.log(div.style.left)
        var deltaX = e.clientX - position[0];
        var deltaY = e.clientY - position[1];
        div.style.top = (parseInt(div.style.top) || 0) + deltaY + "px";
        div.style.left = (parseInt(div.style.left) || 0) + deltaX + "px";
        console.log(div.style.top)
        position[0] = e.clientX;
        position[1] = e.clientY;
    }
}
document.onmouseup = function () {
    flag = false;
}