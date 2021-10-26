<?php
	$date1 = $_GET['date1'];
	$date2 = $_GET['date2'];
	
	$host = "localhost";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'checkV6'; 
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
        mysql_set_charset("utf8");
	mysql_select_db($db_name);
	$summary = array();
	
	$q = "SELECT * FROM `counters` WHERE `T_Date` BETWEEN '".$date1."' AND '".$date2."'";
	//echo($q);
	$res = mysql_query($q);
	while($row = mysql_fetch_assoc($res)){
		$sensor = $row['T_Sensor'];
		$component = $row['T_NumSnr'];
		$value = $row['T_Value'];
		if(!isset($summary[$sensor])) $summary[$sensor] = array();
		if(!isset($summary[$sensor][$component])) $summary[$sensor][$component] = 0;
		$summary[$sensor][$component] += $value;
	}
	echo json_encode($summary);
?>