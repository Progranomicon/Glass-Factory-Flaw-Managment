<?php 
	require "connect.php";
	$q="SELECT * FROM RealtyObjects WHERE ID='".$_GET['id']."'";
	$RO = mysql_query($q);
	$aRows=mysql_num_rows($RO);
	if($aRows>0){
		$RetObj = mysql_fetch_assoc($RO);
		//print_r($RetObj);
		echo "<IMG align=\"center\" height=240 width=320 src=\"".$RetObj['PicPath']."\"><br>";
		echo '<div class="info_row"><div class="list_element_area"><b>Адрес </b></div><div class="list_element_address">'.$RetObj['Address'].'</div></div>';
		echo '<div class="info_row"><div class="list_element_area"><b>Подробно </b></div><div class="list_element_address">'.$RetObj['Comment'].'</div></div>';
		echo '<div class="info_row"><div class="list_element_area"><b>Телефон</b></div><div class="list_element_address">'.$RetObj['Phone'].'</div></div>';
	}
	else {
		echo "Не существующий объект (".$_GET['id']."), rows=".intval($aRows).'<br>'.$q;
	}
?>
<div id="hideFullInfoButton" onclick="hideBlock('full_obj_info');">Закрыть</div>