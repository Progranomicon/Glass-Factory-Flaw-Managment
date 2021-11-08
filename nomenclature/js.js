function rendTbl(mode){ //1-подходящие, 2-просроченные,без параметров - все
	mode=mode||0;
	ebi('toolsDiv').innerHTML='';
	var overTime=0;
	var nearTime=0;
	var disp=false;
	drawHeader();
	// if (mode==0) ebi('showAll').style.display='none';
	// else ebi('showAll').style.display='inline-block';
	var what=document.getElementsByName("searchText")[0].value;
	for (var i in SKU){
		disp=false;
		if(!SKU.hasOwnProperty(i)) continue;
		var div=document.createElement('DIV');
		div.className='toolRow';
		// if(moment().isAfter((moment(SKU[i].nextValidation,"YYYY-MM-DD")).subtract('M',1))){ 
			// div.className='toolRow OkoloDate';
			// nearTime++;
			// if (mode==1) disp=true;
		// }
		// if(moment().isAfter(moment(SKU[i].nextValidation,"YYYY-MM-DD"))){ 
			// div.className='toolRow OverDate';
			// overTime++;
			// nearTime--;
			// if (mode==2 & disp!=true) disp=true;
			// else disp=false;
		// }
		
		if (mode==0) disp=true;
		
		div.innerHTML+='<div class="toolId">'+SKU[i].id+'</div><div class="sn">'+getPodsvet(SKU[i].internalCode,what)+'</div>';
		div.innerHTML+='<div class="toolName">'+getPodsvet(SKU[i].fullName,what)+'</div><div class="toolType">'+getPodsvet(SKU[i].role,what)+'</div>';
		div.innerHTML+='<div class="accClass">'+getPodsvet(SKU[i].color,what)+'</div><div class="mRange">'+getPodsvet(SKU[i].customer,what)+'</div>';
		div.toolId=SKU[i].id;
		div.onclick=function(){go(this.toolId)};
		if((div.innerHTML.indexOf( '"podsvet"', 0)>=0) || (what=="")){
			if(disp!=true) div.style.display="none";
			ebi('toolsDiv').appendChild(div);
		}
		
	}
	// ebi("overTime").innerHTML=overTime;
	// ebi("nearTime").innerHTML=nearTime;
}
function drawHeader(){
		var div=document.createElement('DIV');
		div.innerHTML='<div class="toolId" style="height:2.5em;">ID </div><div class="sn" style="height:2.5em;">Внутренний код</div>';
		div.innerHTML+='<div class="toolName" style="height:2.5em;">Наименование</div><div class="toolType" style="height:2.5em;">Группа</div>';
		div.innerHTML+='<div class="accClass" style="height:2.5em;">Цвет</div><div class="mRange" style="height:2.5em;">Клиент</div>';
		div.className='toolRow';
		ebi('toolsDiv').appendChild(div);
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