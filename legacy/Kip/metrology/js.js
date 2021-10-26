function rendTbl(mode){ //1-подходящие, 2-просроченные,без параметров - все
	mode=mode||0;
	ebi('toolsDiv').innerHTML='';
	var overTime=0;
	var nearTime=0;
	var disp=false;
	drawHeader();
	if (mode==0) ebi('showAll').style.display='none';
	else ebi('showAll').style.display='inline-block';
	var what=document.getElementsByName("searchText")[0].value;
	for (var i in tools){
		disp=false;
		if(!tools.hasOwnProperty(i)) continue;
		var div=document.createElement('DIV');
		div.className='toolRow';
		if(moment().isAfter((moment(tools[i].nextValidation,"YYYY-MM-DD")).subtract('M',1))){ 
			div.className='toolRow OkoloDate';
			nearTime++;
			if (mode==1) disp=true;
		}
		if(moment().isAfter(moment(tools[i].nextValidation,"YYYY-MM-DD"))){ 
			div.className='toolRow OverDate';
			overTime++;
			nearTime--;
			if (mode==2 & disp!=true) disp=true;
			else disp=false;
		}
		
		if (mode==0) disp=true;
		
		div.innerHTML+='<div class="toolId">'+i+'</div><div class="toolName">'+getPodsvet(tools[i].toolName,what)+'</div>';
		div.innerHTML+='<div class="sn">'+getPodsvet(tools[i].sn,what)+'</div><div class="toolType">'+getPodsvet(tools[i].toolType,what)+'</div>';
		div.innerHTML+='<div class="accClass">'+getPodsvet(tools[i].accClass,what)+'</div><div class="mRange">'+getPodsvet(tools[i].mRange,what)+'</div>';
		div.innerHTML+='<div class="frValidation">'+tools[i].frValidation+'</div>';
		div.innerHTML+='<div class="lastValidation">'+moment(tools[i].lastValidation,"YYYY-MM-DD").format('D MMM YY')+'</div>';
		div.innerHTML+='<div class="lastValidation">'+moment(tools[i].nextValidation,"YYYY-MM-DD").format('D MMM YY')+'</div>';
		div.innerHTML+='<div class="validationOrg">'+getPodsvet(tools[i].validationOrg,what)+'</div>';
		div.toolId=tools[i].id;
		div.onclick=function(){go(this.toolId)};
		if((div.innerHTML.indexOf( '"podsvet"', 0)>=0) || (what=="")){
			if(disp!=true) div.style.display="none";
			ebi('toolsDiv').appendChild(div);
		}
		
	}
	ebi("overTime").innerHTML=overTime;
	ebi("nearTime").innerHTML=nearTime;
}
function drawHeader(){
		var div=document.createElement('DIV');
		div.innerHTML='<div class="toolId" style="height:2.5em;">N п/п </div><div class="toolName" style="height:2.5em;">Наименование</div>';
		div.innerHTML+='<div class="sn" style="height:2.5em;">Серийный номер</div><div class="toolType" style="height:2.5em;">Тип</div>';
		div.innerHTML+='<div class="accClass" style="height:2.5em;">Класс точности</div><div class="mRange" style="height:2.5em;">Диапазон измерений</div>';
		div.innerHTML+='<div class="frValidation" style="height:2.5em;">Межпов. инт.</div><div class="lastValidation" style="height:2.5em;">Последняя поверка</div><div class="lastValidation" style="height:2.5em;">Следующая поверка</div>';
		div.innerHTML+='<div class="validationOrg" style="height:2.5em;">Место нахождения.</div>';
		div.className='toolRow';
		ebi('toolsDiv').appendChild(div);
}
function nextValidation(lv, months){
	var lastVal=moment(lv,"YYYY-MM-DD");
	lastVal.add('M', months);
	return lastVal.format('YYYY-MM-DD');
}
function ebi(id){
	return document.getElementById(id);
}
function go(id){
	document.location.href='edit.php?id='+id;
}
function showDateSelector(){
	var el=ebi("popup");
	el.style.display='block';
	var lstVld=moment(ebi('lastVld').value,"YYYY-MM-DD");
	ebi('dDay').value = lstVld.format('DD');
	ebi('dMonth').value = lstVld.format('MM');
	ebi('dYear').value = lstVld.format('YYYY');
}
function applyValue(elId, val){
	ebi(elId).value=val;
	if (!checkAndPeck()){ 
		alert(ebi('dDay').value+'-'+ebi('dMonth').value+'-'+ebi('dYear').value+' :Такой даты быть не может');
		showDateSelector();
	}
	else{
		ebi('lastVld').value = ebi('dYear').value +'-'+ebi('dMonth').value+'-'+ebi('dDay').value;
		ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment(ebi("lastVld").value, "YYYY-MM-DD").format('D MMMM YYYY')+'</a>';
	}
	
}
function checkAndPeck(dateStr){
	var dateStr = ebi('dDay').value+'-'+ebi('dMonth').value+'-'+ebi('dYear').value;
	//alert(dateStr);
	var mmnt=moment(dateStr, 'DD-MM-YYYY');
	if (mmnt.isValid()) return true;
	else return false;
}
function getPodsvet(where, what){
		var pos, how_many;
		var podsvet=where;
			if (what=="") return where;
			if(where.toLowerCase().indexOf( what.toLowerCase(), 0)>=0){
				pos=where.toLowerCase().indexOf( what.toLowerCase(), 0)
				how_many=what.length;
				podsvet=where.substr(0,pos)+'<span id="podsvet" style="background-color:#ddf">'+where.substr(pos,how_many)+'</span>'+where.substr(pos+how_many,where.length);
			}
		return podsvet;
	}