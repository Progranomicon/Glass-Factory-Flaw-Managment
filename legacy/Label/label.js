	function ebi(id){
		return document.getElementById(id);
	}
	function getPodsvet(where, what){
		var pos, how_many;
		var podsvet='No insertions. Нет вхождений';
			if (what=="") return where;
			if(where.toLowerCase().indexOf( what.toLowerCase(), 0)>=0){
				pos=where.toLowerCase().indexOf( what.toLowerCase(), 0)
				how_many=what.length;
				podsvet=where.substr(0,pos)+'<span style="color: white; background-color:blue;">'+where.substr(pos,how_many)+'</span>'+where.substr(pos+how_many,where.length);
			}
		return podsvet;
	}
	function fillList(){
		var str=document.getElementsByName("searchText")[0].value;
		var list=ebi('elFormatos');
		list.innerHTML='';
		for (var i = 0, length = Production.length; i < length; i++) {
			if (i in Production) {
				if(Production[i][1].toLowerCase().indexOf( str.toLowerCase(), 0)>=0){
					if (Production[i][5]=='зеленый') list.innerHTML+='<a style="background-color:#cfc;" onmouseover="viewLabels('+Production[i][0]+')" href="javascript:selectFormat(\''+ Production[i][0].toString()+'\');">'+ getPodsvet(Production[i][1], str)+' ('+Production[i][2]+' шт., '+Production[i][4]+')</a><br>';
					if (Production[i][5]=='коричневый') list.innerHTML+='<a style="background-color:#c93;" onmouseover="viewLabels('+Production[i][0]+')" href="javascript:selectFormat(\''+ Production[i][0].toString()+'\');">'+ getPodsvet(Production[i][1], str)+' ('+Production[i][2]+' шт., '+Production[i][4]+')</a><br>';
					else list.innerHTML+='<a onmouseover="viewLabels('+Production[i][0]+')" href="javascript:selectFormat(\''+ Production[i][0].toString()+'\');">'+ getPodsvet(Production[i][1], str)+' ('+Production[i][2]+' шт., '+Production[i][4]+')</a><br>';
				}
			}
		}
		if (list.innerHTML=='') list.innerHTML='Нет форматов с '+str+'.';
	}
	function selectArrayElem(id){
		var arrayElem = null;
			for (var i = 0, length = Production.length; i < length; i++) {
				if (i in Production) {
					if (Production[i][0]==id) arrayElem=Production[i];
				}
			}
		return arrayElem;
	}
	var xmlHttpTOs = false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	try {
	  xmlHttpTOs = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
		xmlHttpTOs = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
		xmlHttpTOs = false;
	  }
	}
	@end @*/
	if (!xmlHttpTOs && typeof XMLHttpRequest != 'undefined') {
	  xmlHttpTOs = new XMLHttpRequest();
	}
	function sendLastFo(l,c,f){
		var url = "LastFo.php?line=" + encodeURIComponent(l)+'&count='+encodeURIComponent(c)+'&format='+encodeURIComponent(f);
		xmlHttpTOs.open("GET", url, true);
		xmlHttpTOs.onreadystatechange = showResult;
		xmlHttpTOs.send(null);
	}
	function showResult(){
		if (xmlHttpTOs.readyState == 4){
			var response = xmlHttpTOs.responseText;
			//alert(response);
		}
	}
	function makeLabels(){
		var o=1;
		if (document.getElementsByName('idText')[0].value==''){
			alert('Выберите формат');
			return;
		}
		var dDate = new Date();
		var fro=document.getElementsByName('fromText')[0];
		//var myDate=addZero(dDate.getDate())+'.'+(addZero(dDate.getMonth()+1))+'.'+(dDate.getYear()-100);
		var myDate=moment(ebi("lastVld").value, ".YYYY-MM-DD");
		var id=document.getElementsByName('idText')[0].value;
		var format=selectArrayElem(id);
		var formatToBarcode = add3zeroes(format[0]);
		//alert(formatToBarcode+" "+format[0]);
		var line=document.getElementsByName('lineText')[0].value;
		if (line==10) line='0';
		var count= document.getElementsByName('countText')[0].value;
		var barcodeText=myDate.format("DDMMYY")+line+formatToBarcode;
		var comment_field="";
		if (line==0) line=10;
		ebi('form1').style.display='none';
		ebi('elFormatos').style.display='none';
		ebi('elFormat').style.display='none';
		ebi('back').style.display='block';
		ebi('labels').innerHTML="";
		if (document.getElementsByName('idText')[0].value==""){
			alert('Не выбран формат');
			return;
		}
		//var initVal = lastPalls[line-1][1];
		var initVal = document.getElementsByName('fromText')[0].value;
		var pn=myDate.format("DDMMYY");
		var vd=moment(ebi("lastVld").value, ".YYYY-MM-DD").add('y', 1).format("DD.MM.YY г.");
		//if (id!=lastPalls[line-1][2]) initVal=0;
		for (var labels=parseInt(initVal); labels<=parseInt(count)+parseInt(initVal)-1; labels++){
			curBarcodeText=barcodeText+add4Zeroes(labels);
			if (comment_field==""){
				comment_field=curBarcodeText;
			}
			ebi('labels').innerHTML+=format[3].replace(new RegExp("&quot;",'g'),'"').replace(new RegExp("%l%",'g'), line).replace(new RegExp("%N%",'g'), labels).replace(new RegExp("%date%",'g'), myDate.format("DD.MM.YY")).replace(new RegExp("11111123334444",'g'), curBarcodeText).replace(new RegExp("%pn%",'g'), pn).replace(new RegExp("%vd%",'g'), vd);
			if (o==1){
				ebi('labels').innerHTML+="<br><br>"
				o=2;
			}
			else{
				ebi('labels').innerHTML+='<span style="page-break-after: always"></span>';
				o=1;
			}
		}
		comment_field+="-"+curBarcodeText;
		add_action('soon',format[0],count,line, comment_field);
		lastPalls[line-1][1]=parseInt(count)+parseInt(fro.value);
		lastPalls[line-1][2]=format[0];
		fro.value=lastPalls[line-1][1]+parseInt(fro.value);
		sendLastFo(line, lastPalls[line-1][1], format[0]);
		viewLabels(format[0]);
	}	
	function viewLabels(id){
		var format=selectArrayElem(id);
		var color= null;
		var line = document.getElementsByName('lineText')[0].value;
		var fromN = document.getElementsByName('fromText')[0];
		
		ebi('elFormat').innerHTML=format[3].replace(new RegExp("&quot;",'g'),'"');
		var lastFormat=selectArrayElem(parseInt(lastPalls[line-1][2]));
		if (lastFormat[0]!=id) color='red; text-align:center;"> НУМЕРАЦИЯ НАЧНЕТСЯ С ЕДИНИЦЫ.<br>';
		else color='black; text-align:center;">';
		fromN.value=lastPalls[line-1][1];
		ebi('elFormat').innerHTML+='<br>'+'<p style="color:'+color+' Последний номер паллета на линии №<span style="font-style:bold;font-size:1.2em;">'+line+'</span>:'+lastPalls[line-1][1]+', Продукция: '+lastFormat[1]+'<br>';
		if (lastFormat[0]!=id){
			ebi('elFormat').innerHTML+='</p>'
			fromN.value=1;
		}
		else ebi('elFormat').innerHTML+='</p>';
	}
	function aa(){
		ebi('input').innerHTML='Начните вводить часть названия:<br><input Style="width:5cm;" type="text" name="searchText" onkeyup="fillList()">';
		ebi('elFormatos').innerHTML='';
		document.getElementsByName("searchText")[0].value='';
		document.getElementsByName('idText')[0].value='';
		fillList();
		ebi('ml').disabled=true;
		
	}
	function selectFormat(id){
		var format= selectArrayElem(id);
		document.getElementsByName('idText')[0].value=id;
		ebi('input').innerHTML='';
		ebi('elFormatos').innerHTML='<span style="color:darkblue;font-size:2em;">'+format[1]+'</span><br><a href="javascript:aa()">←Выбрать другой формат</a><br><br><div class="formInput"><input type="hidden" name="lastValidation" id="lastVld">Дата<br><span id="vldDate"></span></div><br><input type="button" value="Редактировать" onclick="r('+id+');"><br><input type="button" value="Удалить из списка" onclick="r2('+id+');">';
		ebi('ml').disabled=false;
		if(ebi("lastVld").value!=''){ 
			ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment(ebi("lastVld").value, "YYYY-MM-DD").format('D MMMM YYYY')+'</a>';
		}
		else{
			ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment().format('D MMMM YYYY')+'</a>';
			ebi("lastVld").value=moment().format("YYYY-MM-DD");
		}
	}
	function r(id){
		document.location.href='LabelWizard.php?edit='+id;
	}
	function r2(id){
		document.location.href='DelProd.php?hide='+id;
	}
	function addZero(i) {
		return (i < 10)? "0" + i: i;
	}
	function goBack(){
		ebi('form1').style.display='block';
		ebi('back').style.display='none';
		ebi('elFormatos').style.display='block';
		ebi('elFormat').style.display='block';
		ebi('labels').innerHTML="";
		//ebi('elFormat').innerHTML='<div style="border:1px dashed black;height:80%;width:100%;text-align:center; font-size:2em;"> Выберите формат из списка ></div>';
		//document.getElementsByName('idText')[0].value='';
	}
	function add4Zeroes(i) {
		if (i<10) return "000"+i;
		if (i<100) return "00"+i;
		if (i<1000) return "0"+i;
		if (i>9999) return (i+"").slice(i.length-5, i.length-1);
		return i;
	}
	function setLine(n){
		var lineNum=ebi('ln');
		var lineSelector=ebi('lineSelector');
		lineSelector.innerHTML='<div style="float:left;">Номер линии: </div>';
		for (i=1;i<11;i++){
			if (i==n){
				if (i==10)'<div class="sel"><b>Tест</b></div>';
				else lineSelector.innerHTML+='<div class="sel"><b>'+i+'</b></div>';
				lineNum.value=n;
			}
			else if (i==10) lineSelector.innerHTML+='<div class="unsel"><a href="javascript:setLine('+i+')">Tест</a></div>';
				else lineSelector.innerHTML+='<div class="unsel"><a href="javascript:setLine('+i+')">'+i+'</a></div>';
		}
		if (document.getElementsByName('idText')[0].value!=''){
			viewLabels(document.getElementsByName('idText')[0].value);
		}
	}
	function showDateSelector(){
		var el=ebi("popup");
		el.style.display='block';
		var lstVld=moment(ebi('lastVld').value,"YYYY-MM-DD");
		ebi('dDay').value = lstVld.format('DD');
		ebi('dMonth').value = lstVld.format('MM');
		ebi('dYear').value = lstVld.format('YYYY');
	}
	function applyValue(elId, val){
		ebi(elId).value=val;
		if (!checkAndPeck()){ 
			alert(ebi('dDay').value+'-'+ebi('dMonth').value+'-'+ebi('dYear').value+' :Такой даты быть не может');
			showDateSelector();
		}
		else{
			ebi('lastVld').value = ebi('dYear').value +'-'+ebi('dMonth').value+'-'+ebi('dDay').value;
			ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment(ebi("lastVld").value, "YYYY-MM-DD").format('D MMMM YYYY')+'</a>';
		}
		
	}
	function checkAndPeck(dateStr){
		var dateStr = ebi('dDay').value+'-'+ebi('dMonth').value+'-'+ebi('dYear').value;
		//alert(dateStr);
		var mmnt=moment(dateStr, 'DD-MM-YYYY');
		if (mmnt.isValid()) return true;
		else return false;
	}
	function add3zeroes(i){
	if (i<10) return "00"+i;
		if (i<100) return "0"+i;
		return i;
	}
	var xmlHttp_new_action = false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	try {
	  xmlHttp_new_action = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
		xmlHttp_new_action = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
		xmlHttp_new_action = false;
	  }
	}
	@end @*/
	if (!xmlHttp_new_action && typeof XMLHttpRequest != 'undefined') {
	  xmlHttp_new_action = new XMLHttpRequest();
	}
	function add_action(user, format, count, line, date){
		var url = "/../newAction.php?action=" + encodeURIComponent('Lbls Gen')+'&details='+encodeURIComponent('count '+count+', line '+line+', format '+format+', labels '+date);
		xmlHttp_new_action.open("GET", url, true);
		xmlHttp_new_action.onreadystatechange = process_result;
		xmlHttp_new_action.send(null);
	}
	function process_result(){
		if (xmlHttp_new_action.readyState == 4){
			var response = xmlHttp_new_action.responseText;
			//alert('ответ: '+response.toString());
		}
	 //perspertive functions	
	}