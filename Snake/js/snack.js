//创建一个数组用来保存小方块食物的
var foodElements = [];
var snackElement = [];
//创建食物的对象
function Food(x,y,width,height,color){
	//这个食物有长有宽，有横坐标，有纵坐标，也有颜色
	this.x = x || 0;//设置初始化，如果没有传参数则初始值为20
	this.y = y || 0;
	this.width = width || 20;
	this.height = height || 20;
	this.color = color || "green";
	//为食物添加方法，使食物初始化，出现在地图上,传入地图的参数
	Food.prototype.init = function(map){
		
		//在创建一个食物前先删除之前创建的食物
		Food.prototype.remove();
		//在方法中创建食物的div
		var food = document.createElement("div");
		//把食物放入地图中
		map.appendChild(food);
		food.style.width = this.width + "px";
		food.style.height = this.height +"px";
		food.style.backgroundColor = this.color;
		food.style.position = "absolute";
		this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
		this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.width;
		food.style.left = this.x + "px";
		food.style.top = this.y + "px";
		//把食物放入到数组中
		foodElements.push(food);
	}
	//在原型对象里面添加一个删除食物的函数，当每次食物被吃掉的时候，删除食物，然后删除数组里面的食物
	Food.prototype.remove = function(){
		//找到数组中的那个食物
		for(var i = 0; i < foodElements.length; i++){
			var ele = foodElements[i];
			ele.parentNode.removeChild(ele);
			//删除数组中的食物
			foodElements.splice(i,1);
		}
	}
}

//创建蛇的构造函数
function Snack(width, height, direction){
	//蛇的每部分宽高
	this.width = width||20;
	this.height = height||20;
	this.direction = direction || "right";
	this.body = [
		{x:3,y:2,color:"red"},//头
		{x:2,y:2,color:"orange"},
		{x:1,y:2,color:"orange"}
	]
	
	//为蛇添加方法
	Snack.prototype.init = function(map){
		//先删除之前画的蛇
		Snack.prototype.remove();
		//循环遍历创建蛇
		for(var i = 0; i < this.body.length; i++){
			var obj = this.body[i];
			var snack = document.createElement("div");
			map.appendChild(snack);
			//设置蛇的样式
			snack.style.position = "absolute"
			snack.style.width = this.width + "px";
			snack.style.height = this.height + "px";
			snack.style.left = obj.x * this.width + "px";
			snack.style.top = obj.y * this.height + "px";
			snack.style.backgroundColor = obj.color;
			//把蛇放到数组中
			snackElement.push(snack);
		}
	}
	Snack.prototype.move = function(food,map){
		//改变小蛇身体的坐标位置，实际上就是身体部分div的赋值
		for(var i = this.body.length-1; i > 0; i--){
			//将前一个的div的坐标赋值给后一个，头部除外
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		//判断方向来设置头的位置
		switch(this.direction){
				case "right": this.body[0].x +=1;
					break;
				case "left": this.body[0].x -=1;
					break;
				case "top": this.body[0].y -=1;
					break;
				case "bottom": this.body[0].y +=1;
					break;
			}
		//判断小蛇有没有吃到食物，他们的横纵坐标是否一致
		var HeadX = this.body[0].x*this.width;
		var HeadY = this.body[0].y*this.height;
		if(HeadX == food.x && HeadY == food.y){
			//获取小蛇的尾巴然后加到小蛇里面去
			var last = this.body[this.body.length-1];
			//加到小蛇的body中
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			});
			food.init(map);	
		}
		
	}
	Snack.prototype.remove = function(){
		//找到数组中的那个食物
		for(var i = snackElement.length-1; i >= 0; i--){
			var ele = snackElement[i];
			ele.parentNode.removeChild(ele);
			//删除数组中的食物
			snackElement.splice(i,1);
		}
	}	
}
//游戏的构造函数
function Game(map){
	this.snack = new Snack();
	this.food = new Food();
	this.map = map;
	//游戏开始的方法
	Game.prototype.init = function(){
		//初始化食物
		this.food.init(this.map);
		//初始化蛇
		this.snack.init(this.map);
		//定时器让蛇动起来
		var that = this;
		var timeId = setInterval(function(){
			that.snack.move(that.food,map)
			that.snack.init(map);
			//获取小蛇舌头的最大的横纵坐标的值，然后判断撞墙
			var maxX = map.offsetWidth / that.snack.width;
			var maxY = map.offsetHeight / that.snack.height;
			var snackHeadX = that.snack.body[0].x;
			var snackHeadY = that.snack.body[0].y;
			if(snackHeadX < 0 || snackHeadX >= maxX){
				alert("游戏结束");
				clearInterval(timeId);
			}
			if(snackHeadY < 0 || snackHeadY >= maxY){
				alert("游戏结束");
				clearInterval(timeId);
			}
		},250)
		//为document绑定事件，让小蛇随键盘的按键移动
		document.addEventListener("keydown",function(){
			var event = event||window.event;
			switch(event.keyCode){
				case 37: that.snack.direction = "left";break;
				case 38: that.snack.direction = "top";break;
				case 39: that.snack.direction = "right";break;
				case 40: that.snack.direction = "bottom";break;
			}
		})
		
	}
}

var game = new Game(document.querySelector(".map"));
game.init();

// var food = new Food();
// food.init(document.querySelector(".map"));
// var snack = new Snack();
// snack.init(document.querySelector(".map"));
// setInterval(function(){
// 	snack.move(food,document.querySelector(".map"))
// 	snack.init(document.querySelector(".map"));
// },150)


