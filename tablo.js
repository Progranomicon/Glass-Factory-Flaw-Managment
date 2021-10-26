function Tablo(){
	var w=document.body.clientWidth;
	this.h=document.body.clientHeight;
	
	this.on=function(text){
		this.unitSize = 100;
		this.text = text;
		this.intervalId = null;
		this.canvas = document.createElement('CANVAS');
		document.body.appendChild(this.canvas);
		this.canvas.width = w+this.unitSize+1;
		this.canvas.height = this.h;
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = '0';
		this.canvas.style.left = '0';
		this.canvas.style.zIndex = '250';
	};
	this.makeWork=function(){
		var baseY=Math.floor(this.h/2);
		var canvas= this.canvas;
		var unitSize = this.unitSize;
		var c = canvas.getContext('2d');
		c.fillStyle="#FFFFFF";
		c.fillRect(0,baseY-unitSize, w+unitSize+1, unitSize*2+10);
		c.fillStyle="#000000";
		c.font='bold 48px Helvetica';
		c.textAlign='center';
		c.textBaseline='top';
		c.fillText(this.text, w/2, baseY-unitSize+30);
		c.lineWidth="3";
		c.strokeStyle="#000000";
		c.moveTo(0,baseY-unitSize);
		c.lineTo(w,baseY-unitSize);
		c.moveTo(0, baseY+unitSize+10);
		c.lineTo(w, baseY+unitSize+10);
		c.stroke();
		this.intervalId=setInterval(function(){
			c.drawImage(canvas, 0,baseY,w+unitSize,unitSize,-dx,baseY, w+unitSize, unitSize);
		},33);
	}
	
}
var tablo = new Tablo();