var productionList={};
var productionParams={};
var currenProductionId=0;
var currentParam=0;
var currentParamExistingId=0;
function getProduction(){
	$.ajax('production.php',{type:"GET", data:{task:"getProduction"},success:function(jsonProductionList){
		//el("workspace").innerHTML=jsonProductionList;
		window.productionList=$.parseJSON(jsonProductionList);
		if (window.productionList.result.status=='ok'){
			window.productionList=window.productionList.production;
			if(typeof(_getProdId)!='undefined') setCurrentProduction(_getProdId);
			else fillList();
		}
		else{
			alert ('Ошибка: '+productionList.result.status);	
		}
		}, 
		error:error_handler});
}
function fillList(){
		var str=el('productionInput').value;
		var list=el('filtredProductionList');
		list.innerHTML='';
		for (var i in productionList){
			if(productionList[i].formatName.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
				var newElem=document.createElement('DIV');
				if (productionList[i].color=='зеленый'){
					newElem.className = "green active";
				}else{
					if (productionList[i].color=='коричневый'){
						newElem.className = "brown active";
					}else{
						newElem.className = "active";
					}
				}
				newElem.onclick=function(x){
						return function(){
							setCurrentProduction(x);
						}
					}(i);
				newElem.innerHTML=highlight(productionList[i].formatName, str)+' ('+productionList[i].count+' шт., '+productionList[i].boxing+')';
				list.appendChild(newElem);
			}
		}
	if (list.innerHTML=='') list.innerHTML='Нет форматов с '+str+'.';
}
function setCurrentProduction(prodId){
	productionSelectorField(productionList[prodId].formatName+' <br><span style="color:grey;font-size:0.5em;">('+productionList[prodId].count+' шт., '+productionList[prodId].boxing+')['+prodId+']</span>');
	currenProductionId=prodId;
	getProductionParams(currenProductionId);
}
function productionSelectorField(){
	if(arguments[0]){
		var onclickStr="productionSelectorField()";
		if(mode==2) onclickStr="";
		el('productionSelector').innerHTML='<span onclick="'+onclickStr+'" class="active" style="font-size:2em;">'+arguments[0]+'</span>';
		if(typeof(line)!='undefined') el('productionSelector').innerHTML+='<br><a href="../index.php?line='+line+'" class="active" style="font-size:2em;">← Вернуться</a>, Линия '+line+' ';
	}else{
		el('paramsList').innerHTML='';
		el('paramData').innerHTML='';
		el('productionSelector').innerHTML='<input id="productionInput" type="text" placeholder="Начните ввод..." onkeyup="fillList()"><div id="filtredProductionList"></div>';
		fillList();
	}
	
}
function fillParamsList(productionId){
	//alert("Заполняю");
	el('paramsList').innerHTML="";
	for(var p in params){
		/*
		}*/
		if(mode==1){
			addParamToList(p);
		}else{
			if(productionParams[p]) if(productionParams[p].isUsed=="1" && productionParams[p].isPassportOnly=="0") addParamToList(p);
		}
	}
}
function addParamToList(param){
	var listElement=el('paramsList');
	var newElem=document.createElement('DIV');
	newElem.className = "parametr active";
	if(param==currentParam) newElem.style.backgroundColor="#006666";
	newElem.onclick=function(x){
		return function(){if(mode==1)showParamForm(x); else showDataForm(x);}
	}(param);
	newElem.innerHTML=params[param].name;
	if (mode==2) if(productionParams[param]){
		var existingParamsStr='<br><span style="color:grey;font-size:0.7em;text-shadow:none;">';
		if (productionParams[param].min) existingParamsStr+="min: "+productionParams[param].min;
		if (productionParams[param].max) existingParamsStr+=", max: "+productionParams[param].max;
		existingParamsStr+=" ("+params[param].units+")</span>";
		newElem.innerHTML+=existingParamsStr;
		
	}
	listElement.appendChild(newElem);
}
function showParamForm(paramId){
	currentParam=paramId;
	fillParamsList();
	
	var existingValues={min:"", max:"", text:"", isUsed:"1", isPassportOnly:"0"};
	currentParamExistingId=0;
	if(productionParams[currentParam]){
		currentParamExistingId=productionParams[currentParam].id;
		existingValues.min=productionParams[currentParam].min;
		existingValues.max=productionParams[currentParam].max;
		existingValues.text=productionParams[currentParam].text;
		existingValues.isUsed=productionParams[currentParam].isUsed;
		existingValues.isPassportOnly=productionParams[currentParam].isPassportOnly;
	}
	var isUsedTextValue='';
	if (existingValues.isUsed=='1')  isUsedTextValue='checked';
	var isPassportOnlyText='';
	if (existingValues.isPassportOnly=='1')  isPassportOnlyText='checked';
	
	var formContainer=el('paramData');
	var dispFields=params[paramId].display;
	formContainer.innerHTML="";
	var newElem;
	for(var f in dispFields){
		newElem=document.createElement('DIV');
		newElem.innerHTML=dispFields[f]+'('+params[currentParam].units+')<br><input id="'+dispFields[f]+'" type="text" value="'+existingValues[dispFields[f]]+'">';
		newElem.className = "floatLeft padding10";
		formContainer.appendChild(newElem);
	}
	newElem=document.createElement('DIV');
	newElem.innerHTML='Используется<br><input type="checkbox" '+isUsedTextValue+' id="isUsed" >';
	newElem.className = "floatLeft padding10";
	formContainer.appendChild(newElem);
	
	newElem=document.createElement('DIV');
	newElem.innerHTML='Только для пасспорта<br><input type="checkbox" '+isPassportOnlyText+' id="isPassportOnly" >';
	newElem.className = "floatLeft padding10";
	formContainer.appendChild(newElem);
	
	newElem=document.createElement('DIV');
	newElem.innerHTML='<br> <input type="button" value="Сохранить" onClick="saveToDB()">';
	newElem.className = "floatLeft padding10";
	formContainer.appendChild(newElem);
}
function showDataForm(paramId){
	currentParam=paramId;
	fillParamsList();
	currentParamExistingId=productionParams[currentParam].id;
	
	var formContainer=el('paramData');
	formContainer.innerHTML='<div style="font-size:1.5em"><b>'+params[currentParam].name+"</b></div><div><b>Формы</b></div>";
	formContainer.style.textAlign='center';
	var moldsArr=molds.split(',');
	var newElem;
	for(var mold in moldsArr){
		newElem = document.createElement('DIV');
		newElem.className="floatLeft";
		newElem.style.textAlign='center';
		newElem.style.border="1px solid black";
		newElem.style.margin="3px";
		newElem.innerHTML="<b>"+moldsArr[mold]+'</b><br><input type="text" class="smallField" id="m'+moldsArr[mold]+'">';
		formContainer.appendChild(newElem);
	}
	formContainer.innerHTML+='<div><input type="button" value="Сохранить" onclick="saveDataToDB()"></div>';
}
function showChart(){
	
}
function visible(elementId, state){
	var elem=el(elementId);
	if(state){
		elem.style.display='block';
	}else{
		elem.style.display='none';
	}
	
}
function saveToDB(){
	var min='', max='', text='', isUsed='0', isPassportOnly='0';
	if(el('min')){
		min=el('min').value;
	}
	if(el('max')){
		max=el('max').value;
	}
	if(el('text')){
		text=el('text').value;
	}
	if(el('isUsed').checked) isUsed='1';
	if(el('isPassportOnly').checked) isPassportOnly='1';
	$.ajax('production.php',{type:"GET", data:{task:"saveParam", productionId:currenProductionId, id:currentParamExistingId, paramId:currentParam, min:min, max:max, text:text, isUsed:isUsed, isPassportOnly:isPassportOnly},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			alert ('Ошибка: '+response.result.message);
		}else{
			toast("Удачно!");
			getProductionParams(currenProductionId);
		}

	}, 
	error:error_handler});
}
function saveDataToDB(){
	var moldsArr=molds.split(',');
	var dataStr="";
	var delim="";
	for(var mold in moldsArr){
		dataStr+=delim+moldsArr[mold]+":0"+validateFloatInput(el('m'+moldsArr[mold]).value);
		delim=",";
	}
	//alert(dataStr);
	$.ajax('production.php',{type:"GET", data:{task:"saveParamsData", productionId:currenProductionId, id:currentParamExistingId, paramId:currentParam, moldsArray:dataStr},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			toast('Ошибка: '+response.result.message, '#f01010');
			//log(jsonResult);
		}else{
			toast("Удачно!");
		}
	},error:error_handler}); 
}
function toast(string,color,backgroundColor){
	color=color||'#FFF';
	backgroundColor=backgroundColor||'#096';
	var toastDiv=document.createElement('DIV');
	var bodyElem= document.getElementsByTagName('body')[0];
	toastDiv.innerHTML=string;
	toastDiv.style.color=color;
	toastDiv.style.backgroundColor=backgroundColor;
	toastDiv.className='toast';
	bodyElem.appendChild(toastDiv);
	
	setTimeout(function(){ bodyElem.removeChild(toastDiv)},2000);
}
function getProductionParams(productId){
	bottle.on('Получение сохраненных параметров');
	$.ajax('production.php',{type:"GET", data:{task:"getSavedParams", productionId:currenProductionId},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			alert ('Ошибка: '+response.result.message);
		}else{
			window.productionParams=response.productionParams;
		}
		fillParamsList(currenProductionId);
		window.bottle.off();
	}, 
	error:error_handler});
}