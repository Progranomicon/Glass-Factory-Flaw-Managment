<?php
	session_start();
	function dumpStatistic($periodId){
		global $messages;
		$stats= array();
		$query = "SELECT  t1.id AS move_id,
							t1.date_start AS mold_date_start, 
							t1.date_end AS mold_date_end,
							t1.mold,
							t1.position,
							t1.section,
							t2.id, 
							t2.date_start, 
							t2.date_end,
							t2.flaw_part,
							t2.action,							
							t2.flaw_type, 
							t2.parameter_value,
							t2.comment
						FROM molds AS t1 
						LEFT JOIN 
							 flaw AS t2 
						ON t1.id=t2.move_id WHERE t1.POL_id='".$periodId."' AND t1.date_end IS NULL ORDER BY t1.id, t2.id";
		
		$res = mysql_query($query);
		if($res){
			while($stateRow = mysql_fetch_assoc($res)){
				addCellToState($stats, $stateRow);
			}
			$fp = fopen($_SERVER['DOCUMENT_ROOT']'/skik/states/'.$periodId.'full.json', 'w');
			$wr = fwrite($fp, '"lineState":'.json_encode($state));
			fclose($fp);
		}
		else{
			$messages[] = "Ошибка кэширования";
		}
	}
	function addCellToState(&$stateArray, $cell, $setEndDate){
		$sec = $cell['section'];
		$pos = $cell['position'];
		$mold = $cell['mold'];
		$moldRecId = $cell['move_id'];
		$flawRecId = $cell['id'];
		if(!isset($stateArray[$sec])) $stateArray[$sec]=array();
		if(!isset($stateArray[$sec][$pos])) $stateArray[$sec][$pos]=array();
		if(!isset($stateArray[$sec][$pos][$moldRecId])) $stateArray[$sec][$pos][$moldRecId]=array();
		
		$stateArray[$sec][$pos][$moldRecId]['mold'] = $mold;
		if(!isset($stateArray[$sec][$pos][$moldRecId]['flaw'])) $stateArray[$sec][$pos]['flaw'] = array();
		if ($flawRecId!== NULL){
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId] = array();
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['action'] = $cell['action'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['flaw_part'] = $cell['flaw_part'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['flaw_type'] = $cell['flaw_type'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['parameter_value'] = $cell['parameter_value'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['date_start'] = $cell['date_start'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['comment'] = $cell['comment'];
			if($cell['date_end']===NULL){
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['date_end'] = serverTime();
			}else{
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['date_end'] = $cell['date_end'];
			}
		}
	}
	function serverTime(){
		return date("Y-m-d H:i:s");
	}
?>