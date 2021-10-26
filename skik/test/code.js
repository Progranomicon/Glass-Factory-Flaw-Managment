var debug = 0;
function checkDB(){
	$.ajax('test.php',{type:"GET", data:{task:"checkDB"},success:reciever, error:error_handler});
}
function reciever(jsonData){
	if (debug) log();
	el('workField').innerHTML = jsonData;
	//var fullData = $.parseJSON(jsonData);
	
}
function error_handler(){
	alert('error');
}