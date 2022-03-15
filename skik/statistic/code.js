//var currentProduction;
var currentPeriod;
var dateFrom = moment();
var dateTo = moment();
var reportType = 1;
var moldsHours = {};
var moldsData = {};

function updateInterface(){
	el('currentProduction').innerHTML = "Не выбрана продукция";
	
	if(currentProduction) if(productionList[currentProduction]) el('currentProduction').innerHTML = productionList[currentProduction].fullName;
	if(currentPeriod) el('currentPeriod').innerHTML = 'c ' + periods[currentPeriod].date_start+' по '+periods[currentPeriod].date_end+'<br><span style="font-size:0.7em">'+periods[currentPeriod].molds+ ' форм, плановый КИС: '+ periods[currentPeriod].kis;
	else  el('currentPeriod').innerHTML = "Не выбран период";
	el('dateFrom').innerHTML = "c " + dateFrom.format('D MMM YYYY HH:mm');
	el('dateTo').innerHTML = "по " + dateTo.format('D MMM YYYY HH:mm');
	
	switch(reportType){
		case 1:
			oldFlawReport();
		break;
		case 2:
			moldsReport();
		break;
		case 3:
			downtimes();
		break;
		case 4:
			newTableReport();
		break;
		case 5:
			weightsTableReport();
		break;
	}
}
function oldFlawReport(){
	el('report_type').innerHTML = 'Старый отчет по бракам';
	el('statsDiv').innerHTML = '<h2 style="page-break-before:always">Брак в целом</h2><div id="mainGraphGist" class="halfScreenGist"></div><div id="mainGraphCritGist" class="halfScreenGist"></div><div style="page-break-before:always" id="mainGraph"></div><div id="mainStat"></div><h2 style="page-break-before:always">Брак по типу</h2><div id="flawByTypeGist"></div><div id="flawByType"></div><br><div id="flawTypes"></div><h2 style="page-break-before:always">Брак по формам</h2><div id="flawByMoldGist" ></div><div id="flawByMold"></div><br><div id="usedMolds"></div><div id="moldsData"></div>';
	processStats();
}
function doFilter(lineData){
	
	var filtres = [];

	machineIterator(function(p){
	
		for(var moldId in this){
			
			//console.log(f);
			
			for(var flawId in this[moldId].flaw){
				
				//console.log(flawId);
				
				//if(!f[flawId].flaw_type) f.push(f[flawId].flaw_type);
				
				
			}
			
		}
		
	}(filtres), lineData);
	
	return filtres;
	
}
function newTableReport(){
	el('statsDiv').innerHTML = '<h2 style="page-break-before:always">Брак по всем внесенным данным  актуальным на период</h2></div><div id="newRepData"></div>';
	el('report_type').innerHTML = 'Отчет по бракам (таблица)';
	
	var resultHTML;
	
	resultHTML = '<table border><tr><th>Время</th><th>Параметр</th><th>Значение параметра</th><th>% брака</th><th>Способ устранения</th><th>примечание</th><th>Способ коррекции</th></tr>';
	
	$.ajax('wraper.php',{type:"GET", data:{task:"getStats", period:currentPeriod},success:function f(data){
		//log(data);
		
		stats = $.parseJSON('{'+data+'}');
		
		stats = stats.lineState;
		
		//var filter = doFilter(stats);
		//alert(filter);
		var oddEven=1;
		machineIterator(function(){
			var startDiff;
			var intersection;
			var flawLength;
			var flawDateStart, flawDateEnd, moldDateStart, moldDateEnd;
			for(var moldId in this){
				for(var flawId in this[moldId].flaw){
						
						flawData = this[moldId].flaw[flawId];
						//console.log(flawData);
						flawDateStart = moment(flawData.date_start);
						if(flawData.date_end == null) flawDateEnd = moment();
						else flawDateEnd = moment(flawData.date_end);
						if (flawDateStart.isBetween(dateFrom, dateTo) || flawDateEnd.isBetween(dateFrom, dateTo)){ 
								if(oddEven == 1 ) {
									resultHTML +='<tr class=even>';
									oddEven = 0;
								}
								else {
									resultHTML +='<tr class=odd>';
									oddEven = 1;
								}
								resultHTML += '<td>' + moment(flawData.date_start).format("DD.MM.YY, H:mm") + ' - ';
								if (flawData.date_end) resultHTML += moment(flawData.date_end).format("DD.MM.YY, H:mm") + '</td>';
								else resultHTML += 'не устранен</td>';
						resultHTML += '<td>' + defects[flawData.flaw_type].title + '</td><td>' + flawData.parameter_value + '</td><td>' + flawData.flaw_part + '%</td><td>' + corrective_actions[flawData.action].title + '</td><td>' + flawData.comment + '</td>';
								if(flawData.corrective_action) 	resultHTML += '<td>' + SFM_actions[flawData.corrective_action] + '</td></tr>';
								else resultHTML += '<td>Ожидает коррекции</td></tr>';
						}
				}
			}
			
		},stats);
		resultHTML+='</table>';
		el('statsDiv').innerHTML += resultHTML;
	}, error:error_handler});
	//alert("Готово");
	
}
function weightsTableReport(){
	el('statsDiv').innerHTML = '<h2 style="page-break-before:always">Взвешивания</h2></div><div id="wGraph"></div><div id="newRepData"></div>';
	el('report_type').innerHTML = 'Отчет по весам (таблица)';
	var resultHTML;
	
	//resultHTML = '<table><tr><th>Время</th><th>Параметр</th><th>Значение параметра</th><th>% брака</th><th>примечание</th><th>Способ коррекции</th></tr>';
	//Alert(dateFrom.format()+"  "+dateTo.format());

	$.ajax('wraper.php',{type:"GET", data:{task:"getWeightsStats", period:currentPeriod, dateFrom:dateFrom.format("YYYY-MM-DD HH:mm"), dateTo:dateTo.format("YYYY-MM-DD HH:mm")},success:function f(data){
		//log(data);
		el('statsDiv').innerHTML += data;
	}, error:error_handler});
	
	$.ajax('weights.php',{type:"GET", data:{period:currentPeriod, dateFrom:dateFrom.format("YYYY-MM-DD HH:mm"), dateTo:dateTo.format("YYYY-MM-DD HH:mm")},success:function f(data){
		var resp=$.parseJSON(data);

		var yAxis = {
			title: {
				text: "граммы"
			}
		};
		$('#wGraph').highcharts({
        title: {
            text: "Вес бутылки",
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: resp.dates
        },
        yAxis: yAxis,
        tooltip: {
            valueSuffix: " г"
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            data: resp.weights
        }]
    });
	}, error:error_handler});
	
}
function moldsReport(){
	el('statsDiv').innerHTML = '<h2 style="page-break-before:always">Брак в целом</h2><div id="mainGraphGist" class="halfScreenGist"></div><div id="mainGraphCritGist" class="halfScreenGist"></div><div style="page-break-before:always" id="mainGraph"></div><div id="mainStat"></div><h2 style="page-break-before:always">Брак по типу</h2><div id="flawByTypeGist"></div><div id="flawByType"></div><br><div id="flawTypes"></div><h2 style="page-break-before:always">Брак по формам</h2><div id="flawByMoldGist" ></div><div id="flawByMold"></div><br><div id="usedMolds"></div><div id="moldsData"></div>';
	el('report_type').innerHTML = 'Отчет по формам';
	$.ajax('wraper.php',{type:"GET", data:{task:"getMoldsStats", periodId:currentPeriod},success:function f(data){
		//log(data);
		moldsData = $.parseJSON(data);
		moldsHours = {};
		for(var mold in moldsData){
			for(var period in moldsData[mold]){
				if(moldsData[mold][period]['date_end'] == null) moldsData[mold][period]['date_end'] = moment();
				if(typeof(moldsHours[mold]) == 'undefined') moldsHours[mold] = 0;
				moldsData[mold][period].hours = moment(moldsData[mold][period]["date_end"]).diff(moldsData[mold][period]["date_start"], 'hours');
				moldsHours[mold] += moldsData[mold][period].hours*1;
			}
		}
		//console.log(jstr(moldsHours));
		el('statsDiv').innerHTML = '<h2>Отчет по чистовым формам</h2>';
		for(var mold in moldsHours){
			el('statsDiv').innerHTML += '<div class="usable" onclick="getMoldHist('+mold+')">Форма ' + mold + ', ' + moldsHours[mold] + ' ч. </div>';
		}
	}, error:error_handler});
	//alert("Отчет по формам");
}
function getMoldHist(mold){
	modalWindow.show('Форма ' + mold +', ' + moldsHours[mold] + 'ч.', function f(contentDiv){
		wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		
		for(var p in moldsData[mold]){
			wDiv.innerHTML += '<div>c ' + moment(moldsData[mold][p].date_start).format('DD.MM.YY HH:mm') + ', ' + moldsData[mold][p].hours + ' ч. </div>';
		}
		contentDiv.appendChild(wDiv);
	});
}
function downtimes(){
	el('report_type').innerHTML = 'Отчет по простоям';
	//alert("Отчет по Простоям");
	el('statsDiv').innerHTML = '<h2>Отчет по чистовым формам</h2> В разработке / Now developing';
}
function showRepTypeSelector(){
	modalWindow.show("Тип отчета", function(contentDiv){
		wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML += '<div class="usable" onclick="setRepType(1)">Старый отчет по бракам</div>';
		wDiv.innerHTML += '<div class="usable" onclick="setRepType(2)">Отчет по формам</div>';
		wDiv.innerHTML += '<div class="usable" onclick="setRepType(3)">Отчет по простоям</div>';
		wDiv.innerHTML += '<div class="usable" onclick="setRepType(4)">Отчет по бракам (таблица)</div>';
		wDiv.innerHTML += '<div class="usable" onclick="setRepType(5)">Отчет по весам (График + таблица)</div>';
		contentDiv.appendChild(wDiv);
	});
}
function setRepType(t){
	if(reportType = 1){
		if($('#flawByMoldGist').highcharts()) $('#flawByMoldGist').highcharts().destroy();
		if($('#flawByMold').highcharts()) $('#flawByMold').highcharts().destroy();
		if($('#flawByTypeGist').highcharts()) $('#flawByTypeGist').highcharts().destroy();
		if($('#flawByType').highcharts()) $('#flawByType').highcharts().destroy();
		
		if($('#mainGraphGist').highcharts()) $('#mainGraphGist').highcharts().destroy();
		if($('#mainGraphCritGist').highcharts()) $('#mainGraphCritGist').highcharts().destroy();
		if( $('#mainGraph').highcharts()) $('#mainGraph').highcharts().destroy();
		if( $('#wGraph').highcharts()) $('#wGraph').highcharts().destroy();
	}
	clearInterface();
	reportType = t;
	modalWindow.hide();
	updateInterface();
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
						setPeriod(d);
						customWindow.hide();
					}
					}(id);
			divInContentDiv.appendChild(newElem);
		}
}
function setPeriod(per){
	currentPeriod = per;
	dateFrom = moment(periods[per].date_start);
	dateTo = moment(periods[per].date_end);
	getStats();
	clearInterface();
	updateInterface();
}
function productionSelector(contentDiv){
	var inputStr = document.createElement('INPUT');
	var divInContentDiv = document.createElement('DIV');
		divInContentDiv.style.textAlign = 'left';
		divInContentDiv.style.width = '300px';
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
					newElem.innerHTML = highlight(productionList[id].code, str)+'('+productionList[id].fullName+')';
					newElem.onclick = function(d){
							return function(){
								setCurrentProduction(d);
								customWindow.hide();
							}
							}(id);
					divInContentDiv.appendChild(newElem);
				}
			}
		}
		inputStr.onkeyup();
}
function setCurrentProduction(id){
	currentPeriod = null;
	currentProduction = id;
	//updateInterface();
	getPeriods();
}
function calCallback(){	
	updateInterface();
	processStats();
}
function clearInterface(){
	el('statsDiv').innerHTML = '';
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