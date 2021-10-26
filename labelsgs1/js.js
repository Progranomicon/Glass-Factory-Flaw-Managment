var tableAssets={};
var lastNums={};
var excelProduction;
var ssccCodes;
var currentProduct;
var line=1;
var freemode = false;

var difName= false;
var difWarning='<br><span style="color:red">Другое название продукции. Нумерация начнется с единицы.</span>';
var debug = false;
var number;
var date;

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


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
	
function getLastNums(){
	//alert("запр отпр");
	$.ajax('Table.php',{type:"GET", data:{getLastNums:"yes"},success:function(answer){
		//alert (answer);
		lastNums=$.parseJSON(answer);
		bottles.off();
	}, error:error_handler});
}	
function setLastNum(){
	$.ajax('Table.php',{type:"GET", data:{setLastNum:"yes", line:line, newName:excelProduction[currentProduct].fullName,newNum:number},success:function(answer){
		//log (answer);
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
		//alert(answer);
		answerObj=$.parseJSON(answer);
		excelProduction=answerObj.production;
		merge();
		if(answerObj.isFileCopied=="yes") toast("Файл скопирован с паблика");
		else  toast("Файл НЕ скопирован с паблика", "#FFF","#F00");
		getLastNums();
	}, error:error_handler});
}
function getSSCCArray(f, t){
	
	bottles.on("Генерация SSCC кодов");
	$.ajax('getSSCCArray.php',{type:"GET", data:{startNum:f, endNum:t},success:function(answer){
		//alert(answer);
		answerObj=$.parseJSON(answer);
		ssccCodes=answerObj.codes;
		console.log(ssccCodes);
		toast("SSCC коды получены");
		bottles.off();
	}, error:error_handler});
}
function merge(){

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
	if(freemode) date = date = prompt("Введите дату в формате ДДММГГ (слитно, например 250516)");
	else date = moment().format('DDMMYY');
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
	if (freemode) el('numStart').innerHTML += '<br><span style="color:blue">СВОБОДНЫЙ РЕЖИМ</span>'
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
	
	ebola=labelPattern.replace(new RegExp("%id%",'g'),excelProduction[code].code).replace(new RegExp("%proc%",'g'),excelProduction[code].proc).replace(new RegExp("%fullName%",'g'),excelProduction[code].fullName).replace(new RegExp("%sName%",'g'),titleHtml).replace(new RegExp("%form%",'g'),excelProduction[code].form).replace(new RegExp("%iso%",'g'),iso).replace(new RegExp("%h%",'g'),excelProduction[code].h).replace(new RegExp("%h%",'g'),excelProduction[code].h).replace(new RegExp("%boxing%",'g'),excelProduction[code].boxing).replace(new RegExp("%count%",'g'),excelProduction[code].totalUnits).replace(new RegExp("%rowCount%",'g'),(excelProduction[code].totalUnits/excelProduction[code].layers)).replace(new RegExp("%color%",'g'),getColor(excelProduction[code].color)).replace(new RegExp("%target%",'g'),excelProduction[code].target).replace(new RegExp("%sap%",'g'), getSap(code)).replace(new RegExp("%glPic%",'g'), '<img style="" alt="var img" src="img/'+excelProduction[code].color+'.png"></img>' ).replace(new RegExp("%vespaleta%",'g'),excelProduction[code].vespaleta);
	return ebola;
}
function getColor(c){
	if (c=="10") return "бесцветный";
	if (c=="20") return "зеленый";
	if (c=="30") return "коричневый";
}
function zeroinator(i) {
	return i;
	/*if (i<10) return "000"+i;
	if (i<100) return "00"+i;
	if (i<1000) return "0"+i;*/
	
}
async function generate(){
	var labels = el('labelPreview');
	var numStart;
	if (difName) numStart=1;
	else numStart=lastNums[line].lastNum*1+1;
	if (freemode) numStart = prompt(("Введите начальный номер"))*1;
	var numEnd =(el('count').value*1)+numStart;
	
	
	var tmpLabel=showPreview(currentProduct);
	//date=moment().format("DDMMYY");
	var parity=false;
	tmpLabel=tmpLabel.replace(new RegExp("%date%",'g'),moment(date, "DDMMYY").format("DD.MM.YY"));
	labels.innerHTML="";
	// генерация
	getSSCCArray(numStart, numEnd);
	await sleep(3000);
	for(var i=numStart;i<numEnd;i++){
		
		labels.innerHTML+=tmpLabel.replace(new RegExp("%line%",'g'),lines[line].name).replace(new RegExp("%pn%",'g'),zeroinator(i)).replace(new RegExp("01234567890123456789",'g'),getBarcode(i-numStart))+"<br>";
		
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
	if(excelProduction[currentProduct].gost=='ГОСТ 10782-85'){ 
		$(".labelBottomRight").empty();
		$(".labelBottomRight").html('<img  alt="rst logo" src="img/rst.png"></img>');
	}
	if(!freemode) setLastNum();
}
function getBarcode(g){
	return ssccCodes[g];
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
		result='<span class="">SAP '+excelProduction[code].sap+'</span><br>Номер производственной партии <span class="">3</span><br>Срок годности <span class="">до '+moment(date, "DDMMYY").add(1, 'years').format("DD.MM.YYYY")+' г.</span>';
	}
	return result;
}
function getTitleSize(title){
	if(title.length<10) return 50;
	else return (60-title.length);
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


//var labelPattern='<div class="label"> 			<div class="labelTop"> 				<div class="labelTopProductNum"> 					<img style="display:inline-block;padding-left:0.1cm;padding-right:0.3cm;padding-Top:0.5cm" alt="" src="img/gd.png" width="180" height="80"></img> 				</div>  				<div class="address"> 					<b><span style="font-size:18px;">ООО "Стекольная компания "РАЗВИТИЕ"</span><br><br><br><br></b>	 				</div> 			</div> 			<div class="labelBottomLeft"> 				<img class="verticalLeftBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=2&mode=png&encoding=128&random=50027175"></img><br> 				<img style="margin-top:3cm;margin-left:-1cm;" alt="3 icons" src="img/3icon.jpg"></img> 			</div>	 			<div class="labelBottomCenter"> 				<div class="labelProductName"> 					<span  class="title"><b>%sName%</b></span><br> 					<span  style="font-size:20px">%fullName%</span> 				</div> 				<div class="labelProductDetails"> 					<b>%target%</b><br> 					<div class="sto"> 						<b>ГОСТ 32131-2013</b> 					</div> 					<br> Цвет стекла: <span class="mediumFont">%color%</span><br> 					Вес паллета <span class="mediumFont">%vespaleta%</span><br> 					В паллете <span class="mediumFont">%count%</span><br> 					Номер м/линии <span class="mediumFont">%line%</span><br> 					Тип упаковки:<span style="font-size:1.5em"><b>%boxing%</b></span><br> 					Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х%h%</b></span><br> 					Процесс: <b>%proc%</b><br> 					%sap% 				</div>	 				<div class="labelPalletDate"> 					<img class="horizontalBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=1&mode=png&encoding=128&random=50027175"></img><br> 					<span style="font-size:36px">%date%</span><br> 					<span>дата</span><br> 					<span style="font-size:56px">%pn%</span><br> 					<span>номер паллета</span> 				</div> <hr> 				<div> 					<img alt="var img" src="img/ldpe.png" style="height: 43px;"> 					<img alt="var img" src="img/pap.png" style="height: 43px;"> 					<img alt="var img" src="img/cir.png" style="padding-top: 15px;border-right-style: solid;border-right-width: 0px;padding-right: 15px;"> 					<div class="address" ><span> Российская федерация</span><br> 						Республика Мордовия, г. Рузаевка,<br> ул. Станиславского, д. 22, офис 47<br> Телефон: +7 (963)147-22-62<br> 						E-mail: razvitie2019@mail.ru 					</div> 					<div class="labelBottomRight" id="pics"> 						%glPic% 						<img  alt="var img" src="img/EAC.png"></img><img  alt="var img" src="img/cir.png"></img> 					</div> 				</div> 			</div> 		</div>'; 

var labelPattern = '<div class="label"> <div class="labelTop"> <div class="labelTopProductNum"> <img style="display:inline-block;padding-left:0.1cm;padding-right:0.3cm;padding-Top:0.5cm" alt="" src="img/gd1.png" width="125" height="36"></img> </div>  <div class="address"> <b><span style="font-size:22px;">ООО "Стекольная компания "РАЗВИТИЕ"</span><br><br><br><br></b>	 </div> </div> <div class="labelBottomLeft"> <img class="verticalLeftBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=2&mode=png&encoding=128&random=50027175"></img><br> <img style="margin-top:3cm;margin-left:-1cm;" alt="3 icons" src="img/3icon.jpg"></img> </div>	 <div class="labelBottomCenter"> <div class="labelProductName"> <span  class="title"><b>%sName%</b></span><br> <span  style="font-size:20px">%fullName%</span> </div> <div class="labelProductDetails"> <b>%target%</b><br> <div class="sto"> <b>СТО 38772188-002-2020</b> </div> <br> Цвет стекла: <span class="mediumFont">%color%</span><br> Вес паллета <span class="mediumFont">%vespaleta%</span><br> В паллете <span class="mediumFont">%count%</span><br> Номер м/линии <span class="mediumFont">%line%</span><br> Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х%h%</b></span><br> Процесс: <b>%proc%</b><br> %sap% </div>	 <div class="labelPalletDate"> <img class="horizontalBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=1&mode=png&encoding=128&random=50027175"></img><br> <span style="font-size:36px">%date%</span><br> <span>дата</span><br> <span style="font-size:56px">%pn%</span><br> <span>номер паллета</span> </div> <hr> <div> <img alt="var img" src="img/ldpe.png" style="height: 43px;">  <img  alt="var img" src="img/12.png"></img>   <div class="address" ><span> Российская федерация</span><br> Республика Мордовия, г. Рузаевка,<br> ул. Станиславского, д. 22, офис 47<br> Телефон: +7 (963)147-22-62<br> E-mail: razvitie2019@mail.ru <br> Сертификат соответствия <br> ГОСТ Р ИСО 9001-2015, ГОСТ Р ИСО 22000-2019 <br> № HCC-RU-MP47-K-000193-21 от 01.07.2021 г. </div> <div class="labelBottomRight" id="pics"> %glPic% <img  alt="var img" src="img/EAC.png"></img> <img alt="var img" src="img/cir.png" style="padding-top: 15px;border-right-style: solid;border-right-width: 0px"> </div> </div> </div> </div>'; 

  /*
		<div class="label"> 
			<div class="labelTop"> 
				<div class="labelTopProductNum">
					<img style="display:inline-block;padding-left:0.1cm;padding-right:0.3cm;padding-Top:0.5cm" alt="" src="img/gd1.png" width="125" height="36"></img>
				</div>  
				<div class="address">
					<b><span style="font-size:22px;">ООО "Стекольная компания "РАЗВИТИЕ"</span><br><br><br><br></b>	
				</div>
			</div>
			<div class="labelBottomLeft"> 
				<img class="verticalLeftBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=2&mode=png&encoding=128&random=50027175"></img><br>
				<img style="margin-top:3cm;margin-left:-1cm;" alt="3 icons" src="img/3icon.jpg"></img>
			</div>	 
			<div class="labelBottomCenter">
				<div class="labelProductName"> 
					<span  class="title"><b>%sName%</b></span><br>
					<span  style="font-size:20px">%fullName%</span>
				</div>
				<div class="labelProductDetails">
					<b>%target%</b><br> 
					<div class="sto">
						<b>ГОСТ 32131-2013</b>
					</div>
					<br> Цвет стекла: <span class="mediumFont">%color%</span><br> 
					Вес паллета <span class="mediumFont">%vespaleta%</span><br> 
					В паллете <span class="mediumFont">%count%</span><br>
					Номер м/линии <span class="mediumFont">%line%</span><br>
					Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х%h%</b></span><br>
					Процесс: <b>%proc%</b><br> 
					%sap% 
				</div>	 
				<div class="labelPalletDate"> 
					<img class="horizontalBarcode" alt="Barcode-Result" src="/../barcode.php?print=1&code=01234567890123456789&scale=1&mode=png&encoding=128&random=50027175"></img><br>
					<span style="font-size:36px">%date%</span><br> 
					<span>дата</span><br>
					<span style="font-size:56px">%pn%</span><br> 
					<span>номер паллета</span> 
				</div> <hr> 
				<div> 
					<img alt="var img" src="img/ldpe.png" style="height: 43px;"> 
					<img alt="var img" src="img/pap.png" style="height: 43px;"> 
					<img  alt="var img" src="img/12.png"></img>
					
					
					<div class="address" ><span> Российская федерация</span><br> 
						Республика Мордовия, г. Рузаевка,<br> ул. Станиславского, д. 22, офис 47<br> Телефон: +7 (963)147-22-62<br>
						E-mail: razvitie2019@mail.ru 
					</div>
					<div class="labelBottomRight" id="pics"> 
						%glPic%
						<img  alt="var img" src="img/EAC.png"></img>
						<img alt="var img" src="img/cir.png" style="padding-top: 15px;border-right-style: solid;border-right-width: 0px"> 
					</div> 
				</div>
			</div> 
		</div>
  */
