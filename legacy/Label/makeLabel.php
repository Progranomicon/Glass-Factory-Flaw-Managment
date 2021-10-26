<?php
date_default_timezone_set('Europe/Moscow');
session_start();
require("php-barcode.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<title>Отчеты и настройки. Штрихкоды.</title>
<link rel="stylesheet" type="text/css" href="css.css" >
</head>
<body>
<?php 
	include '/../conn.php';
	mysql_set_charset("utf8");
    print '<script type="text/javascript">';
			echo ' var Production=[];
		'; 
        $RProduction = mysql_query("SELECT * FROM productionutf8 WHERE IsDeleted!=TRUE AND LabelHTML IS NOT NULL ORDER BY id DESC");
        while ($RetProd = mysql_fetch_assoc($RProduction)) {
			echo 'Production.push([' . $RetProd['id'] . ', "' . $RetProd['format_name'] . '", "'.$RetProd['units_number'].'", "'.$RetProd['LabelHTML'].'","'.$RetProd['boxing'].'","'.$RetProd['glass_color'].'"]); '.chr(13);
        }
        mysql_free_result($RProduction);
	echo 'var lastPalls=[];
	';
    $file = fopen("lp.lp","a+");
    if ($file)
    {
        $lines_str_from_file= fread($file,3000); // читаем в строку весь файл
        fclose($file);
        $lines_data = explode("#", $lines_str_from_file);// разбиваем на массив строк разделенный "#"
        for ($m=0;$m<10;$m++) // перебираем весь массив на поиск нужной нам строки
        { 
            $single_line = explode(" ", $lines_data[$m]);
            print "lastPalls.push([".($single_line[0]).", ".($single_line[1]).", ".($single_line[2])."]);".chr(13); 
        }
    }
	echo "</script>";	
 ?>
<div id="elFormat" style="width:18cm;height:15cm;"><div style="border:1px dashed black;height:80%;width:100%;text-align:center; font-size:2em;"> Выберите формат из списка →</div></div>
<div id="labelForm" >
	
	
	<form name="form1" id="form1">
	<div id="lineSelector"></div><input type="hidden" name="lineText" id="ln"> 
		<br><br><br>Количество: начиная после № <input Style="width:2cm;" type="text" name="fromText" Value="3" > следующие <input Style="width:2cm;" type="text" name="countText" Value="3" > шт. <input id="ml" type="button" Value="Сделать этикетки" disabled onclick="makeLabels()">
		<input type="hidden" name="idText" Value="">
		<span style="font-size:1.5em; color:green; padding-left:150px;"><a href="/../index.php">←Назад в меню</a></span>
		
	</form><div style="position:absolute; left:18.5cm;top:0cm;">
	<div id="input">Начните вводить часть названия:<br> <input Style="width:5cm;" type="text" name="searchText" onkeyup="fillList()"></div>
	<div id="elFormatos"></div>
	</div>
	
</div>
<div id="labels"></div>
<div id="back" class="goBack" style="cursor:pointer;"><span onclick="goBack()" >← Назад</span></div>
<script type="text/javascript">
	setLine(1);
	fillList();

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
		var list=document.getElementById('elFormatos');
		list.innerHTML='';
		for (var i = 0, length = Production.length; i < length; i++) {
			if (i in Production) {
				if(Production[i][1].toLowerCase().indexOf( str.toLowerCase(), 0)>=0){
					if (Production[i][5]=='зеленый') list.innerHTML+='<a style="background-color:#cfc;" onmouseover="viewLabels('+Production[i][0]+')" href="javascript:selectFormat(\''+ Production[i][0].toString()+'\');">'+ getPodsvet(Production[i][1], str)+' ('+Production[i][2]+' шт., '+Production[i][4]+')</a><br>';
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
		var myDate=addZero(dDate.getDate())+'.'+(addZero(dDate.getMonth()+1))+'.'+(dDate.getYear()-100);
		var id=document.getElementsByName('idText')[0].value;
		var format=selectArrayElem(id);
		var line=document.getElementsByName('lineText')[0].value;
		if (line==10) line=0;
		var count= document.getElementsByName('countText')[0].value;
		var barcodeText=addZero(dDate.getDate())+(addZero(dDate.getMonth()+1))+(dDate.getYear()-100)+line+format[0];
		if (line==0) line=10;
		document.getElementById('form1').style.display='none';
		document.getElementById('elFormatos').style.display='none';
		document.getElementById('elFormat').style.display='none';
		document.getElementById('back').style.display='block';
		document.getElementById('labels').innerHTML="";
		//document.getElementById('elFormat').innerHTML="";
		if (document.getElementsByName('idText')[0].value==""){
			alert('Не выбран формат');
			return;
		}
		//var initVal = lastPalls[line-1][1];
		var initVal = document.getElementsByName('fromText')[0].value;
		var pn=addZero(dDate.getDate())+(addZero(dDate.getMonth()+1))+(dDate.getYear()-100);
		var vd=addZero(dDate.getDate())+'.'+(addZero(dDate.getMonth()+1))+'.'+(dDate.getYear()-99);
		//if (id!=lastPalls[line-1][2]) initVal=0;
		for (var labels=parseInt(initVal)+1; labels<=parseInt(count)+parseInt(initVal); labels++){
			curBarcodeText=barcodeText+add4Zeroes(labels);
			document.getElementById('labels').innerHTML+=format[3].replace(new RegExp("&quot;",'g'),'"').replace(new RegExp("%l%",'g'), line).replace(new RegExp("%N%",'g'), labels).replace(new RegExp("%date%",'g'), myDate).replace(new RegExp("11111123334444",'g'), curBarcodeText).replace(new RegExp("%pn%",'g'), pn).replace(new RegExp("%vd%",'g'), vd);
			if (o==1){
				document.getElementById('labels').innerHTML+="<br><br>"
				o=2;
			}
			else{
				document.getElementById('labels').innerHTML+='<span style="page-break-after: always"></span>';
				o=1;
			}
		}
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
		
		document.getElementById('elFormat').innerHTML=format[3].replace(new RegExp("&quot;",'g'),'"');
		var lastFormat=selectArrayElem(parseInt(lastPalls[line-1][2]));
		if (lastFormat[0]!=id) color='red; text-align:center;"> НУМЕРАЦИЯ НАЧНЕТСЯ С ЕДИНИЦЫ.<br>';
		else color='black; text-align:center;">';
		fromN.value=lastPalls[line-1][1];
		document.getElementById('elFormat').innerHTML+='<br>'+'<p style="color:'+color+' Последний номер паллета на линии №<span style="font-style:bold;font-size:1.2em;">'+line+'</span>:'+lastPalls[line-1][1]+', Продукция: '+lastFormat[1]+'<br>';
		if (lastFormat[0]!=id){
			document.getElementById('elFormat').innerHTML+='</p>'
			fromN.value=1;
		}
		else document.getElementById('elFormat').innerHTML+='</p>';
	}
	function aa(){
		document.getElementById('input').innerHTML='Начните вводить часть названия:<br><input Style="width:5cm;" type="text" name="searchText" onkeyup="fillList()">';
		document.getElementById('elFormatos').innerHTML='';
		document.getElementsByName("searchText")[0].value='';
		document.getElementsByName('idText')[0].value='';
		fillList();
		document.getElementById('ml').disabled=true;
		
	}
	
	function selectFormat(id){
		var format= selectArrayElem(id);
		document.getElementsByName('idText')[0].value=id;
		document.getElementById('input').innerHTML='';
		document.getElementById('elFormatos').innerHTML='<span style="color:darkblue;font-size:2em;">'+format[1]+'</span><br><a href="javascript:aa()">←Выбрать другой формат</a><br><br><input type="button" value="Редактировать" onclick="r('+id+');"><br><input type="button" value="Удалить из списка" onclick="r2('+id+');">';
		document.getElementById('ml').disabled=false;
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
		document.getElementById('form1').style.display='block';
		document.getElementById('back').style.display='none';
		document.getElementById('elFormatos').style.display='block';
		document.getElementById('elFormat').style.display='block';
		document.getElementById('labels').innerHTML="";
		//document.getElementById('elFormat').innerHTML='<div style="border:1px dashed black;height:80%;width:100%;text-align:center; font-size:2em;"> Выберите формат из списка →</div>';
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
		var lineNum=document.getElementById('ln');
		var lineSelector=document.getElementById('lineSelector');
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
	}
</script> 
</body>
</HTML>
