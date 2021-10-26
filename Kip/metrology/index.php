<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="js.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
<link rel="stylesheet" type="text/css" href="css.css" >
</head>
<body>
<script>
	var tools =[];
<?php
	require "connect.php";
	$q='SELECT * from metrology WHERE isDeleted!=1 ORDER BY validationOrg';
	$r=mysql_query($q);
	while ($row=mysql_fetch_assoc($r)){
		foreach($row as $key=>$value){
			if ($value==''){$row[$key]='<br>'; }
		}
		echo ' tools.push({id:'.$row['id'].', toolName:\''.$row['toolName'].'\', sn:\''.$row['sn'].'\', toolType:\''.$row['toolType'].'\', accClass:\''.$row['accClass'].'\', mRange:\''.$row['mRange'].'\', frValidation:\''.$row['frValidation'].'\', lastValidation:\''.$row['lastValidation'].'\', validationOrg:\''.$row['validationOrg'].'\'}); '.chr(13);
	}
?>
	function makeNextVld(){
		for (var i in tools){
			if(!tools.hasOwnProperty(i)) continue;
			tools[i].nextValidation=nextValidation(tools[i].lastValidation, tools[i].frValidation);
		}
	}
	makeNextVld();
</script>
<div id="tools">
	<div style="display:inline-block; vertical-align:top; padding-bottom:10px;">Поиск<input type="text" name="searchText"  value="" onkeyup="rendTbl();" style="width:3cm;margin-left:0.5cm" id="sFld"></div>
	<a href="javascript:;" onclick="ebi('sFld').value=''; rendTbl();"><img src="close.png" alt="Очистить" style="display:inline-block; vertical-align:top; margin-top:1px;" title="Очистить поиск"></a> <input type="button" value="Добавить" onclick="go(0);">
	<form action="toPDF.php" METHOD="POST" style="display:inline-block;"><input type="submit" value="PDF"><input type="hidden" name="pdfText" id="pdfText"> 
	Просрочено :<span class="titleItem" id="overTime" style="color:#ff7040" onclick="rendTbl(2);"></span> Осталось меньше мес.: <span class="titleItem" id="nearTime" style="color:#ffD940" onclick="rendTbl(1);"></span>  <span class="titleItem" id="showAll" style="color:#0f0; display:none;" onclick="rendTbl(0);">Вернуть весь список</span>
	&nbsp <a href="/kip/" >↑Вернуться на главную КИП</a></form>
</div>
<div id="toolsDiv">
</div>
<script>
	moment.lang("ru");
	rendTbl();
	function fillList(){
		var str=document.getElementsByName("searchText")[0].value;
		var list=ebi('toolsDiv');
		list.innerHTML='';
		for (var i = 0, length = tools.length; i < length; i++) {
			if (i in tools) {
				if(tools[i].toolName.toLowerCase().indexOf( str.toLowerCase(), 0)>=0){
					list.innerHTML+='<a href="javascript:go(\''+ tools[i].id.toString()+'\');">'+ getPodsvet(tools[i].toolName, str)+'</a><br>';
				}
			}
		}
		if (list.innerHTML=='') list.innerHTML='Нет названий с '+str+'.';
	}
</script> 
</body>
</html>