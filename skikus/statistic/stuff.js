var currentPostanovkaId;
var destVariableName;
var startReportDate, endReportDate;
var moldsOnLine=20;
var jsonProd={};
var jsonDefects={};
var jsonMoves={};
var jsonProductionListFromLine={};
var jsonAllProductionList={};

var barsReject={};
var barsLevel={}
var barsMolds=[];
var barsMoldsTitles=[];

var line=4;
var kis=85;
var allowCriticalFlaw= 0.5;
var allowSeriousFlaw= 3.0;
var allowNonSeriousFlaw= 6.5;


function get_changes(){
		$.ajax('stat.php',{type:"GET", data:{get_changes:"yes", line_number:line},success:function(prod){
			//alert(prod);
			jsonProductionListFromLine=$.parseJSON(prod);
			var idm=0;
			for (i in jsonProductionListFromLine){
				if (i!="result"){
					if(parseInt(i)>idm) idm=parseInt(i);
				}
			}
		currentPostanovkaId=idm;
		productionListClick(idm);
		
		}, error:error_handler});
		
}
function getFlaw(id){
	currentPostanovkaId=id;
	moldsOnLine=parseInt(jsonProductionListFromLine[id].forms);
	el("reportByMolds").innerHTML="";
	el("forms").innerHTML=moldsOnLine;
	el("lastProduction").innerHTML='<div class="inlineDiv" onclick="popup(\'Продукция\', r.get_changes_list(), 130, 65);">'+jsonAllProductionList[jsonProductionListFromLine[id].production_id].format_name+'</div>';
	closePopup();
	$.ajax('stat.php',{type:"GET", data:{get_defects:"yes", line:line, id:id},success:function(prod){
			jsonDefects=$.parseJSON(prod);
			//alert("полученные дефекты: >>"+jstr(jsonDefects)+"<< ");
			kis = parseInt(jsonProductionListFromLine[currentPostanovkaId].kis);
			startReportDate = moment(jsonDefects.result.date_start);
			endReportDate = moment(jsonDefects.result.date_end);
			makeReport();
		}, error:error_handler});
}
function get_moves(id){
	$.ajax('stat.php',{type:"GET", data:{get_moves:"yes", line:line, id:id},success:function(prod){
		window.jsonMoves=$.parseJSON(prod);
		jsonMoves={};
		//log("полученные установки форм: >>"+jstr(r.jsonMoves)+"<< ");
	}, error:error_handler});
}
function getProdList(){
	$.ajax('../production.php',{type:"GET", data:{get_production_list:"yes"},success:function(prod_list){
		window.jsonProductionListFromLine=$.parseJSON(prod_list);
		if (window.jsonProductionListFromLine.result.status=='ok'){
			jsonAllProductionList={};
			jsonAllProductionList=window.jsonProductionListFromLine;
		}
		else{
			alert ('Ошибка: '+jsonProductionListFromLine.message);	
		}
		
	}, error:error_handler});
}
function lineSelect(i){
	line=i;
	resetPage();
	el("reportByMolds").innerHTML="";
	el("lastProduction").innerHTML="[Загрузка...]";
	closePopup();
	get_changes();
};
function lineSelectContent(){
	var text="";
	for (var i=1;i<10;i++){
		text+='<div class="lineSelectorItem" onclick="lineSelect('+i+')">'+i+'</div>';
	}
	return text;
};
function productionListClick(id){
	resetPage();
	currentPostanovkaId=id;
	getFlaw(currentPostanovkaId);
	el("lastProduction").innerHTML=jsonAllProductionList[jsonProductionListFromLine[id].production_id].format_name;
}
function ok(){
	window[destVariableName]=tempDate;
	closePopup();
	makeReport();
}
function expandDefect(name){
	if($('[name="'+name+'"]').css('display')=='none'){
		$('[name="'+name+'"]').css('display','block');
	}else{
		$('[name="'+name+'"]').css('display','none');
	}
}
function getListFromProductionOnLine(){
	var text='';
	for(var i in jsonProductionListFromLine){
		if (i!="result"){
			text+='<div class="lineSelectorItem"> <a href="#" onclick="getFlaw('+i+');">'+jsonAllProductionList[jsonProductionListFromLine[i].production_id].format_name+' c '+jsonProductionListFromLine[i].date_time+'</a></div>';
		}
	}
	return text;
}
function summaryReportByReject(byMoldsData){
	var defect = null;
	var reportDataByReject={};
	var periodMinutes = endReportDate.diff(startReportDate, 'minutes');
	
	for(var m in byMoldsData){
		if (m!="summ"){
		for(var d in byMoldsData[m]){
				defect=byMoldsData[m][d];
				if(d!='summ'){
					if(typeof(reportDataByReject[defect.action])=='undefined'){
						reportDataByReject[defect.action]=0;
					}
					reportDataByReject[defect.action]+=flawPartByDefect(defect);
				} //else alert(jstr(defect));
			}
		}
	}
	//alert(jstr(reportDataByReject));
	if(!reportDataByReject[1]) reportDataByReject[1]=0;
	if(!reportDataByReject[2]) reportDataByReject[2]=0;
	if(!reportDataByReject[3]) reportDataByReject[3]=0;
	reportDataByReject[4]=100-reportDataByReject[2]-reportDataByReject[3]
	return reportDataByReject;
}
function summaryReportByDefectLevel(byMoldsData){
	var defect = null;
	var reportDataByDefectLevel={};
	var periodMinutes = endReportDate.diff(startReportDate, 'minutes');
	
	for(var m in byMoldsData){
		if (m!="summ"){
		for(var d in byMoldsData[m]){
				defect=byMoldsData[m][d];
				if(d!='summ'){
					if(typeof(reportDataByDefectLevel[defects[defect.type].level])=='undefined'){
						reportDataByDefectLevel[defects[defect.type].level]=0;
					}
					reportDataByDefectLevel[defects[defect.type].level]+=flawPartByDefect(defect);
				} //else alert(jstr(defect));
			}
		}
	}
	//alert(jstr(reportDataByDefectLevel));
	if(!reportDataByDefectLevel[1]) reportDataByDefectLevel[1]=0;
	if(!reportDataByDefectLevel[2]) reportDataByDefectLevel[2]=0;
	if(!reportDataByDefectLevel[3]) reportDataByDefectLevel[3]=0;
	//reportDataByDefectLevel[4]=100-reportDataByDefectLevel[2]-reportDataByDefectLevel[3]
	return reportDataByDefectLevel;
}
function sortDataByMolds(){
	var byMoldsData={};
	var currentMoldFlawPart=0;
	var startDate, endDate, startCountDate, endCountDate;
	var currentDefectFlawPart=0;
	for(var i in jsonDefects){
		defect = jsonDefects[i];
		if (i!="result"){
			startDate=moment(defect.date_start);
			if (!defect.date_end) endDate=moment();
			else endDate=moment(defect.date_end);
			if (startDate.isBefore(endReportDate)){
				if(endDate.isAfter(startReportDate)){
					
					if (startDate.isBefore(startReportDate)){
						startCountDate=startReportDate;
					} else { 
						startCountDate=startDate;
					}
					if (endDate.isAfter(endReportDate)>0){
						endCountDate=endReportDate;
					} else { 
						endCountDate=endDate;
					}
			

					if(typeof(byMoldsData[defect.form])=='undefined'){
						byMoldsData[defect.form]={};
					}
					defect.date_start=startCountDate.format("YYYY-MM-DD HH:mm");
					defect.date_end=endCountDate.format("YYYY-MM-DD HH:mm");
					//log(defect.id+": "+defect.date_start+" - "+defect.date_end);
					byMoldsData[defect.form][defect.id]=defect;
					currentDefectFlawPart=flawPartByDefect(defect);
					//alert(currentDefectFlawPart);
					byMoldsData[defect.form][defect.id].summ = currentDefectFlawPart;
					if(typeof(byMoldsData[defect.form].summ)=='undefined'){
						byMoldsData[defect.form].summ=0;
					}
					if(defect.action!="1") byMoldsData[defect.form].summ+=currentDefectFlawPart;

					
				}else{}
			}else{}
		}
		
	}
	return byMoldsData;
}
function generateHtmlForReport(byMoldsData){
	var generatedHtml="";
	var totalSumm=0;
	barsMolds=[];
	barsMoldsTitles=[];
	for(var m in byMoldsData){
		generatedHtml+='<div style="font-size:1.2em;padding-top:10px;cursor:pointer;" onclick="expandDefect(\'m'+m+'\');">Форма '+m+': <b>'+(byMoldsData[m].summ).toFixed(2)+'%</b> (кликнете, чтобы развернуть)<br><div name="m'+m+'" style="display:none;">';
		barsMolds.push(parseFloat((byMoldsData[m].summ).toFixed(2)));
		barsMoldsTitles.push(m);
		for(var d in byMoldsData[m]){
			if(d!="summ") {
				generatedHtml+=getHtmlForDefect(byMoldsData[m][d]);
			} else{
				totalSumm+=byMoldsData[m][d];
			}
		}
		generatedHtml+='</div></div>';
	}
	generatedHtml+='<div><b>Итого '+totalSumm.toFixed(2)+'%</b></div>';
	//alert(jstr(barsMolds));
	return generatedHtml;
}
function flawPartByDefect(defect){
	var result;
	var periodMinutes=endReportDate.diff(startReportDate, 'minutes');
	var percent=parseFloat(defect.share);
	var flawPeriod=moment(defect.date_end).diff(moment(defect.date_start), 'minutes');
	result = (flawPeriod/periodMinutes)*percent;
	return result;
}
function showFlawByLevelBars(){
   $('#barsLevel').highcharts({
        chart: {
            type: 'column'
        },
		colors:['#FF0000', '#FFFF10', '#999999']
		,
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по критичности'
        },
        yAxis: {
            min: 0,
			max:20,
            title: {
                text: 'Проценты, %'
            },
			plotLines: [{
                color: '#FF0000',
                width: 2,
                value: allowCriticalFlaw,
				label: {
                    text: 'Критичный('+allowCriticalFlaw+'%)',
                    align: 'left',
                    x: 10
                }
				},{
                color: '#FFFF10',
                width: 2,
                value: allowSeriousFlaw,
				label: {
                    text: 'Опасный ('+allowSeriousFlaw+'%)',
                    align: 'left',
                    x: 60
                }
            },{
                color: '#9999AA',
                width: 2,
                value: allowNonSeriousFlaw,
				label: {
                    text: 'Не опасный ('+allowNonSeriousFlaw+'%)',
                    align: 'left',
                    x: 110
                }
            }]
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
            name: 'Критические',
            data: [parseFloat(barsLevel[3].toFixed(2))]

        }, {
            name: 'Опасные',
            data: [parseFloat(barsLevel[2].toFixed(2))]

        }, {
            name: 'Не опасные',
            data: [parseFloat(barsLevel[1].toFixed(2))]
        }]
    });
}
function showFlawByRejectBars(){
   $('#barsReject').highcharts({
        chart: {
            type: 'column'
        },
		colors:['#FF0000', '#FFFF10','#0AA0FF']
		,
        title: {
            text: 'Брак'
        },
        subtitle: {
            text: 'по сбросу'
        },
        yAxis: {
            min: 0,
			max:100,
            title: {
                text: 'Проценты, %'
            },
			plotLines: [{
                color: '#00FF00',
                width: 2,
                value: kis,
				label: {
                    text: 'КИС('+kis+'%)',
                    align: 'left',
                    x: 10
                }
            }
			]
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
        series: [
			{
				name: 'MNR',
				data: [parseFloat(barsReject[3].toFixed(2))]

			}, {
				name: 'ИО и Визуал',
				data: [parseFloat(barsReject[2].toFixed(2))]

			},/*{
				name: 'Предупреждение',
				data: [parseFloat(barsReject[1].toFixed(2))]

			}*/{
				name: 'Годная продукция',
				data: [parseFloat(barsReject[4].toFixed(2))]

			}
		]
    });
}
function showMoldBars(){
	$('#barsByMold').highcharts({
        chart: {
            type: 'column'
        },
		colors:['#0000bb']
		,
        title: {
            text: 'Сброс'
        },
        subtitle: {
            text: 'по формам'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Проценты, %'
            }
        },
		xAxis:{
			categories: barsMoldsTitles
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
            name: 'Сброс по формам',
            data: barsMolds

        }]
    });
}
function resetPage(){
	el('log').innerHTML="";
	el("startDate").innerHTML="...";
	el("endDate").innerHTML="...";
	el("currentLine").innerHTML="Линия "+line;
	
	if($('#barsLevel').highcharts()){
		$('#barsLevel').highcharts().destroy();
		$('#barsReject').highcharts().destroy();
		$('#barsByMold').highcharts().destroy();
	}
	
}
function getHtmlForDefect(def){
	var clss="";
	if(def.action==1) clss=" greyText";
	return '<div class="reportLine'+clss+'" style="display:block;font-size:0.7em;" name="div'+def.form+'"><div style="background-color:'+corrective_actions[def.action].color+';width:1em;height:1em;display:inline-block;border:1px solid black;margin-right:0.5em;" title="'+corrective_actions[def.action].title+'"></div><div class="inlineDiv title"> '+defects[def.type].title+'</div><div class="date inlineDiv">'+moment(def.date_start).format("D MMM H:mm")+'</div><div class="percent inlineDiv">'+ (def.summ).toFixed(2)+'%</div></div>';
}
function makeReport(){
	el("startDate").innerHTML=startReportDate.format('D MMMM YYYY, HH:mm');
	el("endDate").innerHTML=endReportDate.format('D MMMM YYYY, HH:mm');
	var barsData=sortDataByMolds();
	barsReject=summaryReportByReject(barsData);
	barsLevel=summaryReportByDefectLevel(barsData);
	
	showFlawByLevelBars();
	showFlawByRejectBars(barsReject);
	el('reportByMolds').innerHTML=generateHtmlForReport(barsData);
	showMoldBars();
}
