function fade(action){
	if (action=='on'){
		$('#fade').css('display','block');
	}
	if (action=='off'){
		$('#fade').css('display','none');
	}
}
function log(text){
	if(debug) el('log').innerHTML=text+'<br><br>'+el('log').innerHTML;
}
function highlight(where, what){
	var pos, how_many;
	var podsvet=where;
		if (what=="") return where;
		if(where.toLowerCase().indexOf( what.toLowerCase(), 0)>=0){
			pos=where.toLowerCase().indexOf( what.toLowerCase(), 0)
			how_many=what.length;
			podsvet=where.substr(0,pos)+'<span style="background-color:lightblue; color:black;">'+where.substr(pos,how_many)+'</span>'+where.substr(pos+how_many,where.length);
		}
	return podsvet;
}
function error_handler(){
	log("Ошибка!");
}
var timer_on=true;
function timer(timer_on){
	make_work();
	if(timer_on){
		setTimeout(function(){timer(timer_on)},10000);
	}
}
function el(id){
	return document.getElementById(id);
}
function jstr(obj){
	return JSON.stringify(obj);
}
function closePopup(){
	$("#popupWindow").css('display','none');
	el("popupHeader").innerHTML="";
	el("popupContent").innerHTML="";
}
function popup(title, content,x,y){ //показать всплывающее окно
	var x=x||100;
	var y=y||100;
	el("popupHeader").innerHTML=title;
	el("popupContent").innerHTML=content;
	el("popupWindow").style.left=x;
	el("popupWindow").style.top=y;
	el("popupWindow").style.display='block';
}
function genTimeSelector(){
	var text="", hourText="", minText="";
	for (var i=0;i<60;i++){
		if (i<24){
			hourText+='<option value="'+i+'">'+i+'</option>';
		}
		minText+='<option value="'+i+'">'+i+'</option>';
	}
	text='<div style="font-size:1.5em;">Часы &nbsp : Минуты<br><select id="hSelector">'+hourText+'</select> : <select id="mSelector">'+minText+'</select></div>';
	return text;
}