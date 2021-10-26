var jsonRealtyList={};
function loadRealty(){
	//mistake=mistake||'no';
	$.ajax('realtyDB.php',{type:"GET", data:{action:"load"},success:function(result){
		jsonRealtyList=$.parseJSON(result);
		fillList();
		//alert (jstr(jResult));
	}, error:errorHandler});
}
function errorHandler(){
	alert("Ошибка.");
};
function fillList(query){
	query=query||"";
	var jsRL=jsonRealtyList;
	var listDiv=el("resultList");
	listDiv.innerHTML="";
	for (var obj in jsRL){
		if(obj!="result"){
			listDiv.innerHTML+='<div class="row">'+objType[jsRL[obj].type].caption+", "+highlight(jsRL[obj].address,query)+", "+jsRL[obj].S+" м<sup>2</sup>, "+jsRL[obj].price+" P. "+'</div>';
		}
	}
}
