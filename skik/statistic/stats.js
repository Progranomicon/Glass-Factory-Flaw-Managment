var allowCriticalFlaw = 0.25;
var allowDangerousFlaw = 1.0;
var allowSeriousFlaw = 2.5;
var allowLessSeriousFlaw = 4.0;
var allowNonSeriousFlaw = 6.5;

var periodDiff;
var currentFlawTypeId = 0, currentMold = 0;
var series = [];
var seriesByType = [];
var seriesByMold = [];
var flawByMold = [];
var flawByType = [];
var moldsIds = [];
var flawIds = [];
var mainArray = [];
var mainStat = [];
var preparedByFlaw, preparedByMold;
var byFlawCategs, byMoldCategs;

var molds = 0;
var flaws = 0;
function processStats(){
	periodDiff = dateTo.diff(dateFrom, 'minutes');
	moldsIds = [];
	flawIds = [];
	getMainGraphArray();
	//log('<b>molds:' + molds + ', flaws:' + flaws + '</b>');
	el('mainStat').innerHTML = '';
	el('mainStat').innerHTML = '';
	el('flawTypes').innerHTML = '';
	/*for(var i in flawIds){
		el('flawTypes').innerHTML += '<span class="usable" style="padding:10px;" onclick="processFlawByType('+i+')"> '+ defects[i].title + '('+normF(flawIds[i], 2)+'%)</span>'; 
	}
	el('usedMolds').innerHTML = '';
	for(var i in moldsIds){
		el('usedMolds').innerHTML += '<span class="usable" style="padding:10px;" onclick="processFlawByMold('+i+')">Ф'+ i + '('+normF(moldsIds[i], 2)+'%) </span>'; 
	}*/
	el('mainStat').innerHTML = '<span style="padding:10px;">Всего сброс: ' + normF(mainStat['total'], 2) + '%, MNR: ' + normF(mainStat['MNR'],2) + '%, ИО и визуал: ' + normF(mainStat['IO'],2) + '%</span>';
	prepareToGist();
	showColumns();
	showMainGraph();
}
function prepareToGist(){
	preparedByFlaw = [];
	preparedByMold = [];
	byFlawCategs = [];
	byMoldCategs = [];
	for(var i in flawIds){
		byFlawCategs.push(defects[i].title);
		preparedByFlaw.push({y:parseFloat(normF(flawIds[i]*1, 2)), ft:i})
		
	}
	for(var i in moldsIds){
		byMoldCategs.push(i);
		preparedByMold.push({y:parseFloat(normF(moldsIds[i], 2)), mo:i})
	}
}
function getMainGraphArray(){
		mainArray['total'] = [];
		mainArray['MNR'] = [];
		mainArray['IO'] = [];
		
		mainStat['total'] = 0;
		mainStat['MNR'] = 0;
		mainStat['IO'] = 0;
		mainStat['critical'] = 0;
		mainStat['danger'] = 0;
		mainStat['serious'] = 0;
		mainStat['lessSerious'] = 0;
		mainStat['noDanger'] = 0;
		
		flawByType = [];
		flawByMold = [];
		
		var tempFromDate = dateFrom.clone();
		tempFromDate.utc();
	for(i=0;i<=parseInt(dateTo.diff(dateFrom,'minutes')); i++){
		
		mainArray['total'][i] = [momentToDate(tempFromDate), 0];
		
		mainArray['MNR'][i] = [];
		mainArray['MNR'][i][0] = mainArray['total'][i][0];
		mainArray['MNR'][i][1] = 0;
		

		mainArray['IO'][i] = [];
		mainArray['IO'][i][0] = mainArray['total'][i][0];
		mainArray['IO'][i][1] = 0;
		

		flawByMold[i] = [];
		flawByMold[i][0] = mainArray['total'][i][0];
		flawByMold[i][1] = 0;
		
		flawByType[i] = [];
		flawByType[i][0] = mainArray['total'][i][0];
		flawByType[i][1] = 0;
		
		tempFromDate.add('minutes', 1);
	}
	machineIterator(iterFunc,stats);
	series = [];
	series.push({name:'Весь брак', data: mainArray['total']});
	series.push({name:'MNR', data: mainArray['MNR']});
	series.push({name:'ИО и визуал', data: mainArray['IO']});
	
	//log(jstr(series));
}
function processFlawByType(flawType){
	//currentFlawTypeId = flawType;
	flawByType.forEach(function(i){
		i[1] = 0;
	});
	machineIterator(function(){
		var startDiff;
		var intersection;
		var flawLength;
		var flawDateStart, flawDateEnd;
		for(var moldId in this){
			for(var flawId in this[moldId].flaw){
				if(this[moldId].flaw[flawId].flaw_type == flawType) if(this[moldId].flaw[flawId].action > 1){
					flawData = this[moldId].flaw[flawId];
					flawDateStart = moment(flawData.date_start);
					if(flawData.date_end == null) flawDateEnd = moment();
					else flawDateEnd = moment(flawData.date_end);
					intersection = getIntersection(dateFrom, dateTo, flawDateStart, flawDateEnd);
					if(intersection){
						startDiff = intersection.date1.diff(dateFrom, 'minutes');
						flawLength = intersection.date2.diff(intersection.date1, 'minutes');
						for(minut=startDiff; minut<=(startDiff+flawLength); minut++){
							flawByType[minut][1] += parseFloat(flawData.flaw_part);
						}
					}
				}
			}
		}
	},stats);
	seriesByType = [];
	seriesByType.push({name:defects[flawType].title, data:flawByType});
	showGraphByType();
}
function processFlawByMold(mold){
	flawByMold.forEach(function(i){
		i[1] = 0;
	});
	machineIterator(function(){
		var startDiff;
		var intersection;
		var flawLength;
		var flawDateStart, flawDateEnd;
		for(var moldId in this){
			if(this[moldId].mold==mold)
				for(var flawId in this[moldId].flaw){
					if(this[moldId].flaw[flawId].action > 1){
						flawData = this[moldId].flaw[flawId];
						flawDateStart = moment(flawData.date_start);
						if(flawData.date_end == null) flawDateEnd = moment();
						else flawDateEnd = moment(flawData.date_end);
						intersection = getIntersection(dateFrom, dateTo, flawDateStart, flawDateEnd);
						if(intersection){
							startDiff = intersection.date1.diff(dateFrom, 'minutes');
							flawLength = intersection.date2.diff(intersection.date1, 'minutes');
							for(minut=startDiff; minut<=(startDiff+flawLength); minut++){
								flawByMold[minut][1] += parseFloat(flawData.flaw_part);
							}
						}
					}
				}
		}
	},stats);
	seriesByMold = [];
	seriesByMold.push({name:'Форма '+mold, data:flawByMold});
	showGraphByMolds();
}
function momentToDate(mom){ // utc format
	return Date.UTC(mom.years(), mom.months(), mom.dates(), mom.hours(), mom.minutes());
}
function getTotalFlawPart(period, flawPeriod, flawPart){
	return (flawPeriod*flawPart)/period;
}
function iterFunc(){
	var startDiff;
	var intersection;
	var flawLength;
	var flawDateStart, flawDateEnd;
	var fPart = 0;
	var totalFlawPart;
	for(var moldId in this){
		for(var flawId in this[moldId].flaw){
			flawData = this[moldId].flaw[flawId];
			flawDateStart = moment(flawData.date_start);
			if(flawData.date_end == null) flawDateEnd = moment();
			else flawDateEnd = moment(flawData.date_end);
			intersection = getIntersection(dateFrom, dateTo, flawDateStart, flawDateEnd);
			if(intersection){
				startDiff = intersection.date1.diff(dateFrom, 'minutes');
				flawLength = intersection.date2.diff(intersection.date1, 'minutes');
				if(flawData.action>1){ if (!flawIds[flawData.flaw_type]) flawIds[flawData.flaw_type] = 0;
					totalFlawPart = getTotalFlawPart(periodDiff, flawLength, parseFloat(flawData.flaw_part));
					flawIds[flawData.flaw_type] += totalFlawPart;
				}else totalFlawPart = 0;
				for(minut=startDiff; minut<=(startDiff+flawLength); minut++){
					mainArray['total'][minut][1] += parseFloat(flawData.flaw_part);	
					if( flawData.action == 3) mainArray['MNR'][minut][1] += parseFloat(flawData.flaw_part);
					if( flawData.action == 2) mainArray['IO'][minut][1] += parseFloat(flawData.flaw_part);
				}
				if(flawData.action == 2){
					mainStat['total'] += totalFlawPart;
					mainStat['IO'] += totalFlawPart;
				}
				if(flawData.action == 3){
					mainStat['total'] += totalFlawPart;
					mainStat['MNR'] += totalFlawPart;
				}
				switch(defects[flawData.flaw_type].level){
					case "1":
						mainStat['noDanger'] +=  totalFlawPart;
					break;
					case "2":
						mainStat['lessSerious'] +=  totalFlawPart;
					break;
					case "3":
						mainStat['serious'] +=  totalFlawPart;
					break;
					case "4":
						mainStat['danger'] +=  totalFlawPart;
					break;
					case "5":
						mainStat['critical'] +=  totalFlawPart;
					break;
				}
				if(!moldsIds[this[moldId].mold]) moldsIds[this[moldId].mold] = 0;
				moldsIds[this[moldId].mold] += totalFlawPart;
			}
		}
	}
}
function getIntersection(range1start, range1end, range2start, range2end){
	var date1, date2;
	if(range1start.isAfter(range2end)) return false;
	if(range1end.isBefore(range2start)) return false;
	if (range1start.isAfter(range2start)) date1 = range1start;
	else date1 = range2start;
	if (range1end.isAfter(range2end)) date2 = range2end;
	else date2 = range1end;
	return  {'date1':date1, 'date2':date2};
}
function showMainGraph(){
	Highcharts.setOptions({
        global: {
            timezoneOffset: -180
        }
    });
	$('#mainGraph').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Брак',
            x: -20 //center
        },
        subtitle: {
            text: 'за выбранный период',
            x: -20
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
			min: 0,
            title: {
                text: '%'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
		plotOptions: {
			series:{
				cursor: 'pointer',
				point:{
					events:{
						click:function(e){
							//console.log(this.options.x);
							getMNRDiscsardByDateHTML(moment(this.options.x));
						}
					}
				}
			},
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: series
    });
}
function showGraphByType(){
	$('#flawByType').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Брак',
            x: -20 //center
        },
        subtitle: {
            text: defects[currentFlawTypeId].title,
            x: -20
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
			min: 0,
			//max:50,
            title: {
                text: '%'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
			crosshairs: true,
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
		plotOptions: {
			series:{
				cursor: 'pointer',
				point:{
					events:{
						click:function(e){
							getFlawByDateHTML(moment(this.options.x));
						}
					}
				}
			},
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: seriesByType
    });
}
function showGraphByMolds(){
	$('#flawByMold').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Брак',
            x: -20 //center
        },
        subtitle: {
            text: 'по форме №' + currentMold,
            x: -20
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
			min: 0,
			//max:50,
            title: {
                text: '%'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
		plotOptions: {
			series:{
				cursor: 'pointer',
				point:{
					events:{
						click:function(e){
							getMoldByDateHTML(moment(this.options.x));
						}
					}
				}
			},
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: seriesByMold
    });
}
function showColumns(){
    $('#mainGraphGist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по сбросу'
        },
        xAxis: {
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            },plotLines: [{
                color: '#00ff00',
                width: 2,
                value: parseFloat(periods[currentPeriod].kis),
				label: {
                    text: 'КИС('+parseFloat(periods[currentPeriod].kis)+'%)',
                    align: 'left',
                    x: 10
                }
			}]
        },
        tooltip: {
        },
        plotOptions: {
			series:{
				cursor: 'pointer'
			},
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
				dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Всего',
            data: [parseFloat(normF(mainStat['total'], 2))]

        }, {
            name: 'MNR',
            data: [parseFloat(normF(mainStat['MNR'], 2))],
			color: '#ff1010'

        }, {
            name: 'ИО и визуал',
            data: [parseFloat(normF(mainStat['IO'], 2))],
			color: '#ffff10'

        }, {
            name: 'Годная продукция',
            data: [parseFloat(normF(100-mainStat['total'],2))],
			color: '#7cb5ec'
        }]
    });
	$('#mainGraphCritGist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по критичности'
        },
        xAxis: {
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            },
			plotLines: [{
                color: '#CC3300',
                width: 2,
                value: allowCriticalFlaw,
				label: {
                    text: 'Критический('+allowCriticalFlaw+'%)',
                    align: 'left',
                    x: 10
                }
				},{
                color: '#FF0000',
                width: 2,
                value: allowDangerousFlaw,
				label: {
                    text: 'Опасный ('+allowDangerousFlaw+'%)',
                    align: 'left',
                    x: 10
                }
            },{
                color: 'orange',
                width: 2,
                value: allowSeriousFlaw,
				label: {
                    text: 'Значительный ('+allowSeriousFlaw+'%)',
                    align: 'left',
                    x: 10
                }
            },{
                color: '#FFCC33',
                width: 2,
                value: allowLessSeriousFlaw,
				label: {
                    text: 'Менее опасный ('+allowLessSeriousFlaw + '%)',
                    align: 'left',
                    x: 10
                }
            },{
                color: 'yellow',
                width: 2,
                value: allowNonSeriousFlaw,
				label: {
                    text: 'Не опасный ('+allowNonSeriousFlaw+'%)',
                    align: 'left',
                    x: 10
                }
            }]
        },
        tooltip: {
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
				 dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Критический',
            data: [parseFloat(normF(mainStat['critical'], 2))],
			color: '#CC3300'
        }, {
            name: 'Опасный',
            data: [parseFloat(normF(mainStat['danger'], 2))],
			color: '#f00'
        },{
            name: 'Значительный',
            data: [parseFloat(normF(mainStat['serious'], 2))],
			color: 'orange'
        },{
            name: 'Менее опасный',
            data: [parseFloat(normF(mainStat['lessSerious'], 2))],
			color: '#FFCC33'
        }, {
            name: 'Не опасный',
            data: [parseFloat(normF(mainStat['noDanger'], 2))],
			color: 'yellow'
        }]
    });
	$('#flawByTypeGist').highcharts({
        chart: {
            type: 'column'
        },
		colors: ['#7cb5ec'],
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по типу'
        },
        xAxis: {
			categories: byFlawCategs,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            }
			
        },
        tooltip: {
        },
        plotOptions: {
			series:{
				cursor: 'pointer',
				point:{
					events:{
						click:function(e){
							currentFlawTypeId = this.options.ft;
							processFlawByType(this.options.ft);
							el('flawTypes').innerHTML = '';
						}
					}
				}
			},
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
				 dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Уровень брака',
            data: preparedByFlaw

        }]
    });
	$('#flawByMoldGist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по формам'
        },
        xAxis: {
			categories: byMoldCategs,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            }
			
        },
        tooltip: {
        },
        plotOptions: {
			series:{
				cursor: 'pointer',
				point:{
					events:{
						click:function(e){
							currentMold = this.options.mo;
							processFlawByMold(this.options.mo);
							el('usedMolds').innerHTML = '';
						}
					}
				}
			},
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
				 dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Уровень брака',
            data: preparedByMold

        }]
    });
}
function getMNRDiscsardByDateHTML(momentDate){
	var resultHTML = '<b>Сброс MNR На ' + momentDate.format('D MMM YYYY HH:mm') + '</b><br>';
	machineIterator(function(){
		var startDiff;
		var intersection;
		var flawLength;
		var flawDateStart, flawDateEnd, moldDateStart, moldDateEnd;
		for(var moldId in this){
			moldDateStart = moment(this[moldId].date_start);
			if (this[moldId].date_end == null)  moldDateEnd = moment();
			else moldDateEnd = moment(this[moldId].date_end);
			if(momentDate.isBetween(moldDateStart, moldDateEnd)){
				for(var flawId in this[moldId].flaw){
					if(this[moldId].flaw[flawId].action == 3){
						flawData = this[moldId].flaw[flawId];
						flawDateStart = moment(flawData.date_start);
						if(flawData.date_end == null) flawDateEnd = moment();
						else flawDateEnd = moment(flawData.date_end);
						if(momentDate.isBetween(flawDateStart, flawDateEnd)) resultHTML += '<div class="listItem" ><div>Форма ' + this[moldId].mold + ', ' + defects[flawData.flaw_type].title + ', ' + flawData.flaw_part + '%</div><div style="font-size:0.7em">с ' + flawData.date_start + ' по ' + flawData.date_end + '</div></div>';
					}
				}
			}
		}
	},stats);
	el('mainStat').innerHTML = resultHTML;
}
function getFlawByDateHTML(momentDate){
	var resultHTML = '<b>формы с дефектом "' + defects[currentFlawTypeId].title + '" на ' + momentDate.format('D MMM YYYY HH:mm') + '</b><br>';
	machineIterator(function(){
		var startDiff;
		var intersection;
		var flawLength;
		var flawDateStart, flawDateEnd, moldDateStart, moldDateEnd;
		for(var moldId in this){
			moldDateStart = moment(this[moldId].date_start);
			if (this[moldId].date_end == null)  moldDateEnd = moment();
			else moldDateEnd = moment(this[moldId].date_end);
			if(momentDate.isBetween(moldDateStart, moldDateEnd)){
				for(var flawId in this[moldId].flaw){
					{
						flawData = this[moldId].flaw[flawId];
						if(flawData.flaw_type == currentFlawTypeId){
							flawDateStart = moment(flawData.date_start);
							if(flawData.date_end == null) flawDateEnd = moment();
							else flawDateEnd = moment(flawData.date_end);
							if(momentDate.isBetween(flawDateStart, flawDateEnd)) resultHTML += '<div class="listItem" ><div><div style="display:inline-block;width:1em;height:1em;background-color:' + corrective_actions[flawData.action].color + ';border:1px solid black"> </div> Форма ' + this[moldId].mold + ', ' + flawData.flaw_part + '%</div><div style="font-size:0.7em">с ' + flawData.date_start + ' по ' + flawData.date_end + '</div></div>';
						}
					}
				}
			}
		}
	},stats);
	el('flawTypes').innerHTML = resultHTML;
}
function getMoldByDateHTML(momentDate){
	var resultHTML = '<b>Форма ' + currentMold + ' на ' + momentDate.format('D MMM YYYY HH:mm') + '</b><br>';
	machineIterator(function(){
		var startDiff;
		var intersection;
		var flawLength;
		var flawDateStart, flawDateEnd, moldDateStart, moldDateEnd;
		for(var moldId in this){
			if(this[moldId].mold == currentMold){
				moldDateStart = moment(this[moldId].date_start);
				if (this[moldId].date_end == null)  moldDateEnd = moment();
				else moldDateEnd = moment(this[moldId].date_end);
				if(momentDate.isBetween(moldDateStart, moldDateEnd)){
					for(var flawId in this[moldId].flaw){
						flawData = this[moldId].flaw[flawId];
						if(flawData.action > 1){
							flawDateStart = moment(flawData.date_start);
							if(flawData.date_end == null) flawDateEnd = moment();
							else flawDateEnd = moment(flawData.date_end);
							if(momentDate.isBetween(flawDateStart, flawDateEnd)) resultHTML += '<div class="listItem" ><div><div style="display:inline-block;width:1em;height:1em;background-color:' + corrective_actions[flawData.action].color + ';border:1px solid black"> </div> ' + defects[flawData.flaw_type].title + ', ' + flawData.flaw_part + '%</div><div style="font-size:0.7em">с ' + flawData.date_start + ' по ' + flawData.date_end + '</div></div>';
						}
					}
				}
			}
		}
	},stats);
	el('usedMolds').innerHTML = resultHTML;
}