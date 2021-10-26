function myAlert(text){
	var container;
	var massages = [];
	container = document.getElementById('myAlertContainer');
	if(!container){
		container = document.createElement('DIV');
		text_container = document.createElement('DIV');
		text_container.innerHTML = text;
		container.appendChild(text_container);
		text_container.style.styleFloat = 'left';
		text_container.style.padding = '5px';
		container.style.styleFloat = 'left';
		container.style.boxShadow = '5px 5px 10px 3px #999';
		container.style.borderRadius = '5px';
		container.style.background = '1px solid #000';
		container.style.position = 'absolute';
		container.style.top = window.innerHeight - 50;
		document.body.appendChild(container);
		container.style.left = (window.innerWidth - container.clientWidth)/2;
	}
	
}
