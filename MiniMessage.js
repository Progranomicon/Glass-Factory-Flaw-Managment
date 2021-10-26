function miniMessage(text){
	var messageDiv = document.createElement('DIV');
		messageDiv.style.styleFloat = 'right';
		messageDiv.style.backgroundColor = '#9cf';
		messageDiv.style.border = '1px solid #000';
		messageDiv.style.boxShadow = '5px 5px 10px 3px #999';
		messageDiv.style.display ='block';
		messageDiv.style.clear ='both';
		messageDiv.style.padding = '5px';
		messageDiv.style.margin = '5px';
		messageDiv.innerHTML = text;
		el('messageDivWraper').appendChild(messageDiv);
		setTimeout(function(){
								el('messageDivWraper').removeChild(messageDiv);
								}, 5000);
	
}
/*var messageDivWraper = document.createElement('DIV');
		messageDivWraper.style.zIndex = '100';
		messageDivWraper.style.position = 'absolute';
		messageDivWraper.style.top = '0px';
		messageDivWraper.style.right = '0px';
		messageDivWraper.style.styleFloat = 'right';
		messageDivWraper.style.display ='block';
		messageDivWraper.style.padding = '5px';
		messageDivWraper.style.width = 'auto';
		document.body.appendChild(messageDivWraper);*/