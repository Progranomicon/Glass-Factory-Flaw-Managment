var data  = {};
var prodParams = {};
var realParams = {};
function getDataByPeriodId(periodId){
	$.ajax('report_backend.php',{type:"GET", data:{periodId:periodId},success:dataReciever, error:error_handler});
}
function dataReciever(jsonStr){
	data = $.parseJSON(jsonStr);
	prodParams = data.params;
	for(var date in data.repData){
		el('workspace').innerHTML += '<br> М/линия: <b>1</b>, Дата: <b>' + date + '</b>' ;
		tableBuilder(data.repData[date]);
		console.log(data.repData[date]);
	}
}
function tableBuilder(dataNode){
	//log(jstr(dataNode));
	realParams = {};
	var ws = el('workspace');
	var tableStr = '<table class="repTable"> <tr><th><p>форма</p></th>';
	for(var p in prodParams){
		tableStr +=  '<th><p>' + params[p].name + '</p></th>';
	}
	tableStr +=  '</tr>';
	
	tableStr += ' <tr><td></td>';
	for(var p in prodParams){
		tableStr +=  '<td> min:' +  prodParams[p].min + '<br> max: ' +  prodParams[p].max +'<br> (' + params[p].units + ')</td>';
	}
	tableStr +=  '</tr>';
	
	for(var mold in dataNode){
		tableStr += '<tr>';
		tableStr += '<td>' + mold + '</td>';
		for(var p in prodParams){
			if(typeof(dataNode[mold][p])!='undefined'){
				if(!realParams[p]) {
					realParams[p] = {};
					realParams[p][mold] = 0;
				}
				realParams[p][mold] = dataNode[mold][p]['summ']/dataNode[mold][p]['count'];
				tableStr += '<td>' + normF(realParams[p][mold],1) + '</td>';
			}else{
				tableStr += '<td>н/д</td>';
			}
		}
		tableStr += '</tr>';
	}
	console.log(realParams);
	tableStr += ' <tr class="b"><td>Ср. знач</td>';
	for(var p in prodParams){
		if(realParams[p]) tableStr +=  '<td> ' + normF(getMidVal(realParams[p]), 2) + '</td>';
		else  tableStr +=  '<td> н/д </td>';
	}
	tableStr += ' </tr>';
	tableStr += ' <tr class="b"><td>Размах</td>';
	for(var p in prodParams){
		if(realParams[p]) tableStr +=  '<td> ' + normF(getDia(realParams[p]), 2) + '</td>';
		else  tableStr +=  '<td> н/д </td>';
	}
	tableStr += ' </tr>';
	tableStr +='</table><br style="page-break-before: always">';
	ws.innerHTML += '<br>' + tableStr;
}

function error_handler(){
	log('errrorrrrrr');
}
function getMidVal(p){
	var i = 0;
	var midVal = 0;
	for(var m in p){
		midVal += p[m];
		i++;
	}
	return midVal/i;
}
function getDia(p){
	var min = 10000;
	var max = - 10000;
	for(var m in p){
		if(p[m]< min) min = p[m];
		if(p[m]> max) max = p[m];
	}
	return max - min;
}