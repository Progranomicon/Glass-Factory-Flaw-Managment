var dateStart = moment();
var dateEnd = moment();
var xLines=[];
function getStatsData(date1, date2){
		$.ajax('mssql.php',{type:"GET", data:{date1:date1, date2:date2,},success:statDataReciever, error:error_handler});
	}
function statDataReciever(data){
	//log(data);
	var perf = 0;
	dataObj = $.parseJSON(data);
	el('cuttedSpan').innerHTML = dataObj.sum.cutted; 
	el('ejectedSpan').innerHTML = dataObj.sum.ejected; 
	el('ejectedWareSpan').innerHTML = dataObj.sum.ejectedWare;
	perf = 100 - (((dataObj.sum.ejected + dataObj.sum.ejectedWare)/dataObj.sum.cutted) * 100);
	el('performanceSpan').innerHTML = normF(perf, 2) + '%';
	getXLines(dataObj.changes);
	showGraphs();
	showGraphBySection();
}
function getXLines(data){
	xLines = [];
	var date;
	for(var v in data){
		date = moment(data[v].date);
		date.add(data[v].hour, 'hours');
		xLines.push({
                color: 'blue',
                width: 2,
                value: momentToDate(date),
                label: {
                    text: data[v].prod,
                    verticalAlign: 'top',
                    textAlign: 'left'
                }
            }
		);
	}
}
function calCallback(){
	el('dateFrom').innerHTML = dateStart.format('D MMM YYYY 00:00');
	el('dateTo').innerHTML = dateEnd.format('D MMM YYYY 23:59');
	if(dateEnd.diff(dateStart, 'days')>30){
		alert('Период более 30 дней. Слишком много.');
		return;
	}
	if(dateStart.isAfter(dateEnd)){
		alert('Конечная дата не может быть раньше начальной.');
		return;
	}
	getStatsData(dateStart.format('YYYY-MM-DD'), dateEnd.format('YYYY-MM-DD'));
}
function error_handler(){
	log('<b>error</b>');
}
function showGraphs(){
	    $('#mainGraph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'В общем за период'
        },
        subtitle: {
            text: 'По секциям'
        },
        xAxis: {
            categories: dataObj.categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} шт</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: dataObj.summary
    });
}
function showGraphBySection(){
	for(var i in dataObj['cutted']){
		dataObj['cutted'][i].pointStart = Date.UTC(dateStart.years(), dateStart.months(), dateStart.dates());
		dataObj['cutted'][i].pointInterval = 3600000 ;
	}
	for(var i in dataObj['ejected']){
		dataObj['ejected'][i].pointStart = Date.UTC(dateStart.years(), dateStart.months(), dateStart.dates());
		dataObj['ejected'][i].pointInterval = 3600000 ;
	}
	for(var i in dataObj['idle']){
		dataObj['idle'][i].pointStart = Date.UTC(dateStart.years(), dateStart.months(), dateStart.dates());
		dataObj['idle'][i].pointInterval = 3600000 ;
	}
	for(var i in dataObj['ejectedWare']){
		dataObj['ejectedWare'][i].pointStart = Date.UTC(dateStart.years(), dateStart.months(), dateStart.dates());
		dataObj['ejectedWare'][i].pointInterval = 3600000 ;
	}
	$('#cuttedGraph').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Отрезанные капли',
            x: -20 //center
        },
        xAxis: {
			tickInterval: 4 * 3600000, // one hour
            type:'datetime',
			plotLines: xLines
        },
        yAxis: {
            title: {
                text: 'шт.'
            }
        },
        tooltip: {
            valueSuffix: ' шт.'
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
        series: dataObj['cutted']
    });
	$('#ejectedGraph').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Сброшенные капли',
            x: -20 //center
        },
        xAxis: {
			tickInterval: 4 * 3600000, // one hour
            type:'datetime',
			plotLines: xLines
        },
        yAxis: {
            title: {
                text: 'шт.'
            },
			min:0
        },
        tooltip: {
            valueSuffix: ' шт.'
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
        series: dataObj['ejected']
    });
	$('#idleGraph').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Простой секций',
            x: -20 //center
        },
        xAxis: {
			tickInterval: 4 * 3600000, // one hour
            type:'datetime',
			plotLines: xLines
        },
        yAxis: {
            title: {
                text: 'циклы'
            },
			min:0
        },
        tooltip: {
            valueSuffix: ' ц.'
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
        series: dataObj['idle']
    });
	$('#ejectedWareGraph').highcharts({
		chart:{
			type:'spline'
		},
        title: {
            text: 'Сдутая продукция',
            x: -20 //center
        },
        xAxis: {
			tickInterval: 4 * 3600000, // one hour
            type:'datetime',
			plotLines: xLines
        },
        yAxis: {
            title: {
                text: 'шт.'
            },
			min:0
        },
        tooltip: {
            valueSuffix: ' шт.'
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
        series: dataObj['ejectedWare']
    });
}