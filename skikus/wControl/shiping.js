var productionList={};
var curProduction;
var switcherStates = ['Авто', 'Ж/д'];
var curTransport;

var startReportDate=moment();
var endReportDate=moment();

startReportDate.hour(0);
startReportDate.minute(0);
startReportDate.second(0);

endReportDate.hour(23);
endReportDate.minute(59);
endReportDate.second(59);

function getProduction(){
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
}
function setCurProduction(id){
	el('productionSelector').innerHTML = '<span class="curProduction active" onclick="showProductionSelector();">'+productionList[id].fullName+'['+id+']</span>';
	var list = el('productionListDiv');
	if(list!=undefined){
		list.parentNode.removeChild(list);
	}
	curProduction = id;
	
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