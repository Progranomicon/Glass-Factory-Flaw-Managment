<?php 
	session_start();
	date_default_timezone_set("Europe/Moscow");
	require_once "../../conn.php";
	mysql_set_charset("utf8");
	if (isset($_GET['getMolds'])){
		$q="SELECT * FROM `molds` WHERE POL_id='".$_GET["periodId"]."'";
		$res=mysql_query($q);
		$reportData = array();
		while($row=mysql_fetch_assoc($res)){
			if(!isset($reportData[$row['mold']])) $reportData[$row['mold']] = array(); 
		}
		
		if (mysql_num_rows($res)>0) echo '{"result":{"status":"ok"}';
		else echo '{"result":{"status":"fail", "reason":"No rows", "mysql_query":"'.$q.'"}';
		while($row=mysql_fetch_assoc($res)){
			echo ', "'.$row['id'].'":{"date_time":"'.$row['date_time'].'","production_id":"'.$row['production_id'].'","forms":"'.$row['forms'].'","kis":"'.$row['kis'].'"}';
		}
		echo "}";
	}
?>