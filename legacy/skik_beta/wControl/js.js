var productionList={};
var productionParams={};
var currenProductionId=0;
var currentParam=0;
var currentParamExistingId=0;

var statisticData={};
var normStatData={};
var normStatDataArray=[];
var categories=[];
var startReportDate=moment();
var endReportDate=moment();

startReportDate.hour(0);
startReportDate.minute(0);
startReportDate.second(0);

endReportDate.hour(23);
endReportDate.minute(59);
endReportDate.second(59);

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
		var modeText="";
		switch (mode){
			case 1:
				modeText='<input type="button" value="Статистика" onclick="setMode(3);"><input type="button" value="Паспорт" onclick="setMode(1);">';
				break;
			case 2:
				//modeText='<input type="button" value="Статистика" onclick="setMode(2);">';
				break;
			case 3:
				modeText='<input type="button" value="Статистика" onclick="setMode(3);"><input type="button" value="Паспорт" onclick="setMode(1);">';
				break;
		}
		if(mode==2) onclickStr="";
		el('productionSelector').innerHTML='<span onclick="'+onclickStr+'" class="active" style="font-size:2em;">'+arguments[0]+'</span> '+modeText;
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
		if (mode==3) el('paramData').style.width="18cm";
		else el('paramData').style.width="";
	}
}
function addParamToList(param){
	var listElement=el('paramsList');
	var newElem=document.createElement('DIV');
	newElem.className = "parametr active";
	if(param==currentParam) newElem.style.backgroundColor="#006666";
	newElem.onclick=function(x){
		return function(){
						switch(mode){
							case 1:
								showParamForm(x); 
								break;
							case 2: 
								showDataForm(x);
								break;
							case 3:
								showChart(x);
								break;
						}
		}
	}(param);
	newElem.innerHTML=params[param].name;
	if (mode>1) if(productionParams[param]){
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
		
		
		if (params[currentParam].moldDataFields==2){
			newElem.innerHTML="<b>"+moldsArr[mold]+'</b><br><input type="text" placeholder="min" class="smallField" id="min'+moldsArr[mold]+'" onblur="checkInputData(this);"> ';
			newElem.innerHTML+='<input type="text" placeholder="max" class="smallField" id="max'+moldsArr[mold]+'" onblur="checkInputData(this);">';
		}else{
			newElem.innerHTML="<b>"+moldsArr[mold]+'</b><br><input type="text" class="smallField" id="min'+moldsArr[mold]+'" onblur="checkInputData(this);"> ';
		}
		formContainer.appendChild(newElem);
	}
	formContainer.innerHTML+='<div><input type="button" value="Сохранить" onclick="saveDataToDB()"></div>';
}
function showChart(paramId){
	currentParam=paramId;
	fillParamsList();
	currentParamExistingId=productionParams[currentParam].id;
	var formContainer=el('paramData');
	formContainer.innerHTML='<div id="graphDiv">Граффик<br> </div><div id="dateSelectDiv">Выбор даты</div><div id="startDate" class="inlineDiv headerItem" onclick="calendar(startReportDate, 330, 100, getStatistic);"></div> - <div id="endDate" class="inlineDiv headerItem" onclick="calendar(endReportDate, 330, 100, getStatistic);"></div>';
	getStatistic(currentParamExistingId);
	//refreshChart();
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
		dataStr+=delim+moldsArr[mold]+":0"+validateFloatInput(el('min'+moldsArr[mold]).value);
		if(params[currentParam].moldDataFields==2){
			dataStr+=", "+moldsArr[mold]+":0"+validateFloatInput(el('max'+moldsArr[mold]).value);
		}
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
function getStatistic(paramRecordId){
	var paramRecordId = paramRecordId || currentParamExistingId;
	bottle.on('Получение статистики');
	//alert(endReportDate.format("YYYY-MM-DD H:mm:SS"));
	$.ajax('production.php',{type:"GET", data:{task:"getStatistic", paramId:paramRecordId, fromDate:startReportDate.format("YYYY-MM-DD H:mm")/*"2015-03-20 00:00"*/, toDate:endReportDate.format("YYYY-MM-DD H:mm")/*"2015-03-24 23:00"*/},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			alert ('Ошибка: '+response.result.message);
			
		}else{
			window.statisticData=response.statistic;
		}
		refreshChart();
		window.bottle.off();
	}, 
	error:error_handler});
}
function refreshChart(){
	normalizeStatistic();
	//el('graphDiv').innerHTML+=jstr(normStatData);
		var delta = parseFloat(productionParams[currentParam].max) - parseFloat(productionParams[currentParam].min);
		$('#graphDiv').highcharts({
        title: {
            text: params[currentParam].name,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
			min: parseFloat(productionParams[currentParam].min)-delta*0.05,
			max: parseFloat(productionParams[currentParam].max)+delta*0.05,
            title: {
                text: params[currentParam].units
            },
            plotLines: [{
                value: parseFloat(productionParams[currentParam].max),
                width: 2,
                color: '#9F0000',
				label: {
                    text: 'Max ('+productionParams[currentParam].max+')',
                    align: 'left',
                    x: 10
                }
            },{
                value: parseFloat(productionParams[currentParam].min),
                width: 2,
                color: '#9F0000',
				label: {
                    text: 'Min ('+productionParams[currentParam].min+')',
                    align: 'left',
                    x: 10
                }
            }]
        },
        tooltip: {
            valueSuffix: " "+params[currentParam].units
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            data: normStatDataArray
        }]
    });
}
function normalizeStatistic(){
	var record, date, textDate;
	var counts = {};
	normStatData={};
	categories=[];
	normStatDataArray=[];
	for(var r in statisticData){
		record = statisticData[r];
		date = moment(record.operationDate);
		textDate=date.date()+"."+(date.month()+1)+"."+date.year();
		if (typeof(normStatData[textDate]) == 'undefined') normStatData[textDate]=0;
		normStatData[textDate]+=parseFloat(record.val);
		if (typeof(counts[textDate]) == 'undefined')  counts[textDate]=0;
		//log(textDate);
		counts[textDate]+=1;
		if(categories.indexOf(textDate)<0)categories.push(textDate);
	}
	for(var rec in counts){
		normStatData[rec] = normStatData[rec]/counts[rec]; 
	}
	for(var cat in categories){
		normStatDataArray.push( parseFloat(normStatData[categories[cat]].toFixed(2)) ); 
	}
	updateDate();
}
function setMode(x){
	mode=x;
	setCurrentProduction(currenProductionId);
}
function updateDate(){
	el('startDate').innerHTML=startReportDate.format('H:mm D MMM YYYY');
	el('endDate').innerHTML=endReportDate.format('H:mm D MMM YYYY');
}
function checkInputData(el){
	var val=parseFloat(validateFloatInput(el.value));
	if(val=="") return;
	if(val>parseFloat(validateFloatInput(productionParams[currentParam].max))){
		alert("Больше чем  можно. Это брак.");
		el.value="";
		el.focus();
		return;
	}
	if(val<parseFloat(validateFloatInput(productionParams[currentParam].min))){
		alert("Меньше чем  можно. Это брак.");
		el.value="";
		el.focus();
		return;
	}
	return true;
}

function visible(elementId, state){
	var elem=el(elementId);
	if(state){
		elem.style.display='block';
	}else{
		elem.style.display='none';
	}
	
}