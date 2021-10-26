var totalFlawPart = 0;
var moldsOnLine = [];

function updater(){
	totalFlawPart = 0;
	el('current_line').innerHTML = currentLine;
	if(currentProductionId!=''){
		el('current_production').innerHTML = currentProductionId + '(' + productionList[currentProductionId].shortName + ')';
		if (isAuth) el('current_production').innerHTML += ' <input type="button" value="Снять" onclick="closeProduction()">';
	}else{
		if (isAuth) el('current_production').innerHTML ='<input type="button" value="Установить продукцию" onclick="customWindow.show(productionSelectorData)">';
		else el('current_production').innerHTML = 'Нет.';
	}
	
	var modeSpan = el('modeSpan');
	if (isAuth){
		if(mode == 1){
			modeSpan.innerHTML = 'Режим: <b>Браки</b>';
		}else{
			modeSpan.innerHTML = 'Режим: <b>Паспорт</b>';
		}
	}else{
		modeSpan.innerHTML = '';
	}
	
	var paramSpan = el('paramSpan');
	if(mode == 1) paramSpan.innerHTML = '';
	else{
		paramSpan.innerHTML = params[currentParam].name+' (';
		if(productionParams[currentParam].min) paramSpan.innerHTML += 'min: '+productionParams[currentParam].min;
		if(productionParams[currentParam].min && productionParams[currentParam].max)  paramSpan.innerHTML += ', ';
		if(productionParams[currentParam].max) paramSpan.innerHTML += ' max: '+productionParams[currentParam].max;
		paramSpan.innerHTML += ')';
	}
	if (isAuth) el('tools').style.display = 'block';
	else el('tools').style.display = 'none';
	
	doAuth();
	updateTime();
	table();
	
	el('totalFlaw').innerHTML = '<b>' + totalFlawPart + '</b>';
}
function lineSelector(contentDiv){
	//alert(this.contentDiv);
	var newElem;
		for (i=0; i<10; i++){
			newElem = document.createElement('DIV');
			newElem.style.cssFloat = 'left';
			newElem.style.width = '1cm';
			newElem.style.border = '1px solid #000';
			newElem.style.padding = '5px';
			newElem.style.display ='inline-block';
			if(currentLine==i) newElem.className ="used";
			else newElem.className ='usable';
			newElem.innerHTML = i;
			newElem.onclick = function(d){
				return function(){
						setCurrentLine(d);
						customWindow.hide();
				}
			}(i);
			contentDiv.appendChild(newElem);
		}
}
function productSelector(contentDiv){
	var inputStr = document.createElement('INPUT');
	var divInContentDiv = document.createElement('DIV');
		divInContentDiv.style.textAlign = 'left';
		divInContentDiv.style.width = '400px';
		contentDiv.appendChild(inputStr);
		inputStr.focus();
		contentDiv.appendChild(divInContentDiv);
		inputStr.onkeyup = function(){
			var str = inputStr.value;
			divInContentDiv.innerHTML = '';
			for(var id in productionList){
				if(id.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
					newElem = document.createElement('DIV');
					newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor ='white';
					if(productionList[id].color == '20') newElem.style.backgroundColor ='#cfc';
					if(productionList[id].color == '30') newElem.style.backgroundColor ='#c96';
					newElem.className = 'usable';
					newElem.innerHTML = highlight(id, str)+'('+productionList[id].fullName+')';
					newElem.onclick = function(d){
							return function(){
								var molds=prompt("Введите количество форм");
								var kis = prompt("Введите плановый КИС");
									if (molds && kis) setNewProduction(d, kis, molds);
									else miniMessage('Не внесен КИС или <br> количество форм');
								customWindow.hide();
							}
							}(id);
					divInContentDiv.appendChild(newElem);
				}
			}
		}
}
function table(){
	var tableDiv = el('table');
	var rowHTML;
		tableDiv.innerHTML = '<div class="tableRow"><div class="lineNumDiv">Секция</div><div class="positionDiv">Внешние</div><div class="positionDiv">Средние</div><div class="positionDiv">Внутренние</div></div>';
		for(var sec=1; sec<11; sec++){
			rowHTML='<div class="tableRow">';
			rowHTML += '<div class="lineNumDiv">'+sec+'</div>';
			for(var pos=1; pos<4; pos++){
				rowHTML += '<div class="positionDiv">';
				if(mode == 1) rowHTML += printCell(sec, pos);
				else rowHTML += printPassportCell(sec, pos);
				rowHTML+='</div>';
			}
			tableDiv.innerHTML += rowHTML;
		}
		if(mode==2) tableDiv.innerHTML += '<br><div style="text-align:center;"><input type="button" value="Сохранить" onclick="saveDataToDB()"></div>';
}
function printCell(sec, pos){
	var cellFlawPart = 0;
	var moldHTML = 'Нет формы';
	var flawHTML = '-';
	var styleStr = '';
	var authMinHeight = '0';
	var action=0;
	var fontColor = 'black';
		if(lineState[sec]){
			if(lineState[sec][pos]){
				moldHTML= lineState[sec][pos].mold;
				flawHTML = 'Норма';
				action=0;
				for(var flaw in lineState[sec][pos].flaw){
					if ((lineState[sec][pos].flaw[flaw].action * 1) > 1) cellFlawPart += lineState[sec][pos].flaw[flaw].flaw_part * 1;
					if(action<(lineState[sec][pos].flaw[flaw].action * 1)) action = lineState[sec][pos].flaw[flaw].action * 1;
					if(flawHTML=='Норма') flawHTML = '';
					if(isAuth) authMinHeight = '2.3';
					else authMinHeight = '0';
					flawHTML += '<div style="min-height:'+authMinHeight+'em;">'+defects[lineState[sec][pos].flaw[flaw].flaw_type].title;
					if(isAuth) flawHTML += '<input style="float:right" type="button" value="X" onclick="closeFlaw('+flaw+')">';
					flawHTML += '</div>';
				}
				if(action == 3) fontColor = 'white';
				if(isAuth) flawHTML += '<br><input type="button" value="Добавить брак" onclick="kostil2(' + lineState[sec][pos].moldRecId + ')">';
				styleStr = 'background-color:'+corrective_actions[action].color+';color:'+fontColor;
			} else styleStr = 'color:black';
		}
	if (cellFlawPart>0) moldHTML += '<br>'+'<span style="font-size:0.7em;">Брак: ' + cellFlawPart + '%';
	totalFlawPart += cellFlawPart;
	return '<div  class="moldCell usable" onclick="kostil('+sec+','+pos+');customWindow.show(moldSelectorData)">'+moldHTML+'</div><div style="'+styleStr+'" class="flawCell">'+flawHTML+'</div>';
}
function printPassportCell(sec, pos){
	var moldHTML = 'Нет формы';
	var flawHTML = '-';
	var styleStr = '';
	var fontColor = 'black';
		if(lineState[sec]){
			if(lineState[sec][pos]){
				moldHTML = lineState[sec][pos].mold;
				flawHTML = '';
				if (params[currentParam].moldDataFields==2){
					flawHTML = '<br><input type="text" placeholder="min" class="smallField" id="min'+lineState[sec][pos].moldRecId+'" onblur="checkInputData(this);"> ';
					flawHTML += '<input type="text" placeholder="max" class="smallField" id="max'+lineState[sec][pos].moldRecId+'" onblur="checkInputData(this);"><br><br>';
				}else{
					flawHTML = '<br><input type="text" placeholder="Знач.." class="smallField" id="min'+lineState[sec][pos].moldRecId+'" onblur="checkInputData(this);"><br><br>';
				}
			} 
		}
	return '<div  class="moldCell usable" onclick="kostil('+sec+','+pos+');customWindow.show(moldSelectorData)">'+moldHTML+'</div><div style="'+styleStr+'" class="flawCell">'+flawHTML+'</div>';
}


function moldSelector(contentDiv, sec, pos){
	if(isAuth){
	var container = document.createElement("DIV");
		container.style.width = '15cm';
		contentDiv.appendChild(container);
	var newMoldElem;
		for(var mold=0; mold<100; mold++){
			newMoldElem = document.createElement('DIV');
			newMoldElem.style.display = 'inline-block';
			newMoldElem.style.padding ="5px";
			newMoldElem.style.margin ="5px";
			newMoldElem.className = 'usable';
			if (mold>0){
				newMoldElem.innerHTML = mold;
				newMoldElem.onclick = function(moldd, secc, poss){
					return function(){setMold(moldd, secc, poss);
									  customWindow.hide();
									  };
				}(mold, clickSec, clickPos);
			}else{
					newMoldElem.innerHTML = 'Снять форму';
					newMoldElem.onclick = function(mold_rec_id){
						return function(){unmountMold(mold_rec_id);
										  customWindow.hide();
										  };
					}(moldRecId);
			}
			if(moldRecId=='' && mold==0){
				
			} else{
				container.appendChild(newMoldElem);
			}
		}
	}
	else{
		alert('Введите пароль и попробуйте еще раз.');
		customWindow.hide();
	}
}
function kostil(sec, pos){
	clickSec = sec;
	clickPos = pos;
	moldRecId = '';
	if(lineState[sec])
		if(lineState[sec][pos]) moldRecId = lineState[sec][pos].moldRecId;
}
function kostil2(moldId){
	newFlaw.moldsIdsList = moldId;
	customWindow.show(flawCreatorData);
}
function flawCreator(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML = '<div>Формы, куда вешать брак:<b><div id="moldsDiv"></div></b></div>';
		wDiv.innerHTML += '<div>Тип брака<div id="fType" class="usable"></div></div>';
		wDiv.innerHTML += 'Корректирующее действие<br>';
		wDiv.innerHTML += '<div id="fAction" class="usable"></div><br>';
		wDiv.innerHTML += 'Доля брака<br>';
		wDiv.innerHTML += '<input type="text" id="fPart"><br><br>';
		wDiv.innerHTML += 'Значение параметра<br>';
		wDiv.innerHTML += '<input type="text" id="fParameter"><br><br>';
		wDiv.innerHTML += 'Комментарий<br>';
		wDiv.innerHTML += '<input type="text" id="fComment"><br><br>';
		wDiv.innerHTML += '<input type="button" value="Добавить" onclick="newFlawKostil()">';
		contentDiv.appendChild(wDiv);
		
	var supportParamDiv = document.createElement('DIV');
		supportParamDiv.style.width = "300px";
		supportParamDiv.style.cssFloat = "left";
		supportParamDiv.style.display = 'none';
		contentDiv.appendChild(supportParamDiv);
		
	var fTypeDiv = el('fType');
		fTypeDiv.innerHTML = defects[newFlaw.flaw_type].title;
		fTypeDiv.onclick = function(){
			selectFlawType(supportParamDiv)
		};
	var fActionDiv = el('fAction');
		fActionDiv.innerHTML = corrective_actions[newFlaw.action].title;
		fActionDiv.onclick = function(){
			actionSelector(supportParamDiv)
		};
	moldsSelector();
		
		
	el('fAction').style.backgroundColor = corrective_actions[newFlaw.action].color;
	el('fType').style.backgroundColor = getColor(newFlaw.flaw_type);
}
function moldsSelector(){
	var fMoldsDiv = el('moldsDiv');
		fMoldsDiv.innerHTML = '';
	var newCheckbox, newLabel, pairDiv;
		for(var mold in moldsOnLine){
			pairDiv = document.createElement('DIV');	
			pairDiv.style.padding = '5px';
			pairDiv.style.display = 'inline-block';
			newCheckbox = document.createElement('INPUT');
			newCheckbox.type = 'checkbox';
			newCheckbox.moldCellId = moldsOnLine[mold][1];
			newCheckbox.name = 'ch';
			if(moldsOnLine[mold][1] == newFlaw.moldsIdsList) newCheckbox.checked = true;
			/*newCheckbox.onclick = function(){
						return function(){
							newFlaw.moldsIdsList = '';
						};
					}();*/
			newLabel = document.createElement('LABEL');
			newLabel.innerHTML = moldsOnLine[mold][0];
			pairDiv.appendChild(newCheckbox);
			pairDiv.appendChild(newLabel);
			fMoldsDiv.appendChild(pairDiv);
		}
}
function paramSelector(contentDiv){
	var lstElem;
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		contentDiv.appendChild(wDiv);
		for(var p in params){
			if(productionParams[p]) 
				if(productionParams[p].isUsed=="1" && productionParams[p].isPassportOnly=="0"){
					lstElem = document.createElement('DIV');
					lstElem.innerHTML = params[p].name;
					lstElem.className = 'usable';
					lstElem.onclick = function(pa){
						return function(){
							currentParam = pa;
							currentParamId = productionParams[pa].id;
							customWindow.hide();
							updater();
						};
					}(p);
					wDiv.appendChild(lstElem);
				}
		}
}
function addParamToList(param){
	var listElement=el('paramsList');
	var newElem=document.createElement('DIV');
	newElem.className = "parametr active";
	if(param==currentParam) newElem.style.backgroundColor="#006666";
	newElem.onclick=function(x){
		return function(){
						/*switch(mode){
							case 1:
								showParamForm(x); 
								break;
							case 2: 
								showDataForm(x);
								break;
							case 3:
								showChart(x);
								break;
						}*/
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
function newFlawKostil(){
		newFlaw.moldsIdsList = '';
	var checkboxes = document.getElementsByName('ch');
	var delimiter = '';
		for(c in checkboxes){
			if (checkboxes[c].checked) {
				newFlaw.moldsIdsList += delimiter + checkboxes[c].moldCellId;
				delimiter = ', ';
			}
		}
		newFlaw.flaw_part = validateFloatInput(el('fPart').value);
		newFlaw.parameter_value = el('fParameter').value;
		newFlaw.comment = el('fComment').value;
		addFlaw(newFlaw);
		//alert(newFlaw.moldsIdsList);
		customWindow.hide();
}
function selectFlawType(spDiv){
		spDiv.innerHTML = '';
		spDiv.style.display = "block";
		spDiv.innerHTML = '<input id="flawTypeText" type="text" placeholder="Начните вводить ...">';
	var defectsDiv = document.createElement('DIV');
		spDiv.appendChild(defectsDiv);
		el('flawTypeText').onkeyup = function(){
		var str = el('flawTypeText').value;
		var newElem;
			defectsDiv.innerHTML = '';
			for(var id in defects){
				if(defects[id].title.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
					newElem = document.createElement('DIV');
					//newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor ='white';
					newElem.className = 'usable';
					newElem.innerHTML = highlight(defects[id].title, str);
					newElem.style.backgroundColor = getColor(id);
					newElem.onclick = function(d){
							return function(){
								newFlaw.flaw_type = d;
								spDiv.style.display = "none";
								el('fType').innerHTML = defects[newFlaw.flaw_type].title;
								el('fType').style.backgroundColor = getColor(newFlaw.flaw_type);
							}
							}(id);
					defectsDiv.appendChild(newElem);
				}
			}
	}
	el('flawTypeText').onkeyup();
}
function actionSelector(spDiv){
		spDiv.innerHTML = '';
		spDiv.style.display = "block";
	var defectsDiv = document.createElement('DIV');
		spDiv.appendChild(defectsDiv);
	var newElem;
		defectsDiv.innerHTML = 'Выберите:';
		for(id=1; id<4; id++){
			newElem = document.createElement('DIV');
			//newElem.style.cssFloat = 'left';
			newElem.style.padding = '5px';
			newElem.style.backgroundColor = corrective_actions[id].color;
			newElem.className = 'usable';
			newElem.innerHTML = corrective_actions[id].title;
			newElem.onclick = function(d){
					return function(){
						newFlaw.action = d;
						spDiv.style.display = "none";
						el('fAction').innerHTML = corrective_actions[newFlaw.action].title;
						el('fAction').style.backgroundColor = corrective_actions[newFlaw.action].color;
					}
					}(id);
			defectsDiv.appendChild(newElem);
		}
}
function getColor(n){
	if(n<100) return 'red';
	if(n<200) return 'orange';
	return 'yellow';
}
function timer(){
	workLoop();
	if(timerIsOn){
		setTimeout(function(){timer()},9000);
	}
}
function workLoop(){
	if (moment().diff(lastUpdateTime,'seconds')>60){
		lastUpdateTime=moment();
		getState();
	}
	else{
		updateTime();
	}
}
function updateTime(){
	el('serverTime').innerHTML = ' Время: ' + serverTime.format('HH:mm');
}
function doAuth(){
	var userPass = '';
	if (el('passField')!=null) userPass = el('passField').value;
	var authForm = el('authSpan');
	if(isAuth){
		authForm.innerHTML = '<span onclick="unAuth()" class="usable"> Авторизация: Ок </span>';
	}else{
		//miniMessage('Не автаризован');
		if(userPass != ''){
			if(userPass == pass){
				isAuth = true;
				miniMessage('Верно');
				updater();
				doAuth();
			}else{
				miniMessage('Неверный пароль');
			}
		}else{
			authForm.innerHTML = '<input type="text" placeholder="Введите пароль" id="passField"><input type="button" onclick="doAuth()" value="Авторизоваться">';
		}
	}
}
function unAuth(){
	isAuth = false;
	miniMessage('Вы вышли');
	doAuth();
	if (mode == 2) switchMode();
	else updater();
}
function switchMode(){
	if(mode == 1){
		timerIsOn = false;
		mode = 2;
		getProductionParams(currentProductionId);
	}else{
		timerIsOn = true;
		getState();
		timer();
		mode = 1;
		updater();
	}
	
}
function getProductionParams(productId){
	$.ajax('wControl/production.php',{type:"GET", data:{task:"getSavedParams", productionId:currentProductionId},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		window.productionParams=response.productionParams;
		if(Object.keys(productionParams).length == 0){
			miniMessage('Нет параметров<br>для данной продукции');
			switchMode();
		}else{
			miniMessage('Имеется параметров: '+objSize(productionParams)+' ');
			currentParam = Object.keys(productionParams)[0];
			currentParamId = productionParams[Object.keys(productionParams)[0]].id;
			updater();
		}
	}, 
	error:error_handler});
}
function saveDataToDB(){
	var dataStr="";
	var delim="";
	var mold;
	for(var sec=1; sec<11; sec++){
		if(lineState[sec]){
			for(var pos=1; pos<4; pos++){
				if(lineState[sec][pos]){
					mold = lineState[sec][pos].moldRecId;
					dataStr+=delim+mold+":0"+validateFloatInput(el('min'+mold).value);
					if(params[currentParam].moldDataFields==2){
						dataStr+=","+mold+":0"+validateFloatInput(el('max'+mold).value);
					}
					delim=",";
				}
			}
		}
	}
	
	//alert(dataStr);
	$.ajax('wControl/production.php',{type:"GET", data:{task:"saveParamsData", productionId:currentProductionId, id:currentParamId, paramId:currentParam, moldsArray:dataStr},success:function(jsonResult){
		//log(jsonResult);
		var response=$.parseJSON(jsonResult);
		if (response.result.status!='ok'){
			miniMessage('Ошибка');
			//log(jsonResult);
		}else{
			miniMessage('Сохранено');
		}
	},error:error_handler}); 
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
function getMoldsOnLine(){
	if(this.mold)
		moldsOnLine.push([this.mold, this.moldRecId]);
}
var lineSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выбор линии"
	},
	"contentFunc": lineSelector,
	"callback":function(){
								alert('callback call');
						}
}
var productionSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Новая постановка"
	},
	"contentFunc": productSelector,
	"callback":function(){
								alert('callback call');
						}
}
var moldSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выберите форму"
	},
	"contentFunc": moldSelector,
	"callback":function(){
								alert('callback call');
						}
}
var flawCreatorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Опишите брак"
	},
	"contentFunc": flawCreator,
	"callback":function(){
								alert('callback call');
						}
}
var selectParamData = {
	"view":	{	
		"left":"300", 
		"top":"100", 
		"headerText":"Выберите параметр"
	},
	"contentFunc": paramSelector,
	"callback":function(){
								alert('callback call');
						}
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 