<?php 
	session_start();
	ini_set('max_execution_time', 300);
	date_default_timezone_set('Europe/Moscow');
	include '../conn.php';
	
	if(isset($_GET['periodId'])){
		$a = array();
		$params = array();
		$query = "SELECT DATE_FORMAT(fd.operationDate, '%Y-%m-%d') as `date`, fd.paramRecordId, fd.val, m.mold, fp.paramId, fp.minValue, fp.maxValue FROM `format_passport_data` AS fd RIGHT OUTER JOIN `molds` AS m ON fd.mold = m.id INNER JOIN `format_passport_params` AS fp ON fd.paramRecordId = fp.id WHERE m.POL_id = '".$_GET['periodId']."' ORDER BY fd.operationDate";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			if(!isset($a[$row['date']])) $a[$row['date']] = array();
			if(!isset($a[$row['date']][$row['mold']])){
				$a[$row['date']][$row['mold']] = array();
			}
			if(!isset($a[$row['date']][$row['mold']][$row['paramId']])){
				$a[$row['date']][$row['mold']][$row['paramId']] = array();
				$a[$row['date']][$row['mold']][$row['paramId']]['summ'] = 0;
				$a[$row['date']][$row['mold']][$row['paramId']]['count'] = 0;
			}
			$a[$row['date']][$row['mold']][$row['paramId']]['summ'] += $row['val'] ;
			$a[$row['date']][$row['mold']][$row['paramId']]['count'] ++;
			if(!isset($p[$row['paramId']])) $p[$row['paramId']] = array();
			$p[$row['paramId']]['min'] = $row['minValue'];
			$p[$row['paramId']]['max'] = $row['maxValue'];
		}
		echo('{"repData":'.json_encode($a).', "params":'.json_encode($p).'}');
	}
?>