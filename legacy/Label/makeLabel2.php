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
<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="label.js" charset=utf-8></script>
<style type="text/css">
.popupDateSel{
	top:120px;
	left:500px;
	position:absolute;
	border-radius:5px;
	box-shadow: 7px 7px 5px rgba(0,0,0,0.6);
	background-color:white;
	border:1px solid gray;
	padding:5px;
	font-family: Verdana, Helvetica, sans-serif;
	vertical-align:top;
	z-index:250;
	background-color:white;
}
.selsel{
	display:inline-block;
	padding:3px;
	margin:3px;
	border:1px dotted #bbb;
	cursor:pointer;
	color:blue;
	font-family:Helvetica;
}
.selsel:hover{

	border:1px solid #000;
	background-color:#bbb;
}
#vldDate{
	font-family:Helvetica;
	font-size:2em;
}
</style>
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
		<br><br><br>Количество: начиная с № <input Style="width:2cm;" type="text" name="fromText" Value="3" > следующие <input Style="width:2cm;" type="text" name="countText" Value="3" > шт. <input id="ml" type="button" Value="Сделать этикетки" disabled onclick="makeLabels()">
		<input type="hidden" name="idText" Value="">
		<span style="font-size:1.5em; color:green; padding-left:150px;"><a href="/../index.php">←Назад в меню</a></span>
	</form><div style="position:absolute; left:18.5cm;top:0cm;">
	<div id="input">Начните вводить часть названия:<br> <input Style="width:5cm;" type="text" name="searchText" onkeyup="fillList()"></div>
	<div id="elFormatos"></div>
	</div>
	
</div>
<div id="labels"></div>
<div id="back" class="goBack" style="cursor:pointer;"><span onclick="goBack()" >← Назад</span></div>
<div id="popup" class="popupDateSel" style="display:none;">
	<input type="hidden" id="dDay" value="">
	<input type="hidden" id="dMonth" value="">
	<input type="hidden" id="dYear" value="">
	<div style="float:right;"><a href="javascript:function e(){ebi('popup').style.display='none';}; e();">X</a></div>
<?php 
	echo 'Выбор даты. <br><div style="display:block; width:200px;float:left;border:1px solid #aaa;padding:3px;margin:3px">Число<br>';
	for ($i=1;$i<32;$i++){
		echo '<div class="selsel" onclick="applyValue(\'dDay\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div>';
	echo '<div style="display:block;width:100px;float:left;border:1px solid #aaa;padding:3px;margin:3px">Месяц<br>';
	for ($i=1;$i<13;$i++){
		echo '<div class="selsel" onclick="applyValue(\'dMonth\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div>';
	echo '<div style="display:block;width:200px;float:left;border:1px solid #aaa; padding:3px;margin:3px">Год<br>';
	for ($i=2011;$i<2031;$i++){
		echo '<div class="selsel" onclick="javascript:applyValue(\'dYear\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div><br>';
	?>
	<p style="text-align:center;margin-top:1em;"><input type="button" onclick="ebi('popup').style.display='none';" value="Закрыть" style="display:inline-block;"></p>
</div>
<script type="text/javascript">
	moment.lang("ru");
	setLine(1);
	fillList();
</script> 
</body>
</HTML>
