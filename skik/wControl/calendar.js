var calendarHtml = '<div id="calendar"> <div style="height:300px;"> <div id="daysBlock" class="floatLeft" style="width:250px;"> </div> <div id="monthsBlock" class="floatLeft" style="width:150px;"> </div> <div id="yearsBlock" class="floatLeft" style="width:70px;"> </div>  </div> <hr>Время<br><div> <select id="hourSelector" onchange="tempDate.hours(parseInt(this.value));updateCal();"> </select> : <select id="minuteSelector" onchange="tempDate.minutes(parseInt(this.value));updateCal();"> </select> </div> <div>Выбираемая дата:<div id="dateToApply"> </div> <input type="button" value="Ок" onclick="ok();"> </div> </div>';

var months={}
months[1]={"name":"янв","days":31};
months[2]={"name":"фев","days":29};
months[3]={"name":"мар","days":31};
months[4]={"name":"апр","days":30};
months[5]={"name":"май","days":31};
months[6]={"name":"июн","days":30};
months[7]={"name":"июл","days":31};
months[8]={"name":"авг","days":31};
months[9]={"name":"сен","days":30};
months[10]={"name":"окт","days":31};
months[11]={"name":"ноя","days":30};
months[12]={"name":"дек","days":31};


var tempDate;
function getCalHtml(string_dateVarName){
	destVariableName = string_dateVarName;
	tempDate=window[string_dateVarName].clone();
	return calendarHtml;
}
function updateCal(){
	var tempHTML="";
	var elemClass="";
	var hourSelector=el('hourSelector');
	var minuteSelector=el('minuteSelector');
	for(var i=1;i<=months[tempDate.months()+1].days;i++){
		if (i==tempDate.date()) elemClass="dateSelectorElem dateSelectorElemSelected";
		else elemClass="dateSelectorElem";
		tempHTML+='<div class="floatLeft dateElemDay '+elemClass+'" onclick="tempDate.date('+i+');updateCal();">'+i+"</div>";
	}
	el('daysBlock').innerHTML=tempHTML;
	tempHTML="";
	for(i=1;i<=12;i++){
		if (i==tempDate.months()+1) elemClass="dateSelectorElem dateSelectorElemSelected";
		else elemClass="dateSelectorElem";
		tempHTML+='<div class="floatLeft dateElemMonth '+elemClass+'" onclick="tempDate.months('+(i-1)+');updateCal();">'+months[i].name+"</div>";
	}
	el('monthsBlock').innerHTML=tempHTML;
	tempHTML="";
	for(i=2014;i<=2019;i++){
		if (i==tempDate.years()) elemClass="dateSelectorElem dateSelectorElemSelected";
		else elemClass="dateSelectorElem";
		tempHTML+='<div class="floatLeft dateElemYear '+elemClass+'" onclick="tempDate.years('+i+');updateCal();">'+i+"</div>";
	}
	el('yearsBlock').innerHTML=tempHTML;
	hourSelector.innerHTML="";
	minuteSelector.innerHTML="";
	for(i=0;i<60;i++){
		if(i<24)
			if (i==tempDate.hours()) hourSelector.options[i]= new Option(i.toString(),i.toString(), false, true);
			else hourSelector.options[i]= new Option(i.toString(),i.toString(), false, false);
		if (i==tempDate.minutes()) minuteSelector.options[i]= new Option(i.toString(),i.toString(), false, true);
		else minuteSelector.options[i]= new Option(i.toString(),i.toString(), false, false);
	}
	
	el('dateToApply').innerHTML=tempDate.format('H:mm D MMM YYYY');
}
function ok(){
	window[destVariableName]=tempDate;
	closePopup();
	showChart(currentParam);
}
function calendar(momentDate, callback){
	
}