var last_update_time="1969-01-01 00:01:00";
function make_work(){
	//alert(last_update_time);
	if (moment().diff(moment(last_update_time),'seconds')>60){
		last_update_time=moment().format('YYYY-MM-DD HH:mm:ss');
		//alert ('update '+last_update_time);
		get_production_on_line(current_line);
		get_state(current_line);
	}
	else{
		//alert(moment().diff(moment(last_update_time),'seconds'));
	}
}
function wait(state){ //0 or 1
	if(state==0) el('waitDiv').style.display='none';
	else el('waitDiv').style.display='block';
}
function SelectLine(state){
	if(state==0) el('lineSelector').style.display='none';
	else {
		el('lineSelector').style.display='block';
		fillLineSelector();
	}
}
function setLine(num){
	//wait(1);
	bottles.on('Загрузка. Жди.');
	current_line=num;
	el('current_line').innerHTML='<a href="javascript:SelectLine(1);" style="border:1px dotted black;">'+num+"</a>";
	SelectLine(0);
	get_production_on_line(current_line);
	get_state(num);
}
function fillLineSelector(){
	el("lineSelector").innerHTML="Выбор линии: <br>";
	for (i=1; i<10; i++){
		if (i==current_line) el("lineSelector").innerHTML+='<div onclick="setLine('+i+')" style="border-color:red;" class="lineSelector">'+i+'</div>';
		else  el("lineSelector").innerHTML+='<div onclick="setLine('+i+')"  class="lineSelector">'+i+'</div>';
	}
}
