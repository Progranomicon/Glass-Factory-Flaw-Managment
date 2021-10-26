function getReport(line, dateFrom, dateTo){
	$.ajax('inspectionB.php',{type:"GET", data:{getReport:"yes", dateFrom:dateFrom, dateTo:dateTo, line:line},success:function(reportData){
		//alert(prod);
		var reportDataObj=$.parseJSON(reportData);
		displaySimpleReport(reportDataObj);
	}, error:error_handler});
}
function displaySimpleReport(reportDataObj){
	var reportHtml="";
	for (var sens in reportDataObj.sensors){
		var sensor=sensors[reportDataObj.sensors[sens]["code"]]
		reportHtml+='<div class="reportBlock"><b>'+sensor.name+"</b><br>";
		for(var field in reportDataObj.sensors[sens]){
			if (reportDataObj.sensors[sens][field]!=0 && field!='code' ){
				if(sensor[field] ) reportHtml+=sensor[field]+': '+reportDataObj.sensors[sens][field]+'<br>';
			}
		}
		reportHtml+='</div>';
	}
	if (reportHtml=="")  reportHtml=="ERROR";
	el('report').innerHTML=reportHtml;
}
function getRep(){
	var dateFrom = el("dateFrom").value;
	var dateTo = el("dateTo").value;
	var line = 1;
	getReport(line, dateFrom, dateTo);

}