var totalFlawPart = 0;
var moldsOnLine = [];


function updater(){
	totalFlawPart = 0;
	el('current_line').innerHTML = currentLine;
	if(currentProductionId!=''){
		el('current_production').innerHTML = productionList[currentProductionId].code + '(<a href="statistic/index.php?production=' + currentProductionId + '">' + productionList[currentProductionId].shortName + '</a>)';
		if (userType == 'OTK') el('current_production').innerHTML += '<a href=wControl/index.php?prodId='+currentProductionId+'> Задать вес </a> <input type="button" value="Снять" onclick="closeProduction()">';
	}else{
		if (userType == 'OTK') el('current_production').innerHTML ='<input type="button" value="Установить продукцию" onclick="customWindow.show(productionSelectorData)">';
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
	el('removeAllFlaw').style.display = 'block';
	el('removeAllMolds').style.display = 'block';
	el('unmountAllSFM').style.display = 'block';
	el('recash').style.display = 'block';
	
	if(userType == 'SFM'){
		el('removeAllFlaw').style.display = 'none';
		el('removeAllMolds').style.display = 'none';
	}
	if(userType == 'OTK'){
		el('unmountAllSFM').style.display = 'none';
		el('recash').style.display = 'none';
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
	mInspection();
	
	el('totalFlaw').innerHTML = '<b>' + normF(totalFlawPart, 2) + '</b>';
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
function createCom(flawID){ //create Comment, fucking jquery!!!
		modalWindow.show('Добавить комментарий ', function s(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML += '<input type="text" id="fComment"><br><br>';
		wDiv.innerHTML += '<input id="newComment" type="button" value="Добавить">'; //onclick="newFlawKostil()"
		contentDiv.appendChild(wDiv);
		
		el('newComment').onclick = function(){
			addComment(flawID, el('fComment').value);
			modalWindow.hide();
		}
		
	
		}
);
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
				if(productionList[id].code.toLowerCase().indexOf(str.toLowerCase(), 0)>=0){
					newElem = document.createElement('DIV');
					newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor ='white';
					if(productionList[id].color == '20') newElem.style.backgroundColor ='#cfc';
					if(productionList[id].color == '30') newElem.style.backgroundColor ='#c96';
					newElem.className = 'usable';
					newElem.innerHTML = highlight(productionList[id].code, str)+'('+productionList[id].fullName+')';
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
		inputStr.onkeyup();
}
function table(){
	var tableDiv = el('table');
	var rowHTML;
		tableDiv.innerHTML ="";
		if (currentLine == 1)tableDiv.innerHTML = '<div class="tableRow">Последние измерения веса: &nbsp &nbsp'+we+'</div>';
		tableDiv.innerHTML += '<div class="tableRow"><div class="lineNumDiv">Секц.</div><div class="positionDiv">Внешние</div><div class="positionDiv">Внутренние</div></div>';
		for(var sec=1; sec<11; sec++){
			rowHTML='<div class="tableRow">';
			rowHTML += '<div class="lineNumDiv">'+sec+'</div>';
			for(var pos=1; pos<3; pos++){
				rowHTML += '<div class="positionDiv">';
				if(mode == 1) rowHTML += printCell(sec, pos);
				else rowHTML += printPassportCell(sec, pos);
				rowHTML+='</div>';
			}
			tableDiv.innerHTML += rowHTML;
		}
		if(userType == 'SFM')tableDiv.innerHTML += '<div class="tableRow"><div class="legend" style="background-color:#99f">Кольца</div><div class="legend" style="background-color:#000;color:#fff">Черновые формы</div><div class="legend" style="background-color:#FFF">Чистовые формы</div></div>';
		if(mode==2) tableDiv.innerHTML += '<br><div style="text-align:center;"><input type="button" value="Сохранить" onclick="saveDataToDB()"></div>';
		fields = [];
		fields = $(".smallField");
		currentField = 0;
}
function mInspection(){
	blockHTML = '<div>';
	var state = lineState['manual_inspection_flaw'];
	for(var i = 1;i<5;i++){
		blockHTML += '<div class="mInspBlock">';
		blockHTML += '<div class="mInspBlockRow"><b> ' + inspType[i] + '</b></div>';
		if(state!= undefined)
		if(state[i]!= undefined)
			for(fl in state[i]){
				blockHTML += '<div class="mInspBlockRow">' + defects[state[i][fl].flaw_type].title + ', ' + state[i][fl].flaw_part + '% ';
				if(userType == 'OTK') blockHTML += '<input style="float:right" type="button" value="X" onclick="closeMIFlaw(' + state[i][fl].id + ')">';
				blockHTML += '</div>';
			}
		if(userType == 'OTK') blockHTML += '<br><input type="button" value="Добавить брак" onclick="kostil3(' + i + ')"></div>';
		else blockHTML += '</div>';
		el('mInspection').innerHTML = '';
		el('mInspection').innerHTML += blockHTML + '</div>';
	}
	
}
function getFlawStartAgo(flaw){
	var ret = "(Х ч.)";
			if (moment().add(1, 'hours').diff(moment(flaw.date_start), 'minutes')>59) ret = ' ('+ moment().add(1, 'hours').diff(moment(flaw.date_start), 'hours') + ' ч.)';
			else ret = '('+ moment().add(1, 'hours').diff(moment(flaw.date_start), 'minutes') + ' мин.)';
	return ret;
	
}
function getCorrTimeAgo(flaw){
	var ret = "(Не устранено)";
			if(flaw.corrective_action){
				if (moment().add(1, 'hours').diff(moment(flaw.corrective_date), 'minutes')>59) ret = ' (Устранено '+ moment().add(1, 'hours').diff(moment(flaw.corrective_date), 'hours') + ' ч. назад)';
				else ret = ' (Устранено '+ moment().add(1, 'hours').diff(moment(flaw.corrective_date), 'minutes') + ' мин. назад)';
			}
	return ret;
	
}
function printCell(sec, pos){
	var cellFlawPart = 0;
	var flawHTML = '-';
	var styleStr = '';
	var authMinHeight = '0';
	var action = 0;
	var fontColor = 'black';
	var textDecoration = 'none';
	var corr_time_ago = '';
	var blink_style = '';
	var moldHTML = '<div class="moldSubCell usable" onclick="kostil(' + sec + ',' + pos + ');customWindow.show(moldSelectorData)">-</div>';
	
	if(lineState[sec]){
		if(lineState[sec][pos]){
			flawHTML = 'Норма';
			action=0;
			
			for(var flaw in lineState[sec][pos].flaw){
				corr_time_ago = '';
				blink_style = '';
				if (lineState[sec][pos].flaw[flaw].flaw_author == 'SFM' ) blink_style = 'blink-2';
				if ((lineState[sec][pos].flaw[flaw].action * 1) > 1) cellFlawPart += lineState[sec][pos].flaw[flaw].flaw_part * 1;
				if(action<(lineState[sec][pos].flaw[flaw].action * 1)) action = lineState[sec][pos].flaw[flaw].action * 1;
				if(flawHTML=='Норма') flawHTML = '';
				if(userType == 'OTK') authMinHeight = '2.3';
				if(userType == 'OTK') flawHTML += '<input style="float:right" title="Закрыть брак"  type="button" value="&#10060" onclick="closeFlaw('+flaw+')">';
				else authMinHeight = '0';
				if(!lineState[sec][pos].flaw[flaw].corrective_action) textDecoration = 'none';
				else {
					textDecoration = 'line-through';
				}
				flawHTML += '<div class="'+blink_style+'" title="' + SFM_actions[lineState[sec][pos].flaw[flaw].corrective_action] + '"  style="min-height:'+authMinHeight+'em;text-decoration:'+textDecoration+'"> ' +getFlawStartAgo(lineState[sec][pos].flaw[flaw]) + getCorrTimeAgo(lineState[sec][pos].flaw[flaw])+'&nbsp'+defects[lineState[sec][pos].flaw[flaw].flaw_type].title;
				if (action > 1) flawHTML += ", " + normF(lineState[sec][pos].flaw[flaw].flaw_part, 2) + "% ";
				flawHTML += '<input style="float:right" type="button" title="Оставить комментарий" value="&#128172" onclick="createCom('+flaw+')">';
				if (lineState[sec][pos].flaw[flaw].flaw_author == 'SFM' && userType=='OTK')flawHTML += '<input style="float:right" type="button" title="Да, это брак" value="&#9989" onclick="acceptFlaw('+flaw+')">';
				if (lineState[sec][pos].flaw[flaw].comment) flawHTML += '<br>' + lineState[sec][pos].flaw[flaw].comment;
				
				
				if(userType == 'SFM') flawHTML += '[<a href="javascript:showCorrectiveSelector(' + flaw + ', \'Устранить: ' + defects[lineState[sec][pos].flaw[flaw].flaw_type].title + '\')">Устранить</a>]';
				flawHTML += '</div>';
			}
			if(action == 3) fontColor = 'white';
			if(userType == 'OTK') flawHTML += '<div  style=""><input type="button" value="&#10133 брак" onclick="createFlaw(' + lineState[sec][pos].moldRecId + ')"></div>';
			else flawHTML += '<div  style=""><input type="button" value="Сообщить о браке" onclick="createFlaw(' + lineState[sec][pos].moldRecId + ')"></div>';
			
			styleStr = 'background-color:'+corrective_actions[action].color+';color:'+fontColor;
			if (cellFlawPart>0) moldHTML += '<br>'+'<span style="font-size:0.7em;">Брак по ячейке: ' + cellFlawPart + '%';
			totalFlawPart += cellFlawPart;
			moldHTML = '<div class="moldSubCell usable" onclick="kostil(' + sec + ',' + pos + ');customWindow.show(moldSelectorData)">' + lineState[sec][pos].mold  + '<br><span style="font-size:0.7em;font-weight:500">' + moment().diff(moment(lineState[sec][pos].mold_date_start), 'hours') + ' ч.</span></div>';
		} else {
			styleStr = 'color:black';
		}
	}
	
	var ringHTML = '<div class="moldSubCell usable" style="background-color:#99f" onclick="kostilRing(' + sec + ',' + pos + ');customWindow.show(ringSelectorData)">-</div>';
	if(lineState['rings'])
	if(lineState['rings'][sec]){
			if(lineState['rings'][sec][pos]){
				ringHTML = '<div class="moldSubCell usable" style="background-color:#99f" onclick="kostilRing(' + sec + ',' + pos + ');customWindow.show(ringSelectorData)">' + lineState['rings'][sec][pos].num + '<br><span style="font-size:0.7em;font-weight:500">' + moment().diff(moment(lineState['rings'][sec][pos].date_start), 'hours') + ' ч.</span></div>';
			}
	}
	
	var roughMoldHTML = '<div class="usable moldSubCell" onclick="kostilRough(' + sec + ',' + pos + ');customWindow.show(roughMoldSelectorData)" style="color:white;background-color:black">-</div>';
	if(lineState['rough_molds'])
	if(lineState['rough_molds'][sec]){
		if(lineState['rough_molds'][sec][pos]){
			roughMoldHTML = '<div class="usable moldSubCell " style="color:white;background-color:black"  onclick="kostilRough(' + sec + ',' + pos + ');customWindow.show(roughMoldSelectorData)">' + lineState['rough_molds'][sec][pos].num + '<br><span style="font-size:0.7em;font-weight:500">' + moment().diff(moment(lineState['rough_molds'][sec][pos].date_start), 'hours') + ' ч.</span></div>';
		}
	}
	var returnedHTML = '<div  class="moldCell" >';
		if (userType == 'SFM' )returnedHTML += ringHTML + roughMoldHTML ;
		returnedHTML += moldHTML + '</div><div style="' + styleStr + '" class="flawCell">'+flawHTML+'</div>';
	return returnedHTML;
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
	if(userType == 'OTK'){
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
function ringSelector(contentDiv, sec, pos){
	var container = document.createElement("DIV");
		container.style.width = '20cm';
		contentDiv.appendChild(container);
	var newMoldElem;
		for(var ring=0; ring<301; ring++){
			newMoldElem = document.createElement('DIV');
			newMoldElem.style.display = 'inline-block';
			newMoldElem.style.padding ="5px";
			newMoldElem.style.margin ="5px";
			newMoldElem.className = 'usable';
			var color = 'white';
			if(ring < 100) color = '#ccffcc';
			if(ring >= 100) color = '#ccccff';
			if(ring >=200) color = '#ffcccc';
			newMoldElem.style.backgroundColor = color;
			if (ring>0){
				newMoldElem.innerHTML = ring;
				newMoldElem.onclick = function(moldd, secc, poss){
					return function(){mountSFM(moldd, secc, poss, 'rings');
									  customWindow.hide();
									  };
				}(ring, clickSec, clickPos);
			}else{
					newMoldElem.innerHTML = 'Снять кольцо';
					newMoldElem.onclick = function(mold_rec_id){
						return function(){unmountSFM(mold_rec_id, 'rings');
										  customWindow.hide();
										  };
					}(moldRecId);
			}
			if(moldRecId=='' && ring==0){
				
			} else{
				container.appendChild(newMoldElem);
			}
		}
}

function kostilRing(sec, pos){
	clickSec = sec;
	clickPos = pos;
	moldRecId = '';
	if(lineState['rings'][sec])
		if(lineState['rings'][sec][pos]) moldRecId = lineState['rings'][sec][pos].recId;
}

function showCorrectiveSelector(flawId, header){
	//alert(flawId + "   " + header);
	newCAction.flawId = flawId;
	newCAction.comment = "";
	
	modalWindow.show(header, function(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML += '<div>Мероприятие<div id="correctiveAction" class="usable" style="background-color:#fc9"></div></div>';
		wDiv.innerHTML += 'Комментарий<br>';
		wDiv.innerHTML += '<input type="text" placeholder="Если есть" id="cComment"><br><br>';
		wDiv.innerHTML += '<input type="button" value="Добавить" id="addCAction">';
		contentDiv.appendChild(wDiv);
		
		el('addCAction').onclick = function(){
			$.ajax('wraper.php',{type:"GET", data:{task:"addCorrectiveAction", flawId:newCAction.flawId, action:newCAction.action, corrective_comment:newCAction.comment},success:reciever, error:error_handler});
			modalWindow.hide();
		}
		
		var supportParamDiv = document.createElement('DIV');
		supportParamDiv.style.width = "300px";
		supportParamDiv.style.cssFloat = "left";
		supportParamDiv.style.display = 'none';
		contentDiv.appendChild(supportParamDiv);
		
		var correctivDiv = el('correctiveAction');
		correctivDiv.innerHTML = SFM_actions[newCAction.action];
		correctivDiv.onclick = function(){
			supportParamDiv.innerHTML = '';
			supportParamDiv.style.display = "block";
			var defectsDiv = document.createElement('DIV');
				supportParamDiv.appendChild(defectsDiv);
			var newElem;
				defectsDiv.innerHTML = 'Выберите:';
				for(var id in SFM_actions){
					newElem = document.createElement('DIV');
					//newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor = '#fc9';
					newElem.className = 'usable';
					newElem.innerHTML = SFM_actions[id];
					newElem.onclick = function(d){
							return function(){
								newCAction.action = d;
								supportParamDiv.style.display = "none";
								el('correctiveAction').innerHTML = SFM_actions[d];
								//el('correctiveAction').style.backgroundColor = corrective_actions[newFlaw.action].color;
							}
							}(id);
					defectsDiv.appendChild(newElem);
					}
			//actionSelector(supportParamDiv)
		};
	});
}
function roughMoldSelector(contentDiv, sec, pos){
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
					return function(){mountSFM(moldd, secc, poss, 'rough_molds');
									  customWindow.hide();
									  };
				}(mold, clickSec, clickPos);
			}else{
					newMoldElem.innerHTML = 'Снять форму';
					newMoldElem.onclick = function(mold_rec_id){
						return function(){unmountSFM(mold_rec_id, 'rough_molds');
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
function kostilRough(sec, pos){
	clickSec = sec;
	clickPos = pos;
	moldRecId = '';
	if(lineState['rough_molds'][sec])
		if(lineState['rough_molds'][sec][pos]) moldRecId = lineState['rough_molds'][sec][pos].recId;
}
function allFormsFlaw(){
	document.getElementsByName("allFormsFlaw")[0].click()
	
	checkboxes = document.getElementsByName('ch');
	document.getElementById("fPart").value = document.getElementById("fPart").value/checkboxes.length
	}
function createFlaw(moldId){
	newFlaw.moldsIdsList = moldId;
	//customWindow.show(flawCreatorData);
	modalWindow.show('Опишите брак', function f(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML = '<div>Формы, куда вешать брак:<b><div id="moldsDiv"></div></b></div>';
		wDiv.innerHTML += '<div>Тип брака<div id="fType" class="usable"></div></div>';
		wDiv.innerHTML += 'Корректирующее действие<br>';
		wDiv.innerHTML += '<div id="fAction" class="usable"></div><br>';
		wDiv.innerHTML += 'Доля брака<br>';
		wDiv.innerHTML += '<input type="text" id="fPart"><input type="button" value="Поделить между формами" OnClick="allFormsFlaw()"><br><br>';
		wDiv.innerHTML += 'Значение параметра<br>';
		wDiv.innerHTML += '<input type="text" id="fParameter"><br><br>';
		wDiv.innerHTML += 'Комментарий<br>';
		wDiv.innerHTML += '<input type="text" id="fComment" value=""><br><br>';
		wDiv.innerHTML += '<input id="newFlawBtn" type="button" value="Добавить">'; //onclick="newFlawKostil()"
		contentDiv.appendChild(wDiv);
		
		el('newFlawBtn').onclick = function(){
			newFlaw.moldsIdsList = '';
			var checkboxes = document.getElementsByName('ch');
			var delimiter = '';
			newFlaw.moldsIdsList='';
			for(var c in checkboxes){
				if (checkboxes[c].checked) {
					if (checkboxes[c].moldCellId!= undefined) {newFlaw.moldsIdsList += delimiter + checkboxes[c].moldCellId;
					delimiter = ', ';
					}
				}
			}
			newFlaw.flaw_part = validateFloatInput(el('fPart').value);
			newFlaw.parameter_value = el('fParameter').value;
			if(el('fComment').value.length>0) {
				newFlaw.comment = '<b>'+userType+':</b>'+el('fComment').value;
			}else{
				newFlaw.comment = "";
			}
			//alert(el('fComment').value.length);
			//alert(userType);
			newFlaw.userType = userType; 
			addFlaw(newFlaw);
			modalWindow.hide();
		}
		
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
});
}

function kostil3(inspType){
	newFlaw.inspection_type = inspType;
	customWindow.show(MIFlawCreatorData);
}
function MIFlawCreator(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML += '<div>Тип брака<div id="fType" class="usable"></div></div>';
		wDiv.innerHTML += 'Доля брака<br>';
		wDiv.innerHTML += '<input type="text" id="fPart"><br><br>';
		wDiv.innerHTML += '<input type="button" value="Добавить" onclick="newMIFlawKostil()">';
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
			newLabel = document.createElement('LABEL');
			newLabel.innerHTML = moldsOnLine[mold][0];
			pairDiv.appendChild(newCheckbox);
			pairDiv.appendChild(newLabel);
			fMoldsDiv.appendChild(pairDiv);
		}
		/*Кнопка Выбрать все формы*/
		pairDiv = document.createElement('DIV');	
		pairDiv.style.padding = '5px';
		pairDiv.style.display = 'inline-block';
		newCheckbox = document.createElement('INPUT');
		newCheckbox.type = 'button';
		newCheckbox.value = 'Выбрать все формы';
		newCheckbox.moldCellId = "allForms";
		newCheckbox.onclick = function(){
						return function(){
							var checkboxes = document.getElementsByName('ch');
							for(c in checkboxes) checkboxes[c].checked = true;
						};
					}();
		newCheckbox.name = "allFormsFlaw";
		pairDiv.appendChild(newCheckbox);
		fMoldsDiv.appendChild(pairDiv);
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
					if(!in_array("text", params[p].display) || params[p].display.length == 0){
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
}
function reports(contentDiv){
	var lstElem;
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "150px";
		wDiv.style.textAlign = 'left';
		contentDiv.appendChild(wDiv);
		wDiv.innerHTML = '<div class="usable"><a href="/skik/statistic/index.php?production=' + currentProductionId + '">По бракам</a></div><div class="usable"><a href="/skik/statistic/MoldsReport.php?production=' + currentProductionId + '">По формам</a></div><div class="usable"><a href="">По простоям</a></div>';
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
function newMIFlawKostil(){
		newFlaw.flaw_part = validateFloatInput(el('fPart').value);
		addMIFlaw(newFlaw);
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
function getColor(id){
	if(defects[id].level == 5) return "#CC3300"; 
	if(defects[id].level == 4) return "red"; 
	if(defects[id].level == 3) return "orange"; 
	if(defects[id].level == 2) return "#FFCC33"; 
	if(defects[id].level == 1) return "yellow"; 
	//if(n<100) return 'red';
	//if(n<200) return 'orange';
	//return 'yellow';
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
	
	alert(dataStr);
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
	var maxVal, minVal;
	if (productionParams[currentParam].max !=0 ) maxVal = productionParams[currentParam].max;
	if (productionParams[currentParam].min !=0 ) minVal = productionParams[currentParam].min;
	if(val=="") return;
	if (maxVal)
		if(val>parseFloat(validateFloatInput(productionParams[currentParam].max))){
			alert("Больше чем  можно. Это брак.");
			el.value="";
			el.focus();
			return;
		}
	if(minVal)
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
function machineIterator(f){
	for(var sec=1; sec<11; sec++){
		for(var pos=1; pos<11; pos++){
			if (lineState[sec])
				if(lineState[sec][pos])
					f.call(lineState[sec][pos]);
		}
	}
}
function downtimeMaker(contentDiv){
	var wDiv = document.createElement('DIV');
		wDiv.style.cssFloat = "left";
		wDiv.style.width = "300px";
		wDiv.style.textAlign = 'left';
		wDiv.innerHTML += '<div>Причина простоя<div id="dReason" class="usable" style="background-color:#fc9"></div></div>';
		wDiv.innerHTML += '<div>Начало простоя <div id="dStart" class="usable" style="background-color:#fc9" onclick="calendar(newDowntime.date_start, 400, 100, calCallback)">Нажмите, чтобы выбрать дату</div> Конец простоя <div id="dEnd" class="usable" style="background-color:#fc9" onclick="calendar(newDowntime.date_end, 400, 100, calCallback)">Нажмите, чтобы выбрать дату</div></div>';
		wDiv.innerHTML += 'Комментарий<br>';
		wDiv.innerHTML += '<input type="text" placeholder="Если есть" id="cComment" style="width:100%"><br><br>';
		wDiv.innerHTML += '<input type="button" value="Добавить" id="addCAction">';
		contentDiv.appendChild(wDiv);
		el('dStart').innerHTML = 'Нажмите, чтобы выбрать дату'
		el('addCAction').onclick = function(){
			$.ajax('wraper.php',{type:"GET", data:{task:"addDowntime", dReason:newDowntime.dReason, date_start:newDowntime.date_start.format("YYYY-MM-DD HH:mm"), date_end:newDowntime.date_end.format("YYYY-MM-DD HH:mm"), comment:newDowntime.comment},success:reciever, error:error_handler});
			modalWindow.hide();
		}
		
		var supportParamDiv = document.createElement('DIV');
		supportParamDiv.style.width = "300px";
		supportParamDiv.style.cssFloat = "left";
		supportParamDiv.style.display = 'none';
		contentDiv.appendChild(supportParamDiv);
		
		var correctivDiv = el('dReason');
		correctivDiv.innerHTML = dReasons[newDowntime.dReason];
		correctivDiv.onclick = function(){
			supportParamDiv.innerHTML = '';
			supportParamDiv.style.display = "block";
			var defectsDiv = document.createElement('DIV');
				supportParamDiv.appendChild(defectsDiv);
			var newElem;
				defectsDiv.innerHTML = 'Выберите:';
				for(var id in dReasons){
					newElem = document.createElement('DIV');
					//newElem.style.cssFloat = 'left';
					newElem.style.padding = '5px';
					newElem.style.backgroundColor = '#fc9';
					newElem.className = 'usable';
					newElem.innerHTML = dReasons[id];
					newElem.onclick = function(d){
							return function(){
								newDowntime.dReason = d;
								supportParamDiv.style.display = "none";
								el('dReason').innerHTML = dReasons[d];
							}
							}(id);
					defectsDiv.appendChild(newElem);
					}
			//actionSelector(supportParamDiv)
		}
}
function calCallback(){
	el('dStart').innerHTML = newDowntime.date_start.format("DD " + months[newDowntime.date_start.format('M')].name + " YY HH:mm");
	el('dEnd').innerHTML =  newDowntime.date_end.format("DD " + months[newDowntime.date_end.format('M')].name + " YY HH:mm");
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
var roughMoldSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выберите черновую форму"
	},
	"contentFunc": roughMoldSelector,
	"callback":function(){
							alert('callback call');
						}
}
var ringSelectorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Выберите кольцо"
	},
	"contentFunc": ringSelector,
	"callback":function(){
								alert('callback call');
						}
}
var MIFlawCreatorData = {
	"view":	{	
		"left":"100", 
		"top":"100", 
		"headerText":"Опишите брак"
	},
	"contentFunc": MIFlawCreator,
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
}
var selectReport = {
	"view":	{	
		"left":"300", 
		"top":"100", 
		"headerText":"О Т Ч Е Т Ы"
	},
	"contentFunc": reports,
	"callback":function(){
								alert('callback call');
						}
}
var makeComment = {
	"view":	{	
		"left":"400", 
		"top":"150", 
		"headerText":"Оставьте комментарий (если нужно)"
	},
	"contentFunc": function(){
		
	},
	"callback":function(){
								alert('callback call');
						}
}