var debug = 0;
function checkDB(){
	var userGivenId = document.getElementById('user_given_id').value;
	$.ajax('test.php',{type:"GET", data:{task:"checkDB", id:userGivenId},success:reciever, error:error_handler});
}
function reciever(jsonData){
	if (debug) log();
	el('workField').innerHTML = jsonData;
	//var fullData = $.parseJSON(jsonData);
	
}
function error_handler(){
	alert('error');
}
