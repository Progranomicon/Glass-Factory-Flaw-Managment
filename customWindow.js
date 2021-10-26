function CustomWindow(){
	var frameDiv;
	var headerDiv;
	var contentDiv;
	var closeButton;
		
	this.destroy = function(){
		document.body.removeChild(frameDiv);
		frameDiv = null;
	}
	this.hide = function(){
		this.destroy();
	}
	this.show = function(data){
		if(frameDiv!=null) return;
		frameDiv = document.createElement('DIV');
		frameDiv.style.styleFloat = 'left';
		frameDiv.style.position = 'absolute';
		frameDiv.style.backgroundColor = '#FFF';
		frameDiv.style.border = '1px solid #000';
		frameDiv.style.boxShadow = '5px 5px 10px 3px #999';
		frameDiv.style.top = data.view.top;
		frameDiv.style.left = data.view.left;
		frameDiv.style.display ='block';
		frameDiv.style.padding = '5px';
		
		headerDiv = document.createElement('DIV');
		headerDiv.innerHTML = '<b>'+data.view.headerText+'</b>';
		frameDiv.appendChild(headerDiv);
		
		contentDiv = document.createElement('DIV');
		frameDiv.appendChild(contentDiv);
		contentDiv.style.paddingTop = '5px';
		document.body.appendChild(frameDiv);
		
		closeButton = document.createElement('INPUT');
		closeButton.style.cssFloat = 'right';
		closeButton.type = "button";
		closeButton.value = '[X]';
		closeButton.onclick = this.destroy;
		headerDiv.appendChild(closeButton);
		data.contentFunc.call(this, contentDiv);
	}
	
}
//var cWindow = new customWindow();
var testData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Заголовок"
	},
	"contentFunc":function(){
								alert('test text');
							},
	"callback":function(){
								alert('callback call');
						}
}
var customWindow = new CustomWindow();