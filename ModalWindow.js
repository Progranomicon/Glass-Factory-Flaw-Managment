function ModalWindow(){
	var frameDiv;
	var headerDiv;
	var contentDiv;
	var closeButton;
	var zIn;
	var backWhiteGround;
		
	this.destroy = function(){
		document.body.removeChild(frameDiv);
		frameDiv = null;
	}
	this.hide = function(){
		this.destroy();
	}
	this.show = function(headerText, content_func){
		if(frameDiv!=null) return;
		frameDiv = document.createElement('DIV');
		frameDiv.style.styleFloat = 'left';
		frameDiv.style.position = 'absolute';
		frameDiv.style.backgroundColor = '#FFF';
		frameDiv.style.border = '1px solid #000';
		frameDiv.style.boxShadow = '5px 5px 10px 3px #999';
		frameDiv.style.top = 100;
		frameDiv.style.left = 100;
		frameDiv.style.display ='block';
		frameDiv.style.padding = '5px';
		
		headerDiv = document.createElement('DIV');
		headerDiv.innerHTML = '<b>'+headerText+'</b>';
		frameDiv.appendChild(headerDiv);
		
		contentDiv = document.createElement('DIV');
		frameDiv.appendChild(contentDiv);
		contentDiv.style.paddingTop = '5px';
		document.body.appendChild(frameDiv);
		
		//document.body.style.color = "#ccc";
		
		closeButton = document.createElement('INPUT');
		closeButton.style.cssFloat = 'right';
		closeButton.type = "button";
		closeButton.value = '[X]';
		closeButton.onclick = this.destroy;
		headerDiv.appendChild(closeButton);
		content_func.call(this, contentDiv);
		frameDiv.style.left = (window.innerWidth - frameDiv.clientWidth)/2;
		frameDiv.style.top = window.pageYOffset + 150;
		//alert(window.clientX + " - " + window.clientY);
	}
	
}
var modalWindow = new ModalWindow();