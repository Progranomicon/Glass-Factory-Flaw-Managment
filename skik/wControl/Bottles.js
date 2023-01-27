function Bottles(){
	var w=document.body.clientWidth;
	this.h=document.body.clientHeight;
	
	this.destroy=function(){
		if(this.intervalId!=null){
			clearInterval(this.intervalId);
			if(this.canvas.parentNode) document.body.removeChild(this.canvas);
		}
	};
	this.on=function(text){
		this.unitSize=100;
		this.text=text;
		this.intervalId=null;
		this.canvas=document.createElement('CANVAS');
		document.body.appendChild(this.canvas);
		this.canvas.width = w+this.unitSize+1;
		this.unitsCount=Math.floor(w/this.unitSize)+1;
		this.canvas.height = this.h;
		this.canvas.style.position='fixed';
		this.canvas.style.top='0';
		this.canvas.style.left='0';
		this.canvas.style.zIndex='250';
		
		this.makeWork();
	};
	this.off=function(){
		this.destroy();
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
		for(x=0;x<this.unitsCount;x++){
			/**/
			genBottle(c,{x:x*unitSize, y:baseY});
		}
		var dx=3, trX=0;
		this.intervalId=setInterval(function(){
			trX+=dx;
			if(trX>unitSize){
				trX=0;
				genBottle(c,{x:w,y:baseY});
			}
			c.drawImage(canvas, 0,baseY,w+unitSize,unitSize,-dx,baseY, w+unitSize, unitSize);
		},33);
	}
	function genBottle(c, p){
		var randX=getRandomInt(p.x+10, p.x+50);
		var randY=getRandomInt(p.y+20, p.y+50);
		var randX2=getRandomInt(p.x+10, p.x+30);
		var randY2=getRandomInt(p.y+50, p.y+100);
		var param = {x:p.x,
						  y:p.y,
						  randX:randX, 
						  randY:randY,
						  randX2:randX2, 
						  randY2:randY2,
						  color:getRandomColor(getRandomInt(1,3))
					}
		drawBottle(c,param);
		c.save();
		c.translate(p.x*2+100,0);
		c.scale(-1,1);
		drawBottle(c,param);
		c.restore();
	}
	function getRandomColor(variant){
		var color="#00AA00";
		switch (variant) {
			case 1: //зеленый
				var rb=Number(getRandomInt(50,75)).toString(16);
				color = '#'+rb+Number(getRandomInt(100,150)).toString(16)+rb;
			break;
			case 2: //коричневый
				color="#"+Number(getRandomInt(130,155)).toString(16)+
							Number(getRandomInt(65,80)).toString(16)+"00";
			break;
			case 3: // "бесцветный"
				color="#"+Number(getRandomInt(96,158)).toString(16)+
							Number(getRandomInt(222,235)).toString(16)+
							Number(getRandomInt(240,245)).toString(16);
			break;
		}
		return color;
	}
	function drawBottle(c,p){
		c.fillStyle="#FFFFFF";
		c.fillRect(p.x,p.y,p.x+this.unitSize,p.y+this.unitSize);
		c.fillStyle = p.color;
		
		c.beginPath();
		c.moveTo(p.x+50, p.y)
		c.lineTo(p.x+43, p.y);
		c.lineTo(p.x+43, p.y+20);
		c.lineTo(p.x+45, p.y+20);
		c.lineTo(p.x+45, p.y+30);
		c.bezierCurveTo(p.randX, p.randY, p.randX2, p.randY2,p.x+40, p.y+100);
		c.lineTo(p.x+50, p.y+100);
		c.lineTo(p.x+50, p.y);				
		c.fill();
	}
	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}