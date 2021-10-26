var currentProduction;
var currentPeriod;
var dateFrom = moment();
var dateTo = moment();

function updateInterface(){
	
	if(currentProduction) el('currentProduction').innerHTML = productionList[currentProduction].fullName;
	else  el('currentProduction').innerHTML = "Не выбрана продукция";
	if(currentPeriod) el('currentPeriod').innerHTML = 'c ' + periods[currentPeriod].date_start+' по '+periods[currentPeriod].date_end+'<br><span style="font-size:0.7em">'+periods[currentPeriod].molds+ ' форм, плановый КИС: '+ periods[currentPeriod].kis;
	else  el('currentPeriod').innerHTML = "Не выбран период";
	el('dateFrom').innerHTML = "c " + dateFrom.format('D MMM YYYY HH:mm');
	el('dateTo').innerHTML = "по " + dateTo.format('D MMM YYYY HH:mm');
}
function periodSelector(contentDiv){
	var divInContentDiv = document.createElement('DIV');
		divInContentDiv.style.textAlign = 'left';
		divInContentDiv.style.width = '400px';
		contentDiv.appendChild(divInContentDiv);
		divInContentDiv.innerHTML = '';
		for(var id in periods){
			newElem = document.createElement('DIV');
			newElem.style.cssFloat = 'left';
			newElem.style.padding = '5px';
			newElem.style.backgroundColor ='white';
			newElem.className = 'usable';
			newElem.innerHTML = 'c <u>' + moment(periods[id].date_start).format('D MMM YYYY HH:mm')+'</u> по <u>'+moment(periods[id].date_end).format('D MMM YYYY HH:mm')+'</u><br><span style="font-size:0.7em">Линия '+periods[id].line+', '+periods[id].molds+ ' форм, плановый КИС: '+ periods[id].kis;
			newElem.onclick = function(d){
					return function(){
						currentPeriod = d;
						getStats();
						customWindow.hide();
						dateFrom = moment(periods[d].date_start);
						dateTo = moment(periods[d].date_end);
						updateInterface();
						
					}
					}(id);
			divInContentDiv.appendChild(newElem);
		}
}
function productionSelector(contentDiv){
	var inputStr = document.createElement('INPUT');
	var divInContentDiv = document.createElement('DIV');
		divInContentDiv.style.textAlign = 'left';
		divInContentDiv.style.width = '400px';
		contentDiv.appendChild(inputStr);
		inputStr.focus();
		contentDiv.appendChild(divInContentDiv);
		inputStr.onkeyup = function(){
			var str = inputStr.value;
			divInContentDiv.innerHTML = '';
			for(var id in productionList){
				if(id.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
					newElem = document.createElement('DIV');
					newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor ='white';
					if(productionList[id].color == '20') newElem.style.backgroundColor ='#cfc';
					if(productionList[id].color == '30') newElem.style.backgroundColor ='#c96';
					newElem.className = 'usable';
					newElem.innerHTML = highlight(id, str)+'('+productionList[id].fullName+')';
					newElem.onclick = function(d){
							return function(){
								currentProduction = d;
								updateInterface();
								getPeriods();
								customWindow.hide();
							}
							}(id);
					divInContentDiv.appendChild(newElem);
				}
			}
		}
}
function calCallback(){
	processStats();
	updateInterface();
}
var productionSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выбор продукции"
	},
	"contentFunc": productionSelector,
	"callback":function(){
								alert('callback call');
						}
}
var periodSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выбор постановки"
	},
	"contentFunc": periodSelector,
	"callback":function(){
								alert('callback call');
						}
}