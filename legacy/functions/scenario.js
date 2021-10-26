/*нахуй РНР! только JavaScript! Только хардкор!*/
/*id, тип объявы, тип объекта, район, адрес, площадь, цена, количество комнат, комент*/
/*var objects=[];
	objects[1]=[1, 0, 0, 1, 'ул. Пшижильского, 34', 36, 1450000, 1, "хуё маё"];
	objects[2]=[2, 0, 0, 2, 'ул. Р.Шпелькенберг, 2', 50, 2450000, 2, "хуё маё2"];
	objects[3]=[3, 1, 0, 4, 'пл. Раско, 4', 25, 8000, 0, "хуё маё3"];
	objects[4]=[4, 0, 1, 105, 'Рака-мако-фо, 2-3', 25, 20000, null, "хуё маё67"];
	objects[5]=[5, 0, 2, 5, 'нет', 125, 2000000, 7, "хуё маё6маё7"];
	objects[60]=[60, 1, 3, 3, 'ул. 133 года, 44/3 ', 50, 120000, 1, "хуё мльбе"];
	objects[61]=[61, 0, 2, 3, 'ул. 193 года, 44/3 ', 100, 220000, 2, "хуё маё6маё7шибе"];
	objects[65]=[65, 1, 1, 3, 'ул. 1211 года, 44/3 ', 666, 320000, null, "хуё маё6шишкельбе"];
	objects[66]=[66, 0, 0, 3, 'ул. 1944 года, 44/3 ', 10, 420000, 6, "хуё маё6маё7шкельбе"];
	objects[67]=[67, 1, 3, 3, 'ул. 2013 года, 44/3 ', 1, 520000, 1, "хуё маёаё7шишкельбе"];*/
	
function al(text){
	alert(text);
}
function ebi(str){/* ElementById*/
	return document.getElementById(str);
}
function ebn(str){/* ElementsByName*/
	return document.getElementsByName(str);
}
function miniMenuClick(el, item){
	var side='';
	cNodes=el.parentNode.childNodes;
	for(i=0;i<cNodes.length;i++){
		cNodes[i].className="miniMenuItem";
	}
	el.className="miniMenuItem miniMenuItemSelected";
	if(el.parentNode.id=="leftMenu"){
		ebi('topLeftMenuSelectedItem').value = item;
		side='l';
	}
	else{
		ebi('topRightMenuSelectedItem').value = item;
		side='r';
	}
	initSq();
	if (side=='l'){
		ebi('areaMenu').innerHTML='';
		ebi('roomsMenu').innerHTML='';
		ebi('sqMenu').innerHTML='';
		if(item==0){
			doAreaSelector();
			doRoomsSelector(1);
			doSqSelector();
		}
		if(item==1){ 
			doAreaSelector();
			doSqSelector();
		}
		if(item==2){
			doAreaSelector();
			doSqSelector();
		}
		if(item==3){
			doAreaSelector();
			doSqSelector();
		}
	}
	ebi('Area').value=0;
	renderAdv();
}
function selectArea(area){
	ebi('Area').value=area;
	ebi('SelectArea').style.display='none';
	ebi('selectedArea').innerHTML=areas[area];
	renderAdv();
}
function initAreas(){
	for(var eln in areas){
	var newLi=document.createElement('LI');
		newLi.innerHTML='<a href="javascript:selectArea('+eln+');">'+areas[eln]+'</a>';
		if (eln<100) ebi('sar').appendChild(newLi);
		else ebi('Resp').appendChild(newLi);
	}
}
function doAreaSelector(){
	
	ebi('areaMenu').innerHTML='<div id="areaSelector">Район:<a class="selParm" id="selectedArea" href="Javascript:function d(){ebi('+"'"+'SelectArea'+"'"+').style.display='+"'"+'block'+"'"+'}; d();">Весь Саранск</a></div>';
}
function doRoomsSelector(n){
var menuEl = ebi('roomsMenu');
var k, stl;
var text='';
	if(ebi('roomsCountSelector')!= null) ebi('roomsCountSelector').parentNode.removeChild(ebi('roomsCountSelector'));
	text+='<div id="roomsCountSelector" style="margin-left:10px;"><span style="float:left;">Количество комнат:</span>';
	for(i=0;i<5;i++){
		k=i;
		if (i==0) k='Kомн';
		if (i==4) k='4+';
		if (i==n){
			stl='menuItem menuItemSelected';
			ebi('rooms').value=i;
		}
		else stl='menuItem'; 
		text+='<span class="'+stl+'" onClick="doRoomsSelector('+i+');">'+k+'</span>';
	}
	text+='</div>';
	menuEl.innerHTML+=text;
	renderAdv();
}
function doSqSelector(){
	ebi('sqMenu').innerHTML='Площадь:<a class="selParm" id="selectedSq" href="Javascript:function d(){ebi('+"'"+'SelectQ'+"'"+').style.display='+"'"+'block'+"'"+';initSq();};d();">Любая</a>';
}
function initSq(){
	ebi('sqList').innerHTML="";
	var tor=ebi('topLeftMenuSelectedItem');
	var q=ebi('SelectQ');
	var ar=sqFl;
	for(var eln in ar){
		var newLi=document.createElement('LI');
		if (tor.value==1){
			if (eln>=100) newLi.innerHTML='<a href="javascript:selectSq('+eln+');">'+ar[eln][0]+'</a>';
			q.style.left='300';
		}
		else {
			if (eln<100) newLi.innerHTML='<a href="javascript:selectSq('+eln+');">'+ar[eln][0]+'</a>';
			q.style.left='450';
		}
	if (ebi('topLeftMenuSelectedItem').value==1) ebi('sq').value = 100;
	else ebi('sq').value = 0;
	ebi('sqList').appendChild(newLi);
	}
}
function selectSq(sq){
	ebi('sq').value=sq;
	ebi('SelectQ').style.display='none';
	ebi('sqList').innerHTML="";
	ebi('selectedSq').innerHTML=sqFl[sq][0];
	renderAdv();
}
function initInit(){
	ebi('topLeftMenuSelectedItem').value=0;
	ebi('topRightMenuSelectedItem').value=0;
	ebi('Area').value=0;
	ebi('rooms').value=0;
	ebi('sq').value=0;
	initAreas();
	miniMenuClick(ebi('leftMenu').childNodes[1],0);
	ebi('iWant').style.display = "none";
}
function renderAdv(){
	var n=0;
	var advDiv=ebi('adverts');
	advDiv.innerHTML="";
	for(var i in objects){
		if (!objects.hasOwnProperty(i)) continue;
		if (checkObj(objects[i])){
			var newEl=document.createElement('DIV');
			newEl.className="objDiv";
			newEl.innerHTML=renderObj(objects[i])
			advDiv.appendChild(newEl);
			n++;
		}
		else {/*var newEl=document.createElement('DIV');
			newEl.className="objDiv";
			newEl.style.color='gray';
			newEl.innerHTML=renderObj(objects[i])
			advDiv.appendChild(newEl);*/
		}
	}
	if (n==0) {
		var newEl=document.createElement('DIV');
		newEl.className="objDiv";
		newEl.innerHTML='<div style="text-align:center; color:gray;">Такого ничего нет.</div>'
		advDiv.appendChild(newEl);
	};
}
function renderObj(obj){
	var res;
	res='<div class="advId">'+obj[0]+'</div>';
	if (obj[1]==0)res+=' <div class="advType">Продается ';
	if (obj[1]==1)res+=' <div class="advType">Сдается ';
	if (obj[2]==0){
		
		if (obj[7]==0) res+='Комната</div> ';
		else res+=obj[7]+'-комн.'+objType[obj[2]]+'</div> ';
	}
	else res+=objType[obj[2]]+'</div> ';
	res+='<div class="advArea"> '+areas[obj[3]]+'<br> '+obj[4]+'</div>';
	if (obj[2]!=1) res+=' <div class="advSq">'+obj[5]+' м<sup>2</sup></div>';
	else res+=' <div class="advSq">'+obj[5]+' соток</div>';
	if (obj[1]==1) res+='<div class="advPrice">'+obj[6]+' Р./мес.</div>';
	else res+='<div class="advPrice">'+obj[6]+' Р.</div>';
	return res;
}
function checkObj(obj){
	if(ebi('topLeftMenuSelectedItem').value==4) return true;
	
	if(obj[1]!=ebi('topRightMenuSelectedItem').value) return false;
	if(obj[2]!=ebi('topLeftMenuSelectedItem').value) return false;
	if (ebi('Area').value!=0 & ebi('Area').value!=100){
		if (obj[3]!=ebi('Area').value) return false;
	}
	else{ 
		if (ebi('Area').value==0) {if (obj[3]>100) return false};
	}
	if (ebi('topLeftMenuSelectedItem').value==0){
		if (ebi('rooms').value==4){ if (obj[7]<4) return false}
		else { if (obj[7]!=ebi('rooms').value) return false}
	}
	if(obj[5]<sqFl[ebi('sq').value][1] | obj[5]>=sqFl[ebi('sq').value][2] ) return false;
	
	return true;
}
function go(page){
		if (page==1) document.location.href="viewrealty.php";
		
}