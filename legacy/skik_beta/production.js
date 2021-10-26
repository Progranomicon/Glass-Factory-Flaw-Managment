function update_time(){
	if(typeof(machine.moves.result.serverDate)!='undefined'){
		el('today').innerHTML=moment(machine.moves.result.serverDate).format('LLLL');
		//alert("normal time");
	}else{
		el('today').innerHTML=moment("2000-01-01 00:01").format('LLLL');
		//alert("Default time");
	}
}
function set_production_on_line(prod, line){
	var forms=prompt("Введите количество форм");
	var kis = prompt("Введите плановый КИС");
	if (forms && kis) $.ajax('production.php',{type:"GET", data:{set_production:prod, line:current_line, forms:forms, kis:kis},success:function(respond){
	var json_respond=$.parseJSON(respond);
	if(json_respond.result.status=="ok"){
			show_production_selector('off');
			get_production_on_line(current_line);
			get_state();
	}else{
		alert ('Ошибка: '+json_respond.result.message);
	}}, error:error_handler});
	else show_production_selector('off');
}
function get_production_on_line(line){
	$.ajax('production.php',{type:"GET", data:{get_production:"yes", line:line},success:function(prod){
		//alert(prod);
		var json_prod=$.parseJSON(prod);
		getMessage("Получение продукции на линии", json_prod);
		$("#current_production").html('<a href="javascript:show_production_selector(\'on\');">'+json_prod.production.format_name+'['+json_prod.production.id+'] </a><input type="button" onclick="goToPassportPage('+json_prod.production.id+')" value="Паспорт"</a>');
		//alert (json_prod.production.format_name);
	}, error:error_handler});
}
function get_production_list(){
	$.ajax('production.php',{type:"GET", data:{get_production_list:"yes"},success:proceed_get_production_list, error:error_handler});
}
function proceed_get_production_list(prod_list){
	production_list=$.parseJSON(prod_list);
	if (production_list.result.status=='ok'){
		//alert('Все прошло удачно');
		//$("#log").html(prod_list);
	}
	else{
		alert ('Ошибка: '+production_list.result.message );	
	}
}
function fill_list(){
		var str=$("#production_selector_input").get(0).value;
		var list=$("#production_list").get(0);
		list.innerHTML='';
		for (var i in production_list){
			if (i!="result"){
				if(production_list[i].format_name.toLowerCase().indexOf( str.toLowerCase(), 0)>=0){
					var new_elem=document.createElement('A');
					if (production_list[i].color=='зеленый'){
						new_elem.className = "light_green";
					}
					if (production_list[i].color=='коричневый'){
						new_elem.className = "brown";
					}
					new_elem.href="javascript:set_production_on_line("+i+",4)";
					new_elem.innerHTML=highlight(production_list[i].format_name, str)+' ('+production_list[i].count+' шт., '+production_list[i].boxing+')';
					list.appendChild(new_elem);
					list.innerHTML+='<br>';
				}
			}
		}
		if (list.innerHTML=='') list.innerHTML='Нет форматов с '+str+'.';
}
function show_production_selector(action){//show or hide
	if (action=='on'){
		get_production_list();
		$('#production_selector').css('display','block');
		$('#production_selector_input').get(0).value='';
		$('#production_list').html('');
		fill_list();
	}
	if (action=='off'){
		$('#production_selector').css('display','none');
	}
	fade(action);
}
function goToPassportPage(prodId){
	document.location.href="wControl/index.php?mode=2&prodId="+prodId+"&line="+current_line+"&molds="+machineMoldsString;	
}