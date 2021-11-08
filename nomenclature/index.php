<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="js.js" charset=utf-8></script>
<link rel="stylesheet" type="text/css" href="css.css" >
</head>
<body>
<script>
	var SKU =[];
<?php
	require "../conn.php";
	$q='SELECT idNomenclatures, `role`, customer, fullName, internalCode, color from factory.nomenclatures WHERE DateExcluded is null';
	$r=mysql_query($q);
	//echo mysql_errno();
	//echo 'Значение r='.json_encode($r).'.';
	while ($row=mysql_fetch_assoc($r)){
		foreach($row as $key=>$value){
			if ($value==''){$row[$key]='<br>'; }
		}
		echo ' SKU.push({id:'.$row['idNomenclatures'].', role:\''.$row['role'].'\', customer:\''.$row['customer'].'\', fullName:\''.$row['fullName'].'\', color:\''.$row['color'].'\', internalCode:\''.$row['internalCode'].'\'}); '.chr(13);
	}
?>
	// function makeNextVld(){
		// for (var i in SKU){
			// if(!tools.hasOwnProperty(i)) continue;
			// SKU[i].nextValidation=nextValidation(tools[i].lastValidation, tools[i].frValidation);
		// }
	// }
	// makeNextVld();
</script>
<div id="tools">
	<div style="display:inline-block; vertical-align:top; padding-bottom:10px;">Поиск<input type="text" name="searchText"  value="" onkeyup="rendTbl();" style="width:3cm;margin-left:0.5cm" id="sFld"></div>
	<a href="javascript:;" onclick="ebi('sFld').value=''; rendTbl();"><img src="close.png" alt="Очистить" style="display:inline-block; vertical-align:top; margin-top:1px;" title="Очистить поиск"></a> <input type="button" value="Добавить" onclick="go(0);">
	<form action="toPDF.php" METHOD="POST" style="display:inline-block;"><input type="submit" value="PDF"><input type="hidden" name="pdfText" id="pdfText"> 
	&nbsp <a href="/kip/" >↑Вернуться на главную КИП</a></form>
</div>
<div id="toolsDiv">
</div>
<script>
	rendTbl();
	// function fillList(){
		// var str=document.getElementsByName("searchText")[0].value;
		// var list=ebi('toolsDiv');
		// list.innerHTML='';
		// for (var i = 0, length = tools.length; i < length; i++) {
			// if (i in tools) {
				// if(tools[i].toolName.toLowerCase().indexOf( str.toLowerCase(), 0)>=0){
					// list.innerHTML+='<a href="javascript:go(\''+ tools[i].id.toString()+'\');">'+ getPodsvet(tools[i].toolName, str)+'</a><br>';
				// }
			// }
		// }
		// if (list.innerHTML=='') list.innerHTML='Нет названий с '+str+'.';
	// }
</script> 
</body>
</html>