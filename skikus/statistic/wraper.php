<?php
	session_start();
	include "../../conn.php";
	include "../line.php";
	$task = '';
	if($_GET['task']) $task = $_GET['task'];
	if ($task=='getPeriods'){
		getPeriods($_GET['production']);
	}
	if ($task=='getStats'){
		echo getStats($_GET['period']);
	}
	function getPeriods($production){
		$periods = array();
		$query = "SELECT * FROM production_on_lines WHERE `production_id` ='".$production."' ORDER BY `date_start` DESC";
		$res = mysql_query($query);
		if ($res){
			while($row = mysql_fetch_assoc($res)){
				if(!isset($periods[$row['id']]) ){ 
					$periods[$row['id']] = array();
				}
				$periods[$row['id']]['line'] = $row['line'];
				$periods[$row['id']]['date_start'] = $row['date_start'];
				$periods[$row['id']]['kis'] = $row['kis'];
				$periods[$row['id']]['molds'] = $row['molds'];
				if($row['date_end']!==NULL) $periods[$row['id']]['date_end'] = $row['date_end'];
				else { 
					$periods[$row['id']]['date_end']  = date("Y-m-d H:i:s"); // use serverTime
				}
			}
			//echo ("Начало<br>");
			echo json_encode($periods);
		}else{
			 echo '{"1":{"line":"0", "date_start":"1900-01-01 00:00:00", "kis":"1", "molds":"1", "date_end":"1900-01-01 00:00:01"}}';
		}
		
	}
	function getStats($period){
		$path = "states/".$period."full.json";
		if(!file_exists($path)) dumpFullState($period);
		return file_get_contents($path);
	}
?>