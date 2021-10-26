var mainGraphArray=[];
var mainArray = [];
var mainContainer = el('statsDiv');
var molds = 0;
var flaws = 0;
function processStats(){
	var periodDiff = dateTo.diff(dateFrom, 'minutes');
	mainGraphArray = getMainGraphArray();
	log('<b>molds:' + molds + ', flaws:' + flaws + '</b>');
	log(jstr(mainGraphArray));
	showMainGraph();
	//alert(periodDiff);
}
function getMainGraphArray(){
	var startDiff;
	var intersection, moldsFlaw;
	var flawLength;
	var startAddingDate, endAddingDate;
	var flawDateStart, flawDateEnd;
		mainArray['total'] = [];
		mainArray['MNR'] = [];
		mainArray['IO'] = [];
	for(i=0;i<=parseInt(dateTo.diff(dateFrom,'minutes')); i++){
		mainArray['total'][i] = 0;
		mainArray['MNR'][i] = 0;
		mainArray['IO'][i] = 0;
	}
	log('вхiд');
	log('<b>c '+dateFrom.format('D MMM YYYY HH:mm')+' по '+dateTo.format('D MMM YYYY HH:mm')+'</b>');
	log('<b>diff:</b>'+dateTo.diff(dateFrom,'minutes')+'');
	machineIterator(iterFunc,stats);
	return mainArray;
}
function iterFunc(){
	var fPart = 0;
	for(var moldId in this){
		log(this[moldId].mold);
		molds++;
		for(var flawId in this[moldId].flaw){
		/*	flawCursor = this[moldId].flaw[flawId];
			log('flaw ID:'+flawId+', start date:' + flawCursor.date_start + ', end date:' + flawCursor.date_end);*/
			flaws++;
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
	else date1 = range1start;
	return  {'date1':date1, 'date2':date2};
}
function showMainGraph(){
	$('#mainGraph').highcharts({
		/*plotOptions:{
			series:{
				turboThreshold: 100000
			}
		},*/
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
            
        },
        yAxis: {
			min: 0,
			max:50,
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
        series: [{
            name: 'Весь брак',
            data: mainGraphArray['total']
        },{
            name: 'MNR',
            data: mainGraphArray['MNR']
        },{
            name: 'ИО и визуал',
            data: mainGraphArray['IO']
        }]
    });
}