var tableAssets={};
var lastNums={};
var excelProduction;
var currentProduct;
var line=1;

var difName= false;
var difWarning='<br><span style="color:red">Другое название продукции. Нумерация начнется с единицы.</span>';
var debug = false;
var number;

var lines={};
	lines['1']={"name":"A1"};
	lines['2']={"name":"A2"};
	lines['3']={"name":"A3"};
	lines['4']={"name":"B1"};
	lines['5']={"name":"B2"};
	lines['6']={"name":"B3"};
	lines['7']={"name":"C1"};
	lines['8']={"name":"C2"};
	lines['9']={"name":"C3"};
	lines['0']={"name":"Z0"};


	
function getLastNums(){
	$.ajax('Table.php',{type:"GET", data:{getLastNums:"yes"},success:function(answer){
		//alert (answer);
		lastNums=$.parseJSON(answer);
		bottles.off();
	}, error:error_handler});
}	
function setLastNum(){
	$.ajax('Table.php',{type:"GET", data:{setLastNum:"yes", line:line, newName:excelProduction[currentProduct].fullName,newNum:number},success:function(answer){
		log (answer);
		lastNums[line].lastNum=number;
		lastNums[line].name=excelProduction[currentProduct].fullName;
		el('numStart').innerHTML=lastNums[line].lastNum;
		
	}, error:error_handler});
}	
function getTableData(){
	
}
function getProductionData(){
	bottles.on("Загрузка списка продукции");
	$.ajax('Table.php',{type:"GET", data:{getProductionFromExcel:"yes"},success:function(answer){
		//log (answer);
		answerObj=$.parseJSON(answer);
		excelProduction=answerObj.production;
		merge();
		if(answerObj.isFileCopied=="yes") toast("Файл скопирован с паблика");
		else  toast("Файл НЕ скопирован с паблика", "#FFF","#F00");
		getLastNums();
	}, error:error_handler});
}
function merge(){
	/*for(var p in excelProduction){
		if(typeof(tableAssets[excelProduction[p].code])!='undefined'){
			excelProduction[excelProduction[p].code].iso=tableAssets[excelProduction[p].code].iso;
			excelProduction[excelProduction[p].code].pics=tableAssets[excelProduction[p].code].pics;
			excelProduction[excelProduction[p].code].hide=tableAssets[excelProduction[p].code].hide;
			excelProduction[excelProduction[p].code].target=tableAssets[excelProduction[p].code].target;
		}
	}*/
	showList();
	//log(jstr(excelProduction));
}
function showList(){
	var list="";
	var text=el('search').value;

	for(var p in excelProduction){
		if(excelProduction[p].code.toLowerCase().indexOf(text.toLowerCase(), 0)>=0){
			list+='<div class="listElement"  onmouseover="showPreview('+excelProduction[p].code+')" onclick="listClick('+excelProduction[p].code+', true)"><img style="" alt="var img" src="img/'+excelProduction[p].color+'m.png"><span>'+highlight(excelProduction[p].code, text)+' ('+excelProduction[p].fullName+')</span></div>';
		}
	}
	el('productionList').innerHTML=list;
}
function listClick(code, ask){
	if (ask) line=prompt("Введите номер линии");
	if (!line) return;
	currentProduct=code;
	el('productionListWrap').style.display='none';
	el('genForm').style.display='block';
	el('line').innerHTML=line;
	
	el('selectedProduct').innerHTML=excelProduction[code].fullName;
	el("labelPreview").innerHTML=showPreview(code);
	//el('pics').innerHTML+='<img style="" alt="var img" src="img/'+excelProduction[code].color+'.png"></img>';
	el('numStart').innerHTML=lastNums[line].lastNum;
	if (lastNums[line].name!=excelProduction[code].fullName) difName=true;
	else difName=false;
	log ("Было: "+lastNums[line].name+", Стало: "+excelProduction[code].fullName);
	if (difName) el('numStart').innerHTML+=difWarning+'<br>Предыдущее название: '+lastNums[line].name;
}
function showEditForm(){
	el('productionListWrap').style.display='none';
	el('genForm').style.display='none';
	el('editForm').style.display='block';
	el('editingProduct').innerHTML=excelProduction[currentProduct].fullName;
	if (typeof(excelProduction[currentProduct].iso)!='indefined'){
		el('iso').value=excelProduction[currentProduct].iso;
	}{el('iso').value='';}
	if (typeof(excelProduction[currentProduct].sap)!='undefined'){
		el('sap').value=excelProduction[currentProduct].sap;
	}else{el('sap').value='';}
}
function showPreview(code){
	var iso;
	var titleHtml='<span style="font-size:'+getTitleSize(excelProduction[code].shortName)+'px;margin-left:0px;">'+excelProduction[code].shortName+'</span>';
	code=code+"";
	if(excelProduction[code].sto!="") iso = excelProduction[code].sto;
	else iso = excelProduction[code].gost;
	/*if (excelProduction[code].target.toLowerCase()=="банка детская") 	iso = "ГОСТ Р52327-2005";
	else if (excelProduction[code].target.toLowerCase()=="банка стекляная") 	iso = "СТО 99982965-002-2009";
		else if (excelProduction[code].target.toLowerCase()=="флакон стеклянный") 	iso = "ГОСТ Р51781-2001";
		else iso = "СТО 99982965-001-2008";*/
	
	ebola=labelPattern.replace(new RegExp("%id%",'g'),excelProduction[code].code).replace(new RegExp("%proc%",'g'),excelProduction[code].proc).replace(new RegExp("%fullName%",'g'),excelProduction[code].fullName).replace(new RegExp("%sName%",'g'),titleHtml).replace(new RegExp("%form%",'g'),excelProduction[code].form).replace(new RegExp("%iso%",'g'),iso).replace(new RegExp("%h%",'g'),excelProduction[code].h).replace(new RegExp("%h%",'g'),excelProduction[code].h).replace(new RegExp("%boxing%",'g'),excelProduction[code].boxing).replace(new RegExp("%count%",'g'),excelProduction[code].totalUnits).replace(new RegExp("%rowCount%",'g'),(excelProduction[code].totalUnits/excelProduction[code].layers)).replace(new RegExp("%color%",'g'),getColor(excelProduction[code].color)).replace(new RegExp("%target%",'g'),excelProduction[code].target).replace(new RegExp("%sap%",'g'), getSap(code)).replace(new RegExp("%glPic%",'g'), '<img style="" alt="var img" src="img/'+excelProduction[code].color+'.png"></img>' );
	return ebola;
}
function getColor(c){
	if (c=="10") return "бесцветный";
	if (c=="20") return "зеленый";
	if (c=="30") return "коричневый";
}
function zeroinator(i) {
	if (i<10) return "00"+i;
	if (i<100) return "0"+i;
	return i;
}
function generate(){
	var labels = el('labelPreview');
	var numStart;
	if (difName) numStart=1;
	else numStart=lastNums[line].lastNum*1+1;
	var numEnd =(el('count').value*1)+numStart;
	var tmpLabel=showPreview(currentProduct);
	var date=moment().format("DDMMYY");
	var parity=false;
	tmpLabel=tmpLabel.replace(new RegExp("%date%",'g'),moment().format("DD.MM.YY"));
	labels.innerHTML="";
	// генерация
	for(var i=numStart;i<numEnd;i++){
		/*.replace(new RegExp("%%",'g'),excelProduction[code].code)*/
		labels.innerHTML+=tmpLabel.replace(new RegExp("%line%",'g'),lines[line].name).replace(new RegExp("%pn%",'g'),zeroinator(i)).replace(new RegExp("11111123334444",'g'),getBarcode(date,line,zeroinator(i)))+"<br>";
		if (parity){
			labels.innerHTML+='<hr style="page-break-after: always">';
			parity=false;
		}else{
			labels.innerHTML+="<br><br>";
			parity=true;
		}
	}
	number = numEnd-1;
	difName = false;
	setLastNum();
}
function getBarcode(date, line, palNum){
	return date+line+excelProduction[currentProduct].code.slice(4)+palNum;
}
function goBack(id){
	el('labelPreview').innerHTML=labelPattern;
	el('productionListWrap').style.display='block';
	el(id).style.display='none';
}
function getSap(code){
	//var saps=[{"name":"КПНв-500-Медведи","sap":"SAP 40009335", "color":"10"}, {"name":"КПНв-500-Медведи","sap":"SAP 40007297", "color":"20"}, {"name":"КПНн-330-Хейнекен","sap":"SAP 40001166", "color":"20"}, {"name":"КПНн-500-Доктор Дизель","sap":"SAP 40002539", "color":"20"}, {"name":"КПНн-500-Доктор Дизель","sap":"SAP 40006122", "color":"10"}, {"name": "КПНв-500-LN","sap":"SAP 40013407", "color":"10"}, {"name":"КПНв-500-LN","sap":"SAP 40001163", "color":"30"}];
	var result="<br><br><br>";
	if(excelProduction[code].sap!=""){
		result='<span class="">SAP '+excelProduction[code].sap+'</span><br>Номер производственной партии <span class="">'+moment().format("DDMMYY")+'</span><br>Срок годности <span class="">до '+moment().add(1, 'years').format("DD.MM.YYYY")+' г.</span>';
	}
	return result;
}
function getTitleSize(title){
	if(title.length<10) return 50;
	else return (63-title.length);
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

var labelPattern='<div class="label"> <div class="labelTop"> <div class="labelTopProductNum"> <span style="font-size:72px"><b>%id%</b></span><br> <span>номер продукта</span> </div> <div class="labelTopForm"> <span style="font-size:56px"><b>%form%</b></span><br> <span>номер формы</span> </div>	 </div>	 <div class="labelBottomLeft"> <img style="-moz-transform : rotate(-90deg); margin-top:1.8cm; margin-left:-1.2cm;" alt="Barcode-Result" src="/../barcode.php?print=1&code=11111123334444&scale=2&mode=png&encoding=128&random=50027175"></img><br> <img style="margin-top:3cm;margin-left:-1cm;" alt="3 icons" src="img/3icon.jpg"></img> </div>	 <div class="labelBottomCenter"> <div class="labelProductName"> <span  class="title"><b>%sName%</b></span><br> <span  style="font-size:20px">%fullName%</span> </div> <div class="labelProductDetails"> <b>%target%</b><br> <div class="sto">%iso%</div><br> Цвет стекла: <span class="mediumFont">%color%</span><br> Количество изделий в ряду <span class="mediumFont">%rowCount%</span><br> В паллете <span class="mediumFont">%count%</span><br> Номер м/линии <span class="mediumFont">%line%</span><br> Тип упаковки:<span style="font-size:1.5em"><b>%boxing%</b></span><br> Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х%h%</b></span><br> Процесс: <b>%proc%</b><br> %sap% </div>	 <div class="labelPalletDate"> <img style="-moz-transform:scale(1,0.5);margin-top:-20px;margin-bottom:-20px;" alt="Barcode-Result" src="/../barcode.php?print=1&code=11111123334444&scale=2&mode=png&encoding=128&random=50027175"></img><br> <span style="font-size:36px">%date%</span><br> <span>дата</span><br> <span style="font-size:56px">%pn%</span><br> <span>номер паллета</span> </div> <hr> <div> <div class="address"> <b><span style="font-size:14px;">ЗАО "Рузаевский Стекольный Завод"</span><br></b> Республика Мордовия, г. Рузаевка,<br> ул. Станиславского, д. 22<br> Телефон: (83451) 9-42-01<br> E-mail: info@ruzsteklo.ru </div> <img style="display:inline-block;padding-left:0.5cm;padding-right:0.5cm" alt="" src="img/rsz.png"></img> <div class="iso"> ГОСТ Р ИСО 9001-2008, ГОСТ Р ИСО 22000-2007,<br> ГОСТ Р ИСО 14001-2007<br> Сертификат соответствия <br>№СДС.Э.СМК 000850-12 от 30.11.2012"<br><br> </div> </div> </div> <div class="labelBottomRight" id="pics"> %glPic%<br> <img style="" alt="var img" src="img/EAC.png"></img><br> <img style="" alt="var img" src="img/cir.png"></img><br> </div> </div>';

/*<div class="label">
	<div class="labelTop">
		<div class="labelTopProductNum">
			<span style="font-size:72px"><b>%id%</b></span><br>
			<span>номер продукта</span>
		</div>
		<div class="labelTopForm">
			<span style="font-size:56px"><b>%form%</b></span><br>
			<span>номер формы</span>
		</div>	
	</div>	
	<div class="labelBottomLeft">
		<img style="-moz-transform : rotate(-90deg); margin-top:1.8cm; margin-left:-1.2cm;" alt="Barcode-Result" src="/../barcode.php?print=1&code=11111123334444&scale=2&mode=png&encoding=128&random=50027175"></img><br>
		<img style="margin-top:3cm;margin-left:-1cm;" alt="3 icons" src="img/3icon.jpg"></img>
	</div>	
	<div class="labelBottomCenter">
		<div class="labelProductName">
			<span  class="title"><b>%sName%</b></span><br>
			<span  style="font-size:20px">%fullName%</span>
		</div>
		<div class="labelProductDetails">
			<b>%target%</b><br>
			<div class="sto">%iso%</div><br>
			Цвет стекла: <span class="mediumFont">%color%</span><br>
			Количество изделий в ряду <span class="mediumFont">%rowCount%</span><br>
			В паллете <span class="mediumFont">%count%</span><br>
			Номер м/линии <span class="mediumFont">%line%</span><br>
			Тип упаковки:<span style="font-size:1.5em"><b>%boxing%</b></span><br>
			Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х%h%</b></span><br>
			Процесс: <b>%proc%</b><br>
			%sap%
		</div>	
		<div class="labelPalletDate">
			<img style="-moz-transform:scale(1,0.5);margin-top:-20px;margin-bottom:-20px;" alt="Barcode-Result" src="/../barcode.php?print=1&code=11111123334444&scale=2&mode=png&encoding=128&random=50027175"></img><br>
			<span style="font-size:36px">%date%</span><br>
			<span>дата</span><br>
			<span style="font-size:56px">%pn%</span><br>
			<span>номер паллета</span>
		</div>
		<hr>
		<div>
			<div class="address">
				<b><span style="font-size:14px;">ЗАО "Рузаевский Стекольный Завод"</span><br></b>
				Республика Мордовия, г. Рузаевка,<br>
				ул. Станиславского, д. 22<br>
				Телефон: (83451) 9-42-01<br>
				E-mail: info@ruzsteklo.ru
			</div>
			<img style="display:inline-block;padding-left:0.5cm;padding-right:0.5cm" alt="" src="img/rsz.png"></img>
			<div class="iso">
				ГОСТ Р ИСО 9001-2008, ГОСТ Р ИСО 22000-2007,<br>
				ГОСТ Р ИСО 14001-2007<br>
				Сертификат соответствия <br>№СДС.Э.СМК 000850-12 от 30.11.2012"<br><br>
			</div>
		</div>
	</div>
	<div class="labelBottomRight" id="pics">
		%glPic%<br>
		<img style="" alt="var img" src="img/EAC.png"></img><br>
		<img style="" alt="var img" src="img/cir.png"></img><br>
	</div>
</div>';*/
/*СТО 99982965-001-2008 ГОСТ 
SAP <span class="">40006122</span><br>
			Номер производственной партии <span class="">230914</span><br>
			Срок годности <span class="">до 23.09.2015</span>*/