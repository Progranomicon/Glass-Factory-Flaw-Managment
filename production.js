var productionList;
function getProductionList(hFunc){
	$.ajax("../../production1.php",{type:"GET", data:{getProduction:"getProduction"},success:hFunc, error:production_error_handler});
}
function production_error_handler(){
	
}