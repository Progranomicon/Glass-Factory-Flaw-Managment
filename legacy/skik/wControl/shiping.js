var productionList={};
var curProduction;
var switcherStates = ['Авто', 'Ж/д'];
var curTransport;
var productionParams=[];
var reportData;

var startReportDate=moment('2015-04-09');
var endReportDate=moment();

startReportDate.hour(0);
startReportDate.minute(0);
startReportDate.second(0);

endReportDate.hour(23);
endReportDate.minute(59);
endReportDate.second(59);

function getProduction(){
	$.ajax('production.php',{type:"GET", data:{task:"getProduction"},success:function(jsonProductionList){
		//log(jsonProductionList);
		window.productionList=$.parseJSON(jsonProductionList);
		if (window.productionList.result.status=='ok'){
			window.productionList=window.productionList.production;
			setCurProduction('240');
		}
		else{
			alert ('Ошибка: '+productionList.result.status);	
		}
		},
		error:error_handler});
}
function setCurProduction(id){
	el('productionSelector').innerHTML = '<span class="curProduction active" onclick="showProductionSelector();">'+productionList[id].formatName+'['+id+']</span>';
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
			prodStr = '['+productionList[i].id+'] '+ productionList[i].formatName;
			if(prodStr.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
				var newElem=document.createElement('DIV');
				if (productionList[i].color=='зеленый'){
					newElem.className = "active green";
				}else{
					if (productionList[i].color=='коричневый'){
						newElem.className = "active brown ";
					}else{
						newElem.className = "active";
					}
				}
				newElem.onclick=function(x){
						return function(){
							setCurProduction(x);
						}
					}(i);
				newElem.innerHTML=highlight(prodStr, str)+' ('+productionList[i].count+' шт., '+productionList[i].boxing+')';
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
	el('dates').innerHTML = startReportDate.format('D.MM.YYYY') + ' - ' + endReportDate.format('D.MM.YYYY');
	
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
			window.productionParams[curProduction]=response.productionParams;
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
	}, 
	error:error_handler});
}
function renderSummary(){
	el('passport').style.display = 'block';
	var typeP = "бутылка для пищевых жидкостей ";
	if(productionList[curProduction].type!='') typeP = productionList[curProduction].type;
	showhide('params');
	el('tareType').innerHTML = typeP+' тип '+productionList[curProduction].formatName;
	el('declaration').innerHTML = 'Декларация о соответствии' + productionParams[curProduction][47].text;
	el('declarationTime').innerHTML = 'Срок действия' + productionParams[curProduction][48].text;
	var rowNumber=1;
	var summary = window.reportData.data;
	var c = el('summaryTable');
	setColor(productionList[curProduction].color);
	c.innerHTML = '<div style="height:0.5cm"><b><div class="parametr l1i5">№ п/п</div><div class="parametr l7">Показатель</div><div class="parametr l1i5">Ед. изм.</div><div class="parametr l1i5">Спецификация</div><div class="parametr l1i5">min..max(факт)</div></b></div>';
	for(var p in productionParams[curProduction]){
		if(productionParams[curProduction][p].isPassportOnly=='1'){
			var summVal='соответствует';
			if(typeof(summary[p])!='undefined'){
				summVal=summary[p].val || 'соответствует';
			}
			c.innerHTML+='<div style="height:0.5cm"><div class="parametr l1i5">'+rowNumber+'</div><div class="parametr l7">'+params[p].name+'</div><div class="parametr l1i5">'+params[p].units+'</div><div class="parametr l1i5">'+specification(productionParams[curProduction][p])+'</div><div class="parametr l1i5">'+summVal+'</div></div>';
			rowNumber++;
		}
	}	
	for(var i in summary){
		var newElem=document.createElement('DIV');
		newElem.style.height = '0.5cm';
		newElem.innerHTML+='<div class="parametr l1i5">'+rowNumber+'</div><div class="parametr l7">'+params[i].name+'</div><div class="parametr l1i5">'+params[i].units+'</div><div class="parametr l1i5">'+specification(productionParams[curProduction][i])+'</div><div class="parametr l1i5">'+summary[i].min+'<b>..</b>'+summary[i].max+'</div>';
		c.appendChild(newElem);
		rowNumber++;
	}
}
function showhide(elId){
	if(el(elId).style.display!='none'){
		el(elId).style.display='none';
	}else{
		el(elId).style.display='block';
	}
	
}
function normF(f, n){
    var power = Math.pow(10, n || 2);
    return String(Math.round(f * power) / power);
}
function setColor(c){
	var cEl=el('colorImg');
	cEl.src = "10.png";
	if(c=="зеленый") cEl.src = "20.png";
	if(c=="коричневый") cEl.src = "30.png";
}
function specification(node){
	if (node.text!='') return node.text;
	if (node.min!='') {
		if(node.max!='') {
			return node.min + '<b>..</b>' + node.max;
		}else{
			return 'не менее ' + node.min;
		}
	}else if(node.max!='') return 'не более ' + node.max;
}