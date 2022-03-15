<?php
	session_start();
	include "../../conn.php";
	include $_SERVER['DOCUMENT_ROOT']."/skik/line.php";
	$task = '';
	
	if($_GET['task']) $task = $_GET['task'];
	if ($task=='getPeriods'){
		getPeriods($_GET['production']);
	}
	if ($task=='getWeightsStats'){
		getWeightsStats($_GET['period'], $_GET['dateFrom'], $_GET['dateTo']);
	}
	if ($task=='getStats'){
		echo getStats($_GET['period']);
	}
	if ($task=='getMoldsStats'){
		echo getMoldsStats($_GET['periodId']);
	}
	if ($task=='getNewRepData'){
		echo getNewRepData($_GET['periodId']);
	}
	function getPeriods($production){
		$periods = array();
		$query = "SELECT * FROM production_on_lines WHERE `production_id` ='".$production."' ORDER BY `date_start`";
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
		$res = mysql_query("SELECT * FROM `production_on_lines` WHERE `id`='".$period."'");
		if($res){
			$row = mysql_fetch_assoc($res);
			if($row['date_end'] == NULL)  dumpFullState($period); 
		}
		$path = $_SERVER['DOCUMENT_ROOT']."/skik/states/".$period."full.json";
		if(!file_exists($path)) dumpFullState($period);
		return file_get_contents($path);
	}
	function getWeightsStats($period, $dateFrom, $dateTo){
		$res = mysql_query("SELECT DAY(date) as dayw, month(date) as monthw, YEAR(date) as yearw, time(date) as timew, weight FROM `weights` WHERE `POL_id`='".$period."' and (date between '".$dateFrom."' and '".$dateTo."')");
		$returnal = "<table border><tr><th>Момент взвешивания</th><th>Вес, г.</th></tr>";
		while($row = mysql_fetch_assoc($res)){
			$returnal .= "<tr><td>".$row['dayw'].".".$row['monthw'].".".$row['yearw']." ".$row['timew']."</td><td>".$row['weight']."</td></tr>";
		}
		$returnal .= "</table>";
		echo $returnal;
		
	}
	function getMoldsStats($periodId){
		$answer = array();
		$res = mysql_query("SELECT * FROM `molds` WHERE `POL_id`='".$periodId."'");
		while($row = mysql_fetch_assoc($res)){
			if(!isset($answer[$row['mold']])) $answer[$row['mold']] = array();
			if(!isset($answer[$row['mold']][$row['id']]))  $answer[$row['mold']][$row['id']] = array();
			$answer[$row['mold']][$row['id']]['date_start'] = $row['date_start'];
			$answer[$row['mold']][$row['id']]['date_end'] = $row['date_end'];
			$answer[$row['mold']][$row['id']]['section'] = $row['section'];
			$answer[$row['mold']][$row['id']]['position'] = $row['position'];
			$answer[$row['mold']][$row['id']]['hours'] = 0;
			
		}
		return json_encode($answer);
	}
	function getNewRepData($periodId){
		
	}
?>