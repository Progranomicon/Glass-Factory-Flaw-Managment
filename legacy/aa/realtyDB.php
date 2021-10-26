<?php 
	require "conn.php";
	date_default_timezone_set('Europe/Moscow');	
	if(isset($_GET['action'])){
		if($_GET['action']=="load"){
			$q="SELECT * FROM realty where state='3'";
			$res=mysql_query($q);
			echo "{";
			while($row=mysql_fetch_assoc($res)){
				echo '"'.$row['id'].'":{"type":"'.$row['objectType'].'", "S":"'.$row['s'].'", "address":"'.$row['address'].'","phone":"'.$row['phone'].'","price":"'.$row['price'].'"},';
			}
			echo '"result":{"state":"ok"}}';
		}
	}
?>