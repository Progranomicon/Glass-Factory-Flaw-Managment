<?php 
	session_start();
	date_default_timezone_set("Europe/Moscow");
	require_once "/../conn.php";
	mysql_set_charset("utf8");
	if (isset($_GET['get_changes'])){
		$q="SELECT * FROM production_on_lines WHERE line_number='".$_GET["line_number"]."' ORDER BY server_date_time DESC LIMIT 0, 10";
		$res=mysql_query($q);
		if (mysql_num_rows($res)>0) echo '{"result":{"status":"ok"}';
		else echo '{"result":{"status":"fail", "reason":"No rows", "mysql_query":"'.$q.'"}';
		while($row=mysql_fetch_assoc($res)){
			echo ', "'.$row['id'].'":{"date_time":"'.$row['date_time'].'","production_id":"'.$row['production_id'].'","forms":"'.$row['forms'].'"}';
		}
		echo "}";
	}
	if (isset($_GET['get_defects'])){
		$q="SELECT date_time FROM production_on_lines WHERE line_number='".$_GET["line"]."' AND id>='".$_GET["id"]."' ORDER BY date_time LIMIT 0,2;";
		$res=mysql_query($q);
		if(mysql_num_rows($res)==2){
			$row=mysql_fetch_assoc($res);
			$date_start=$row['date_time'];
			$row=mysql_fetch_assoc($res);
			$date_end=$row['date_time'];
		}
		else{
			$row=mysql_fetch_assoc($res);
			$date_start=$row['date_time'];
			$date_end=date("Y-m-d H:i");
			
		}
		$q="SELECT * FROM forms_defects WHERE date_time_start BETWEEN '".$date_start."' AND '".$date_end."' AND line='".$_GET["line"]."' ORDER BY date_time_start";
		$res=mysql_query($q);
		echo '{';
		while($row=mysql_fetch_assoc($res)){
			echo '"'.$row['id'].'":{"id":"'.$row['id'].'", "date_start":"'.$row['date_time_start'].'", "date_end":"'.$row['date_time_end'].'", "flaw_part":"'.$row['flaw_part'].'", "action":"'.$row['corrective_action'].'", "form":"'.$row['form_number'].'", "type":"'.$row['defect'].'"}, ';
		}
		echo '"result":{"status":"ok", "date_start":"'.$date_start.'", "date_end":"'.$date_end.'"}}';
	}	
	if (isset($_GET['get_moves'])){
		$q="SELECT date_time FROM production_on_lines WHERE line_number='".$_GET["line"]."' AND id>='".$_GET["id"]."' ORDER BY date_time LIMIT 0,2;";
		$res=mysql_query($q);
		if(mysql_num_rows($res)==2){
			$row=mysql_fetch_assoc($res);
			$date_start=$row['date_time'];
			$row=mysql_fetch_assoc($res);
			$date_end=$row['date_time'];
		}
		else{
			$row=mysql_fetch_assoc($res);
			$date_start=$row['date_time'];
			$date_end=date("Y-m-d H:i");
			
		}
		$q="SELECT * FROM forms_moves WHERE date_time BETWEEN '".$date_start."' AND '".$date_end."' AND line='".$_GET["line"]."' ORDER BY date_time";
		$res=mysql_query($q);
		echo '{';
		while($row=mysql_fetch_assoc($res)){
			echo '"'.$row['id'].'":{"date_time":"'.$row['date_time'].'", "form":"'.$row['form_number'].'", "section":"'.$row['section'].'", "position":"'.$row['position'].'"}, ';
		}
		echo '"result":{"status":"ok", "date_start":"'.$date_start.'", "date_end":"'.$date_end.'"}}';
	}
?>