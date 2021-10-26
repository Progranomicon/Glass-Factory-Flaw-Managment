var production = {};
var periods={};
var stats={};
function getProduction(){
	$.ajax('../../production.php',{type:"GET", data:{task:"getProduction"},success:productionReciever, error:error_handler});
}
function productionReciever(jsonProduction){
	//	log(jsonProduction);
	var productionData = $.parseJSON(jsonProduction);
		production = productionData.data.production;
		showMessages(productionData.info.messages);
}
function error_handler(){
	miniMessage('Ошибка сети');
}
function getPeriods(){
	$.ajax('wraper.php',{type:"GET", data:{task:"getPeriods", production:currentProduction},success:periodsReciever, error:error_handler});
}
function periodsReciever(jsonPeriods){
	log(jsonPeriods);
	periods = $.parseJSON(jsonPeriods);
}
function getStats(){
	$.ajax('wraper.php',{type:"GET", data:{task:"getStats", period:currentPeriod},success:statsReciever, error:error_handler});
}
function statsReciever(jsonStats){
	log(jsonStats);
	stats = $.parseJSON('{'+jsonStats+'}');
	stats = stats.lineState;
	processStats();
}
function showMessages(messages){
	for(var m in messages){
			miniMessage(messages[m]);
	}
}