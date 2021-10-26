var user={};
user.access={};
user.access.add_defect="no";
function start_auth(){
	var pass=prompt("Введите свой пароль");
	if (pass!=''){
		$.ajax('/../auth.php',{type:"GET", data:{user_pass:pass},success:proceed_auth, error:error_handler});
	}
	update_time();
}
function proceed_auth(auth_data){
	//alert('DATA:'+auth_data);
	var json_auth_data=$.parseJSON(auth_data);
	if (json_auth_data.authorization=='ok') {
		//alert("Вы "+json_auth_data.user_fio);
		$("#user").html('<a href="javascript:unauth();" style="font-size:1.5em;">'+json_auth_data.user_fio+' (нажмите, чтобы выйти)</a>');
		user.fio=json_auth_data.user_fio;
		user.access=json_auth_data.user_access;
		get_production_list();
		get_production_on_line(current_line);
		main_timer=setInterval(get_state(current_line), 5000);
	}
	if (json_auth_data.authorization=='no') {
		alert("Несуществующий пароль");
	}
}
function unauth(){
	if(confirm('Выйти?')){
		$.ajax('/../auth.php',{type:"GET", data:{unauth:'yes'},success:proceed_unauth, error:error_handler});
		$("#user").html('<a href="javascript:start_auth();" style="font-size:1.5em;color:red">Нажмите для авторизации.</a>');
	}
	if(typeof(main_timer)!='undefined') clearInterval(main_timer);
	update_time();
	user.access={};
	user.access.add_defect="no";
	buildWorkTable();
}
function proceed_unauth(server_response){
}
function is_auth(){
	$.ajax('/../auth.php',{type:"GET", data:{is_auth:"yes"},success:function(state){
		var res=$.parseJSON(state);
		if (res.result=="yes"){
			user.fio=res.user_fio;
			user.access=res.user_access;
			$("#user").html('<a href="javascript:unauth();" style="font-size:1.5em;">'+user.fio+' (нажмите, чтобы выйти)</a>');
		}
		else{
		}
		get_production_on_line(current_line);
		timer(timer_on);
	}, error:error_handler});

}