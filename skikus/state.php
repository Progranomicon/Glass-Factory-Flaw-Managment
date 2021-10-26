<?php
	session_start();
	if (isset($_GET['getState'])){
		$_SESSION['line'] = $_GET['line'];
		getState($_SESSION['line']);
		return;
	}
	if(isset($_GET['startProduction'])){
		
	}
	
	function getState($line){
		getCurrentProductionId($line);
		getState();
		
	}
	function getProductionId($line){
		$query = "SELECT * FROM `production_on_lines` WHERE `line`='".$line."' AND `date_end` = NULL";
		$res=mysql_query($query);
		if (mysql_num_rows($res)>0){
			while($row=mysql_fetch_assoc($res)){
				$_SESSION['currentProductionId'] = $row['id'];
			}
		}else{
			unset($_SESSION['currentProductionId']);
		}
	}
	function getState($line){
		if(!isset($_SESSION['currentProductionId']))
		echo '{"data":["currentProduction":"'.$_SESSION['currentProductionId'].'"]';
	}
?>