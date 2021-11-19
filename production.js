var productionList;
function getProductionList(hFunc){
	$.ajax("../../production.php",{type:"GET", data:{task:"getProduction"},success:hFunc, error:production_error_handler});
}
function production_error_handler(){
	
}