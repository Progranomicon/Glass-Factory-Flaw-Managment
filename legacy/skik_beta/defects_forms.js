var forms={};
var machineMoldsString="";
var machine;
var moldsOnLine=20;
var allowableFlawShare = 100/moldsOnLine;
var mState={}; // Состояние  машины
var production_list;
var defByMold={};
function set_defect(){
	var flaw_part=parseFloat(validateInput($('#defects_part').val()));
	var corrective_action=$('#action_code').val();
	var form=$("#form_code").val();
	if($('#defects_part').val()==''){
		alert("Укажите процент брака.");
		return;
	}
	if (corrective_action==3){
		if (flaw_part!=allowableFlawShare){
			if(confirm('При MNR значение брака может быть только '+allowableFlawShare+'% \n Это значение будет устоновлено. \n Продолжить?')){
				flaw_part=allowableFlawShare;
			}else{return;};
		}
	}
	//alert(defByMold[parseInt(form)].share);
	if((getFlawSize(form)+flaw_part)>allowableFlawShare){
		alert("Максимальный размер брака по форме: "+allowableFlawShare+"% \n Если вы поставите сюда еще "+flaw_part+"%, то будет уже "+(getFlawSize(form)+flaw_part)+'%  \n Измените % по этому браку или удалите часть имеющихся.');				
		return;
	}
	
	if(corrective_action==4){
		alert("Выбирите корректирующее мероприятие.");
		return;
	}
	//wait(1);
	bottles.on('Ждите. Обработка');
	var param_value=$('#param_value').val();
	var comment=el("comment").value;


	var defect=$("#defect_code").val();
	$.ajax('forms.php',{type:"GET", data:{set_defect:"yes", form:form, defect:defect, line:current_line, flaw_part:flaw_part, param_value:param_value, corrective_action:corrective_action, comment:comment},success:function(prod){
		//alert(prod);
		var json_prod=$.parseJSON(prod);
		show_defects_selector('off','');
		show_def_details_selector('off','');
		if(json_prod.result.status!='ok'){
			alert(json_prod.result.message);
		}
		//alert (json_prod);
		get_state(current_line);
	}, error:error_handler});
}
function setMultiDefect(moldSocket){
	var moldsStr = getMoldsString(moldSocket);
	if(moldsStr=="") {
		alert("Нет форм в секции.")
		return;
	}
	//alert (moldsList);
	show_defects_selector('on', moldsStr);
}
function remove_defect(id, mistake){
	/*if (!confirm("Удалить данный дефект?")){
		return;
	}*/
	mistake=mistake||'no';
	wait(1);
	$.ajax('forms.php',{type:"GET", data:{remove_defect:"yes", id:id, mistake:mistake},success:function(answer){
		var json_answer=$.parseJSON(answer);
		//alert (json_answer.message);
		get_state(current_line);
	}, error:error_handler});
}
function get_state(line){
	$.ajax('forms.php',{type:"GET", data:{get_state:"yes", line:line},success:function(state){
		//log(state);
		machine=$.parseJSON(state);
		getMessage("Получение статуса", machine);
		buildMachineState();
		update_time();
	}, error:error_handler});
}
function buildMachineState(){
	defByMold={};
	for(var i in machine.defects){
		if (i!="result"){		
			if (defByMold[machine.defects[i].form_number]==undefined){
				defByMold[machine.defects[i].form_number]={};
			}
			defByMold[machine.defects[i].form_number][i]=machine.defects[i];
		}
	}
	mState={};
	for(var i in machine.moves){
		if (i!="result"){		
			if (mState[machine.moves[i].section]==undefined){
				mState[machine.moves[i].section]={};
			}
			mState[machine.moves[i].section][machine.moves[i].position]={"form_number":machine.moves[i].form_number,"date_time":machine.moves[i].date_time, "share":0};
			mState[machine.moves[i].section][machine.moves[i].position].defects=defByMold[machine.moves[i].form_number];
			if(machine.moves[i].form_number=="0"){
				mState[machine.moves[i].section][machine.moves[i].position]=null;
			}
		}
	}
	//log(JSON.stringify(mState));
	buildWorkTable();
	
	machineMoldsString="";
	var msMolsd="", delim="";
	for (var ms=1; ms<4; ms++){
		msMolds="";
		msMolds=getMoldsString(ms);
		if (msMolds!=''){
			machineMoldsString+=delim+msMolds;
			delim=",";
		}
	}
	//alert(machineMoldsString);
}
function buildWorkTable(){
	var tableHtml='<table class="main_table" width="100%" cellspacing="0" cellpadding="4" border="1" align="center"><tr><th>Секция<br></th><th colspan="2"><a href="javascript:setMultiDefect(1)">Внешние</a></th><th colspan="2"><a href="javascript:setMultiDefect(2)">Средние</a></th><th colspan="2"><a href="javascript:setMultiDefect(3)">Внутренние</a></th></tr><tr><th width="5%">№</th><th width="7%">№ формы</th><th width="23%">Дефект</th><th width="7%">№ формы</th><th width="23%">Дефект</th><th width="7%">№ формы</th><th width="23%">Дефект</th></tr>';
	var totalShare=0;
	for (var a=1;a<11;a++){
		tableHtml+='<tr><td>'+a+'</td>';
		for (var b=1;b<4;b++){
			if(mState[a]){
				if(mState[a][b]){
					tableHtml+=printCell(a,b);
					totalShare+=mState[a][b].share;
				}else{tableHtml+=printEmpty(a,b);}
			}else{tableHtml+=printEmpty(a,b);}
		}
		tableHtml+='</tr>';
	}
	tableHtml+='<tr><td colspan="7" style=def_div>Сейчас всего висит: <strong>'+totalShare.toFixed(2)+'% </strong>брака, <input type="button" value="Снять ВСЕ браки" onclick="removeAllFlaw()"> <input type="button" value="Снять ВСЕ формы" onclick="unmountAllMolds()"> </td></tr>';
	tableHtml+='</table>';
	$("#main_table").html('');
	$("#main_table").html(tableHtml);
	wait(0);
	bottles.off();
}
function printCell(row,col){
	var cell=mState[row][col];
	var html="";
	var innerCellHtml="";
	var lvl=0;
	var share=0;
	var sizeClass="";
	if (user.access.add_defect!="yes"){
		sizeClass="smallFont";
	}
	html+='<td class="form_item '+sizeClass+'" onclick="show_form_selector(\'on\', '+row+', '+col+')"><b>'+cell.form_number+'</b><div style="font-size:1em;">'+moment(machine.moves.result.serverDate).preciseDiff(moment(cell.date_time))+'</div></td>';
	//log(row+", "+col+"---"+jstr(cell.defects));
	innerCellHtml='<div class="norma '+sizeClass+'">Норма</div>';
	if(cell.defects){
		innerCellHtml="";
		for(var def in cell.defects){
			if(lvl<cell.defects[def].corrective_action) lvl=cell.defects[def].corrective_action;
			innerCellHtml+='<div class="def_div hoverable '+sizeClass+'" onclick="remove_defect('+cell.defects[def].id+')">'+defects[cell.defects[def].defect].title;
			innerCellHtml+=", "+cell.defects[def].flaw_part+"%";
			if(cell.defects[def].corrective_action==3) innerCellHtml+=", "+corrective_actions[cell.defects[def].corrective_action].title
			cell.share+=parseFloat(cell.defects[def].flaw_part);
			if (cell.defects[def].param_value) innerCellHtml+="</br>Знач: "+cell.defects[def].param_value;
			if (cell.defects[def].comment!="NULL") innerCellHtml+=", <u>"+cell.defects[def].comment+"</u>";
			innerCellHtml+="</div>";
		}
	}
	
	if(cell.share) innerCellHtml='<div class="floatShare"><strong>'+parseFloat(cell.share.toFixed(2))+'%</strong></div>'+innerCellHtml;
	if (user.access.add_defect=="yes"){
		innerCellHtml+='<div class="def_div setDefectDiv" onclick="show_defects_selector(\'on\','+cell.form_number+')"><strong>[+]</strong> Установить дефект</div>';
	}
	html+='<td class="'+corrective_actions[lvl].cellClass+'">'+innerCellHtml+'</td>';
	return html;
}
function printEmpty(a,b){
	return '<td class="form_item nd " onclick="show_form_selector(\'on\', '+a+', '+b+')" style="font-size:0.75em">Нет \n формы</td><td class="nd">---</td>';
}
function removeAllFlaw(){
	if(!confirm("Все браки будут закрыты. Продолжить?")){
		return;
	}
	wait(1);
	//alert("all flaw removed");
	$.ajax('forms.php',{type:"GET", data:{remove_all_defects:"yes", line:current_line},success:function(answer){
		//alert(answer);
		parsedAnswer = $.parseJSON(answer);
		alert(parsedAnswer.message);
		update_time();
		get_state(current_line);
	}, error:error_handler});
}
function show_defects_selector(action,form){
	if (form!=undefined){
		$("#form_code").val(form);
	}
	if (action=='on'){
		$('#defects_selector').css('display','block');
		$('#defects_selector_input').val('');
		$('#defects_list').html('');
		fill_defects_list();
	}
	if (action=='off'){
		$('#defects_selector').css('display','none');
	}
	fade(action);
}
function fill_defects_list(){
		var str=$("#defects_selector_input").val();
		var list=$("#defects_list").get(0);
		var form= $("#form_code").val();
		list.innerHTML='';
		for (var i in defects){
			if(defects[i].title.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
				var new_elem=document.createElement('A');
				if (defects[i].level==3) new_elem.className = "red";
				if (defects[i].level==2) new_elem.className = "orange";
				if (defects[i].level==1) new_elem.className = "yellow";
				new_elem.href="javascript:show_def_details_selector('on',"+i+")";
				new_elem.innerHTML=highlight(defects[i].title, str);
				list.appendChild(new_elem);
				list.innerHTML+='<br>';
			}
		}
		if (list.innerHTML=='') list.innerHTML='Нет дефектов с '+str+'.';
}
function show_def_details_selector(action, def_code){
	$("#defect_code").val(def_code);
	$("#action_code").val('');
	if (action=='on'){
		$('#def_details_selector').css('display','block');
		$('#action_selector').html(action_click(4, corrective_actions));
		$('#selected_defect').html(defects[def_code].title);
		show_defects_selector('off');
	}
	if (action=='off'){
		$('#def_details_selector').css('display','none');
	}
	fade(action);
}
function action_click(code,codes){
	var returned_html='';
	$('#action_code').val(code);
	for (var i in codes){
		if(i>0)
			if (i==code){
				returned_html+='<div class="selector_item" onclick="action_click('+i+',corrective_actions);" style="border-color:'+codes[i].color+';background-color:'+codes[i].color+'">'+codes[i].title+'</div>';
				$('#action_selector').val(i);
			}
			else{
				returned_html+='<div class="selector_item" onclick="action_click('+i+',corrective_actions);" style="border-color:'+codes[i].color+'">'+codes[i].title+'</div>';
			}
	}
	$('#action_selector').html(returned_html);
	if (code==3) $('#defects_part').val(allowableFlawShare);
}
function set_form(form,sec,pos){
	//alert(JSON.stringify(forms)+'-'+form);
	if (defByMold[form]!==undefined){
		alert("Такая форма уже есть.");
		return;
	}
	if (mState[sec])
		if (mState[sec][pos])
			if(mState[sec][pos].defects!=undefined){
				alert("При смене формы сначала следует убрать дефекты.");
				return;
			}
	wait(1);
	$.ajax('forms.php',{type:"GET", data:{set_form:"yes", form:form, section:sec, position:pos, line:current_line},success:function(prod){
		var json_prod=$.parseJSON(prod);
		//alert (prod);
		get_state(current_line);
		show_form_selector('off');
	}, error:error_handler});
}
function unmountAllMolds(){
	for(var sec=1;sec<11; sec++){
		if (mState[sec])
			for (var pos in mState[sec])
			if (mState[sec][pos])
				if(mState[sec][pos].defects!=undefined){
					alert("При смене формы сначала следует убрать дефекты.");
					return;
				}
	}
	//wait(1);
	bottles.on('Снимаю формы');
	$.ajax('forms.php',{type:"GET", data:{unmountAllMolds:"yes", line:current_line},success:function(prod){
		var json_prod=$.parseJSON(prod);
		//alert (prod);
		get_state(current_line);
		show_form_selector('off');
		bottles.off();
		
	}, error:error_handler});
}
function show_form_selector(action, sec, pos){
	if (action=='on'){
	$('#form_selector').css('display','block');
	var form_list_html='';
		for(var i=0;i<100;i++){
			if (i==0){
				form_list_html+='<div class="float_div_item" onclick="set_form('+i+','+sec+','+pos+')" style="width:650px; background-color:#FF9999">Снять форму</div>';
			}
			else{
				form_list_html+='<div class="float_div_item" onclick="set_form('+i+','+sec+','+pos+')">'+i+'</div>';
			}
		}
		$('#form_list').html(form_list_html);
	}
	if (action=='off'){
		$('#form_selector').css('display','none');
	}
	fade(action);
}
function validateInput(str){
	var pos;
	var result=str;
		if(str.indexOf(',', 0)>=0){
			pos=str.indexOf(',', 0);
			result=str.substr(0,pos)+'.'+str.substr(pos+1,str.length+1);
		}
	return result;
}
function getFlawSize(mold){
	for (var a=1;a<11;a++){
		if(mState[a])
			for (var b=1;b<4;b++){
				if (mState[a][b])
				if (mState[a][b].form_number==mold) return parseFloat(mState[a][b].share);
			}
	}
}
function getMoldsString(moldSocket){
	var moldsList="";
	for (var a=1;a<11;a++){
		if(mState[a]){
			if(mState[a][moldSocket]) moldsList+=mState[a][moldSocket].form_number+",";
		}
	}
	moldsList=moldsList.substr(0, moldsList.length-1);
	return moldsList;
}