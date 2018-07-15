class Object {
	constructor(obj){
  	this.obj = obj;
    this.ctx = document.querySelector(obj.target).getContext('2d');
    this.canvas = document.querySelector(obj.target);
    this.grav = 1;
    this.dy = 1;
    this.friction = 0.90;
  }
  draw(){
  	const obj = this.obj;
  	this.ctx.clearRect(0,0,this.obj.canvasWidth, this.obj.canvasHeight);
  	this.ctx.beginPath();
    this.canvas.style.borderBottom = '2px solid black';
    this.ctx.arc(obj.x, obj.y, obj.radius, obj.startAngle, obj.endAngle, obj.rotation);
  	if (this.obj.stroke) {
    	this.ctx.strokeStyle = obj.strokeColor;
    	this.ctx.stroke();
    }
    if (this.obj.fill) {
    	this.ctx.fillStyle = obj.fillColor;
    	this.ctx.fill();
    }
    this.ctx.closePath();
  }
  gravity(){
  	if (this.obj.y + this.obj.radius + 1 > this.obj.canvasHeight) {
    	this.dy *= -1 * this.friction;
    } else {
    	this.dy += this.grav;
    }
  	this.obj.y += this.dy;
  }
  run(){
  	if (this.canvas.height !== this.obj.canvasHeight){
    	this.canvas.height = this.obj.canvasHeight;
    }
    if (this.canvas.width !== this.obj.canvasWidth){
    	this.canvas.width = this.obj.canvasWidth;
    }
  	if (this.obj.gravity){
    	this.gravity();
    }
  	this.draw();
  	if(arguments.length > 0){
    	const callback = arguments[0];
    	return callback(this);
    }
  }
}

const circle = new Object({
	fillColor: 'red',
  fill: true,
  x: 300,
  y: 150,
  radius: 10,
  startAngle: 0,
  endAngle: 2*Math.PI,
  rotation: false,
  target: 'canvas',
  gravity: true,
  canvasWidth: 600,
  canvasHeight: 300
});
setInterval(() => {
	circle.run();
}, 1000/60);
