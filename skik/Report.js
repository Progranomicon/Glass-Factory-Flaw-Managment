var j_prod={};
var j_defects={};
var j_moves={};
var jProdList={};
var start=1;
function Report(){
	this.line_num = 5;
	this.json_prod={}; //оказалось, список постановок на линии
	this.json_defects={};
	this.j_moves={};
	this.report={};
	this.graph_array=[];
	this.bars=[];
	this.barsC=[];
	this.form_ablty=[];
	this.forms_set=[]; // количества форм на линии поминутно
	this.singleFormsVal=[]; // количества форм на линии поминутно
	
	this.curPostanovId;
	this.forms;
	
	this.cur_date_start;
	this.cur_date_end;
	
	this.startReportDate=moment("2014-04-14 07:30:00");
	this.endReportDate=moment("2014-04-14 19:30:00");
	this.tempDate;
	this.varS;
	this.otobr='';
	this.preparedReport={};
	this.prodList={};
	
	this.set_line=function(n){
		this.line_num=n;
	}
	this.get_changes_list=function(){
		var text='';
		el('bars').innerHTML="";
		for(var i in this.json_prod){
			if (i!="result"){
				text+='<div class="lineSelectorItem"> <a href="#" onclick="get_defects_by_id('+i+');">'+this.prodList[this.json_prod[i].production_id].format_name+' c '+this.json_prod[i].date_time+'</a></div>';
			}
		}
		return text;
	}
	this.prepare_your_anus=function(){
		$('#defects_chart').css('height','500');
		$('#graphCommand').html('<a href="#" onclick="r.hideGraph();"> Спрятать [x]</a>');
		var def_duration_mins, def_start_diff,def_end_date;
		var period_minutes=moment(this.json_defects.result.date_end).diff(this.json_defects.result.date_start,'minutes');
		var g=0;
		

		this.graph_array=[];
		this.graph_array['all']=[];
		this.graph_array['rejected']=[];
		for (var jk=0;jk<period_minutes+1;jk++){
			this.graph_array['all'][jk]=0;
			this.graph_array['rejected'][jk]=0;
		}
		for(var i in this.json_defects){
			if (i!="result"){
				if (this.json_defects[i].date_end!=''){
					def_end_date=moment(this.json_defects[i].date_end);
				} else{
					def_end_date=moment();
				}
				def_duration_mins=def_end_date.diff(this.json_defects[i].date_start,'minutes');
				def_start_diff=moment(this.json_defects[i].date_start).diff(this.json_defects.result.date_start,'minutes');
				if (this.graph_array[def_start_diff]= undefined) this.graph_array[def_start_diff]=0;
				for(var h=def_start_diff;h<def_start_diff+def_duration_mins;h++){
					if (typeof(this.graph_array['all'][h])=='undefined') this.graph_array['all'][h]=0;
					this.graph_array['all'][h]+=parseFloat(this.json_defects[i].flaw_part);
					if (this.json_defects[i].action>1) this.graph_array['rejected'][h]+=parseFloat(this.json_defects[i].flaw_part);
				}
			}
		}
		show_chart();
	}
	this.getReport=function(date1, date2){
		this.preparedReport={};
		this.bars=[];
		this.barsC=[];
		var itogo=0, defSumm=0, defText='', colorText="";
		for(var i in this.json_defects){
			this.lossByDefect(this.json_defects[i], date1, date2);
		}
		var def, formText, resultText='';
		for(var d in this.preparedReport){
			def=this.preparedReport[d];
			if(def){
				//alert(jstr(def));
				defText='';
				for (var id in def){
					if(id!='summ'){	
						if(def[id].action>1){
							defText+='<div class="reportLine" style="display:none" name="div'+d+'"><div class="inlineDiv form">Ф.'+def[id].form+'</div><div class="percent inlineDiv">'+(def[id].count).toFixed(2)+"%, "+corrective_actions[def[id].action].title+'</div><div class="date inlineDiv">c '+def[id].date1.format("D MMM H:mm")+",  "+def[id].date2.preciseDiff(def[id].date1)+"</div></div>";
							itogo+=def[id].count;
						}else{
							//alert(jstr(def[id]));
							defText+='<div class="reportLine" style="display:none;background-color:#ccc" name="div'+d+'"><div class="inlineDiv form">Ф.'+def[id].form+'</div><div class="percent inlineDiv">'+(def[id].count).toFixed(2)+"%, "+corrective_actions[def[id].action].title+'</div><div class="date inlineDiv">c '+def[id].date1.format("D MMM H:mm")+",  "+def[id].date2.preciseDiff(def[id].date1)+"</div></div>";
						}
					}
				}
				/*if (def.action==1) colorText="color:gray;";
				else colorText="";*/
				resultText+='<div class="" style="font-size:1.2em;padding-top:10px;cursor:pointer;'+colorText+'" onclick="expandDefect(\'div'+d+'\');">'+defects[d].title+", всего: <b>"+def.summ.toFixed(2)+"%</b></div>"+defText+"";
				this.bars.push(Math.round(def.summ*100)/100);
				this.barsC.push(defects[d].title);
			}
		}
		resultText+='----------------------------------- <br> <span style="font-size:1.5em">Итого за период: '+itogo.toFixed(2)+'%</span>';
		el('det_rep').innerHTML=resultText;
		showBars();
	}
	this.form_ability=function(){ // подготавливает количества форм в каждую минуту.
		var mm=[]; // mm - machine matrix, состояние машины на наличие форм
		var date_start=this.cur_date_start;
		var date_end=this.cur_date_end;
		this.forms_set=null;
		this.forms_set=[];
		this.form_ablty.length=0;
		this.singleFormsVal=[];
		var move_diff=0;
		var period=date_end.diff(date_start, 'minutes');
		for (var s=1; s<11; s++){
			if(!mm[s]) mm[s]=[0,0,0,0];
		}
		for (var i in this.j_moves){
			if (i!="result"){
				move_diff=moment(this.j_moves[i].date_time).diff(date_start, 'minutes');
				if (!this.form_ablty[move_diff]) this.form_ablty[move_diff]=0;
				if(this.j_moves[i].form=='0') {
					this.form_ablty[move_diff]--;
				} else{
					if (mm[this.j_moves[i].section][this.j_moves[i].position]==0){
						this.form_ablty[move_diff]++;
					}
				}
				mm[this.j_moves[i].section][this.j_moves[i].position]=this.j_moves[i].form;
			}
		}
		var cursor=0;
		for (var t=0;t<period;t++){
			if(this.form_ablty[t]){
			 cursor+=this.form_ablty[t];
			}
			this.forms_set[t]=cursor;
			if(!cursor)this.singleFormsVal[t]=0;
			else this.singleFormsVal[t]=1/cursor;
		}
	}
	this.hideGraph=function(){
		$('#defects_chart').html('');
		$('#defects_chart').css('height','0');
		$('#graphCommand').html('<a href="#" onclick="r.prepare_your_anus();">построить граффик</a>');
	}
	this.lossByDefect=function(def, date1, date2){ //def- дефект из  this.json_defects 
		var dateStart, startCountDate;
		var dateEnd, endCountDate;
		var prop=0, u4t1=0;
		if (def.form){
			dateStart=moment(def.date_start);
			if (!def.date_end) dateEnd=moment();
			else dateEnd=moment(def.date_end);
			if (dateStart.isBefore(date2)){
				if(dateEnd.isAfter(date1)){
					if (dateStart.isBefore(date1)){
						startCountDate=date1;
					} else { 
						startCountDate=dateStart;
					}
					if (dateEnd.isAfter(date2)>0){
						endCountDate=date2;
					} else { 
						endCountDate=dateEnd;
					}
					if(!this.preparedReport[def.type]) this.preparedReport[def.type]={};
					if(!this.preparedReport[def.type].summ) this.preparedReport[def.type].summ=0;
					if(!this.preparedReport[def.type][def.id]) this.preparedReport[def.type][def.id]={};
					if(!this.preparedReport[def.type][def.id].count) this.preparedReport[def.type][def.id].count=0;
					this.preparedReport[def.type][def.id].count+=((endCountDate.diff(startCountDate, 'minutes')/this.endReportDate.diff(this.startReportDate, 'minutes'))*def.flaw_part);
					this.preparedReport[def.type].summ+=this.preparedReport[def.type][def.id].count;
					this.preparedReport[def.type][def.id].form=def.form;
					this.preparedReport[def.type][def.id].action=def.action;
					this.preparedReport[def.type][def.id].date1=startCountDate;
					this.preparedReport[def.type][def.id].date2=endCountDate;
				}else{}
			}else{}	
		}
	}
}
function get_changes(){
		$.ajax('stat.php',{type:"GET", data:{get_changes:"yes", line_number:r.line_num},success:function(prod){
			window.j_prod=$.parseJSON(prod);
			r.json_prod=window.j_prod;
			var idm=0;
			for (i in r.json_prod){
				if (i!="result"){
					if(i>idm) idm=i;
				}
			}
			r.curPostanovId=idm;
			prodListClick(idm);
		}, error:error_handler});
}
function get_defects_by_id(id){
	r.curPostanovId=id;
	r.forms=r.json_prod[id].forms;
	el("det_rep").innerHTML="";
	el("forms").innerHTML=r.forms;
	r.hideGraph();
	el("startDate").innerHTML="[Выберите]";
	el("endDate").innerHTML="[Выберите]";
	
	el("lastProduction").innerHTML='<div class="inlineDiv" onclick="popup(\'Продукция\', r.get_changes_list(), 130, 65);">'+r.prodList[r.json_prod[id].production_id].format_name+'</div>';
	closePopup();
	$.ajax('stat.php',{type:"GET", data:{get_defects:"yes", line:r.line_num, id:id},success:function(prod){
			window.j_defects=$.parseJSON(prod);
			r.json_defects={};
			r.json_defects=window.j_defects;
			//log("полученные дефекты: >>"+jstr(r.json_defects)+"<< ");
			get_moves(r.curPostanovId);
		}, error:error_handler});
}
function get_moves(id){
	$.ajax('stat.php',{type:"GET", data:{get_moves:"yes", line:r.line_num, id:id},success:function(prod){
		window.j_moves=$.parseJSON(prod);
		r.j_moves={};
		r.j_moves=window.j_moves;
		//log("полученные установки форм: >>"+jstr(r.j_moves)+"<< ");
		r.cur_date_start=moment(r.j_moves.result.date_start);
		r.cur_date_end=moment(r.j_moves.result.date_end);
		//r.form_ability();
	}, error:error_handler});
}
function getProdList(){
	$.ajax('production.php',{type:"GET", data:{get_production_list:"yes"},success:function(prod_list){
		window.jProdList=$.parseJSON(prod_list);
		if (window.jProdList.result=='ok'){
			r.prodList={};
			r.prodList=window.jProdList;
			get_changes();
		}
		else{
			alert ('Ошибка: '+production_list.message);	
		}
		
	}, error:error_handler});
}
function lineSelect(i){
	r.line_num=i;
	r.hideGraph();
	el('bars').innerHTML="";
	el("det_rep").innerHTML="";
	el("currentLine").innerHTML="Линия "+i;
	el("lastProduction").innerHTML="[Загрузка...]";
	closePopup();
	get_changes();
};
function lineSelectContent(){
	var text="";
	for (var i=1;i<10;i++){
		text+='<div class="lineSelectorItem" onclick="lineSelect('+i+')">'+i+'</div>';
	}
	return text;
};
function prodListClick(id){
	r.curPostanovId=id;
	get_defects_by_id(r.curPostanovId);
	el("lastProduction").innerHTML=r.prodList[r.json_prod[id].production_id].format_name;
}
function showCal(elDispId, s){
	r.varS=s;
	r.otobr=elDispId;
	var dateStartSelector=$("#dsel1").calendarPicker({
	monthNames:["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
	dayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
	useWheel:true,
	//callbackDelay:500,
	//years:5,
	months:5,
	days:9,
	showDayArrows:true,
	callback:function(cal) {
	  r.tempDate=moment(cal.currentDate);
	}});
	dateStartSelector.changeDate(r[s].toDate());
	el('hSelector').value=r[s].hour();
	el('mSelector').value=r[s].minute();
}
function ok(){
	r.form_ability();
	r.tempDate.hour(parseInt(el('hSelector').value));
	r.tempDate.minute(parseInt(el('mSelector').value));
	r[r.varS]=r.tempDate;
	el(r.otobr).innerHTML=moment(r.tempDate).format("D MMMM YYYY, HH:mm");
	r.getReport(r.startReportDate, r.endReportDate);
}
function expandDefect(name){
	if($('[name="'+name+'"]').css('display')=='none'){
		$('[name="'+name+'"]').css('display','block');
	}else{
		$('[name="'+name+'"]').css('display','none');
	}
}