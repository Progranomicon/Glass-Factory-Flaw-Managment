var debug = false;
var production;
var periods={};
var stats={};
function getProductionList(){
	$.ajax('../../production.php',{type:"GET", data:{task:"getProduction"},success:productionReciever, error:error_handler});
}
function productionReciever(jsonProduction){
	//log(jsonProduction);
	var productionData = $.parseJSON(jsonProduction);
		productionList = productionData.data.production;
		showMessages(productionData.info.messages);
		if(currentProduction) setCurrentProduction(currentProduction);
}
function error_handler(){
	miniMessage('Ошибка сети');
}
function getPeriods(){
	$.ajax('wraper.php',{type:"GET", data:{task:"getPeriods", production:currentProduction},success:periodsReciever, error:error_handler});
}
function periodsReciever(jsonPeriods){
	
	//console.log(jsonPeriods);
	var n=0;
	periods = $.parseJSON(jsonPeriods);
	for(var id in periods){
		n=id;
	}
	setPeriod(n);
}
function getStats(){
	$.ajax('wraper.php',{type:"GET", data:{task:"getStats", period:currentPeriod},success:statsReciever, error:error_handler});
}
function statsReciever(jsonStats){
	stats = $.parseJSON('{'+jsonStats+'}');
	stats = stats.lineState;
	processStats();
}
function showMessages(messages){
	for(var m in messages){
			miniMessage(messages[m]);
	}
}