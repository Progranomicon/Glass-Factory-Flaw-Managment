<?php
include "/../conn.php";
mysql_set_charset("utf8");
if ($_GET['Format']=="") {
	echo "Нет названия формата. Не записано.";
	return 0;
}
if ($_GET['CountPerPal']==""){
	echo "Нет количества бутылок. Не записано.";
	return 0;
}
if (isset($_GET['Label'])){
	$LabelText=str_replace('"', '&quot;', $_GET['Label']);
	$LabelText = str_replace("\r", '&nbsp;', $LabelText);
	$LabelText = str_replace("\n", '<br>', $LabelText);
	if ($_GET['Edit']!=""){
		$q="UPDATE productionutf8 SET format_name='".$_GET['Format']."', units_number='".$_GET['CountPerPal']."', LabelHTML='".$LabelText."', boxing='".$_GET['Boxing']."', glass_color='".$_GET['Color']."' WHERE id='".$_GET['Edit']."'";
		$exeText="изменен";
	}
	else{
		$q="INSERT INTO productionutf8(format_name, units_number, IsDeleted, LabelHTML, boxing, glass_color, gost) VALUES ('".$_GET['Format']."','".$_GET['CountPerPal']."', 0,'".$LabelText."','".$_GET['Boxing']."','".$_GET['Color']."','".$_GET['Gost']."')";
		$exeText="создан";
	}
	$Res=mysql_query($q); 
	if($Res>0) echo "Удачно ".$exeText.": ".$_GET['Format'].". (".intval($Res).")";
	else echo "Не ".$exeText.". Ошибка MySQL.(".$Res.")";
	//echo $q;
}
else echo "Не записано. Почему-то не переданы данные.";
//echo "Записано: ".$_GET['Format'];
?>