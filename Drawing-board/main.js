var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "none";
var flag = false;
var position = [0, 0];
ctx.lineWidth = 5;
ctx.lineCap = "round";
if ("ontouchstart" in document.documentElement) {
  canvas.ontouchstart = function (e) {
    position[0] = e.touches[0].clientX;
    position[1] = e.touches[0].clientY;
  };
  canvas.ontouchmove = function (e) {
    draw(position[0], position[1], e.touches[0].clientX, e.touches[0].clientY);
    position[0] = e.touches[0].clientX;
    position[1] = e.touches[0].clientY;
  };
} else {
  canvas.onmousedown = function (e) {
    flag = true;
    position[0] = e.clientX;
    position[1] = e.clientY;
  };

  canvas.onmousemove = function (e) {
    if (flag) {
      draw(position[0], position[1], e.clientX, e.clientY);
      position[0] = e.clientX;
      position[1] = e.clientY;
    }
  };
  canvas.onmouseup = function () {
    flag = false;
  };
}

function draw(starX, starY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(starX, starY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  ctx.stroke();
}
