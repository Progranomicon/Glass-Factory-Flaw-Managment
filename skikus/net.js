/*function getProductionList(){
	$.ajax('../production.php',{type:"GET", data:{task:"getProduction"},success:productionReciever, error:error_handler});
}*/
function productionReciever(jsonProduction){
	//log(jsonProduction);
	var productionData = $.parseJSON(jsonProduction);
		productionList = productionData.data.production;
		for(var m in productionData.info.messages){
			miniMessage(productionData.info.messages[m]);
		}
	setCurrentLine(currentLine);
	timer(timerIsOn);
}

function setCurrentLine(line){
	$.ajax('wraper.php',{type:"GET", data:{task:"setCurrentLine", line:line},success:reciever, error:error_handler});
}
function setMold(mold, section, position){
	$.ajax('wraper.php',{type:"GET", data:{task:"mountMold", mold:mold, section:section, position:position},success:reciever, error:error_handler});
}
function unmountMold(id){
	$.ajax('wraper.php',{type:"GET", data:{task:"unmountMold", id:id},success:reciever, error:error_handler});
}
function addFlaw(data){
	$.ajax('wraper.php',{type:"GET", data:{task:"addFlaw", moldsList:data.moldsIdsList, flaw_type:data.flaw_type, flaw_part:data.flaw_part, parameter_value:data.parameter_value, comment:data.comment, action:data.action},success:reciever, error:error_handler});
}
function closeFlaw(id){
	$.ajax('wraper.php',{type:"GET", data:{task:"closeFlaw", id:id},success:reciever, error:error_handler});
}
function setNewProduction(id, kis, molds){
	$.ajax('wraper.php',{type:"GET", data:{task:"setNewProduction", id:id, kis:kis, molds:molds},success:reciever, error:error_handler});
}
function unmountAllMolds(){
	$.ajax('wraper.php',{type:"GET", data:{task:"unmountAllMolds"},success:reciever, error:error_handler});
}
function removeAllFlaw(){
	$.ajax('wraper.php',{type:"GET", data:{task:"removeAllFlaw"},success:reciever, error:error_handler});
}
function closeProduction(){
	if (confirm('Снять продукцию?')) $.ajax('wraper.php',{type:"GET", data:{task:"closeProduction"},success:reciever, error:error_handler});
	else miniMessage('Отменено');
}
function getState(){
	$.ajax('wraper.php',{type:"GET", data:{},success:reciever, error:error_handler});
}
function error_handler(){
	miniMessage('Ошибка сети');
}
function reciever(jsonData){
	if (debug) log(jsonData);
	var fullData = $.parseJSON(jsonData);
	if(fullData==null) return;
	if(exist(fullData.data)) {
		currentProductionId = fullData.data.currentProduction.id;
		if(exist(fullData.data.lineState)){
			lineState = fullData.data.lineState;
		}
		if(exist(fullData.data.currentLine)){
			currentLine = fullData.data.currentLine;
		}
	}
	
	for(var m in fullData.info.messages){
		miniMessage(fullData.info.messages[m]);
	}
	//alert(fullData.info.serverTime);
	serverTime=moment(fullData.info.serverTime);
	moldsOnLine = [];
	machineIterator(getMoldsOnLine, lineState);
	//log(jstr(moldsOnLine));
	updater();
}