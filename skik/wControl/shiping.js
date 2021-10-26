var productionList={};
var curProduction;
var productionParams = [];
var switcherStates = ['Авто', 'Ж/д'];
var curTransport;
var colors = [];
	colors["10"] = "бесцветный";
	colors["20"] = "зеленый";
	colors["10"] = "коричневый";

var startReportDate=moment();
var endReportDate=moment();

startReportDate.hour(0);
startReportDate.minute(0);
startReportDate.second(0);

endReportDate.hour(23);
endReportDate.minute(59);
endReportDate.second(59);

/*function getProduction(){
	$.ajax('../../production.php',{type:"GET", data:{getProduction:"yes"},success:function(jsonProductionList){
		//el("workspace").innerHTML=jsonProductionList;
		//log(jsonProductionList);
		window.productionList=$.parseJSON(jsonProductionList);
		if (window.productionList.result.status=='ok'){
			window.productionList=window.productionList.production;
			setCurProduction('11100001');
		}
		else{
			alert ('Ошибка: '+productionList.result.status);	
		}
		},
		error:error_handler});
}*/
function setCurProduction(id){
	el('productionSelector').innerHTML = '<span class="curProduction active" onclick="showProductionSelector();">'+productionList[id].fullName+'['+id+']</span>';
	var list = el('productionListDiv');
	if(list!=undefined){
		list.parentNode.removeChild(list);
	}
	curProduction = id;
	getParams();
}
function showProductionSelector(){
	el('productionSelector').innerHTML = '<input type="text" id="queryText" value="" placeholder="Start typing..." onkeyup="fillList();">';
	el('queryText').focus();
	var productionListDiv = document.createElement('DIV');
	productionListDiv.className = "productionListDiv";
	productionListDiv.id = 'productionListDiv';
	document.body.appendChild(productionListDiv);
	fillList();
	
	
}
function fillList(){
		var prodStr;
		var str=el('queryText').value;
		var list=el('productionListDiv');
		list.innerHTML='';
		for (var i in productionList){
			prodStr = '['+productionList[i].code+'] '+ productionList[i].fullName;
			if(prodStr.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
				var newElem=document.createElement('DIV');
				if (productionList[i].color=='20'){
					newElem.className = "green active";
				}else{
					if (productionList[i].color=='30'){
						newElem.className = "brown active";
					}else{
						newElem.className = "active";
					}
				}
				newElem.onclick=function(x){
						return function(){
							setCurProduction(x);
						}
					}(i);
				newElem.innerHTML=highlight(prodStr, str)+' ('+productionList[i].totalUnits+' шт., '+productionList[i].boxing+')';
				list.appendChild(newElem);
			}
		}
	if (list.innerHTML=='') list.innerHTML='Нет форматов с '+str+'.';
}
function switcherClick(state, states, containerId){
	curTransport = state;
	var container = el(containerId);
	container.innerHTML = '';
	for(var i in states){
		var newElem=document.createElement('DIV');
			newElem.className = 'unselected active';
			if(states[i]==state){
				newElem.className = 'selected';
			}else{
				newElem.onclick=function(x,y,z){
						return function(){
							switcherClick(x, y, z);
						}
					}(states[i],switcherStates, 'transport');
			}
			newElem.innerHTML=states[i];
			container.appendChild(newElem);
	}
}
function updateDate(){
	el('startDate').innerHTML = startReportDate.format('H:mm D MMM YYYY');
	el('endDate').innerHTML = endReportDate.format('H:mm D MMM YYYY');
}
function error_handler(){
	
}
function testTest(){
	alert( 'Production: '+curProduction+', date from: '+startReportDate.format('H:mm D MMM YYYY')+', date to: '+endReportDate.format('H:mm D MMM YYYY')+', transport: '+curTransport);
}

function getParams(){
	$.ajax('production.php',{type:"GET", data:{task:"getSavedParams", productionId:curProduction},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			alert ('Ошибка: '+response.result.message);
		}else{
			window.productionParams[curProduction] = response.productionParams;
		}
	}, 
	error:error_handler});
}
function getStatistic(){
	//alert(endReportDate.format("YYYY-MM-DD H:mm:SS"));
	$.ajax('production.php',{type:"GET", data:{task:"getFullStatistic", productionId:curProduction, startDate:startReportDate.format("YYYY-MM-DD H:mm")/*"2015-03-20 00:00"*/, endDate:endReportDate.format("YYYY-MM-DD H:mm")/*"2015-03-24 23:00"*/},success:function(jsonResult){
		//log(jsonResult);
		window.reportData=$.parseJSON(jsonResult);
		renderSummary();
		if(productionParams[curProduction][53].isUsed=="1") calculateLotsText();
		//log(productionParams);
	}, 
	error:error_handler});
}
function renderSummary(){
	var declar = '<u><b> !!!ЗАПОЛНИТЬ В ПАССПОРТЕ!!!</b></u>';
	if(typeof(productionParams[curProduction][48])!='undefined') declar = productionParams[curProduction][48].text;
	else alert('Декларация не внесена в пасспорт!');
	var validDate = '<u><b> !!!ЗАПОЛНИТЬ В ПАССПОРТЕ!!!</b></u>';
	if(typeof(productionParams[curProduction][49])!='undefined') validDate = productionParams[curProduction][49].text;
	else alert('Срок действия декларации не заполнен в пассорте!');
	el('passport').style.display = 'block';
	var typeP = "бутылка для пищевых жидкостей ";
	if(productionList[curProduction].target!='') typeP = productionList[curProduction].target;
	showhide('params');
	el('tareType').innerHTML = typeP+' тип '+productionList[curProduction].fullName;
	el('declaration').innerHTML = 'Декларация о соответствии ' + declar;
	el('declarationTime').innerHTML = 'Срок действия ' + validDate;
	var rowNumber=1;
	var summary = window.reportData.data;
	var c = el('summaryTable');
	setColor(productionList[curProduction].color);
	
		productionParams[curProduction][990] = {};
		//productionParams[curProduction][990].text = "цвет стекла";
		productionParams[curProduction][990].text = colors[productionList[curProduction].color];
		productionParams[curProduction][990].units = "";
		productionParams[curProduction][990].paramId = "990";
		productionParams[curProduction][990].isPassportOnly = "1";
		productionParams[curProduction][990].isUsed = "1";
		
		params[990] = {"name":"Цвет стекла", "units":"", "display":["text"], "moldDataFields":1};
	
	c.innerHTML = '<div style="height:0.75cm"><b><div class="parametr l1i5">№ п/п</div><div class="parametr l7">Показатель</div><div class="parametr l1i5">Ед. изм.</div><div class="parametr l1i5">Спецификация</div><div class="parametr l1i5">min - max(факт)</div></b></div>';
	for(var p in productionParams[curProduction]){
		if(productionParams[curProduction][p].isPassportOnly=='1'){
			var summVal='соответствует';
			if(typeof(summary[p])!='undefined'){
				summVal=summary[p].val || 'соответствует';
			}
			c.innerHTML+='<div style="height:0.5cm"><div class="parametr l1i5">'+rowNumber+'</div><div class="parametr l7">'+params[p].name+'</div><div class="parametr l1i5">'+params[p].units+'</div><div class="parametr l1i5">'+specification(productionParams[curProduction][p], p)+'</div><div class="parametr l1i5">'+summVal+'</div></div>';
			rowNumber++;
		}
	}
	var statValuesStr;	
	var newElem;
	for(var i in summary){
		newElem = document.createElement('DIV');
		statValuesStr = '';
		newElem.style.height = '0.5cm';
		statValuesStr = summary[i].min+'<b> - </b>'+summary[i].max;
		newElem.innerHTML+='<div class="parametr l1i5">'+rowNumber+'</div><div class="parametr l7">'+params[i].name+'</div><div class="parametr l1i5">'+params[i].units+'</div><div class="parametr l1i5">'+specification(productionParams[curProduction][i], i)+'</div><div class="parametr l1i5">'+statValuesStr+'</div>';
		
		c.appendChild(newElem);
		rowNumber++;
	}
	//log(jstr(productionParams));
}
function showhide(elId){
	if(el(elId).style.display!='none'){
		el(elId).style.display='none';
	}else{
		el(elId).style.display='block';
	}
	
}
function setColor(c){
	var cEl=el('colorImg');
	cEl.src = "10.png";
	if(c=="зеленый") cEl.src = "20.png";
	if(c=="коричневый") cEl.src = "30.png";
}
function specification(node, i){
	if (node.text!='') return node.text;
	if (in_array("min", params[i].display)) {
		if(in_array("max", params[i].display)) {
			return node.min + '<b> - </b>' + node.max;
		}else{
			return 'не менее ' + node.min;
		}
	}else if(in_array("max", params[i].display)) return 'не более ' + node.max;
}
function calculateLotsText(){
	var result = "";
	var separ = "";
	if(endReportDate.diff(startReportDate, 'days') < 2){
		result = "Производственная партия: <b>" + startReportDate.format("DDMMYY") + "</b>";
	}else{
		result = "Производственные партии: <b>";
		while(endReportDate.isAfter(startReportDate)){
			result +=  separ + startReportDate.format("DDMMYY");
			startReportDate.add(1, 'days');
			separ = ", ";
		}
		result += "</b>";
	}
	el("lot").innerHTML = result;
}