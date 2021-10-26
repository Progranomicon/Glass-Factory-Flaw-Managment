<?php
	function closeProduction(){
		global $messages;
		global $lineState;
		
		unmountAllMolds();
		$query = "UPDATE production_on_lines SET `date_end`=NOW() WHERE `id`='".$lineState['currentProductionRecId']."'";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = 'Продукция снята';
			$lineState['currentProductionRecId'] = '';
			$lineState['currentProduction'] = '';
		}else{
			$messages[] = 'Ошибка';
		}
	}
	function setNewProduction($id, $kis, $molds){
		global $messages;
		$query = "INSERT INTO production_on_lines(`production_id`, `line`, `date_start`, `kis`, `molds`)
										  VALUES ('".$id."', '".$_SESSION['currentLine']."', NOW(), '".$kis."', '".$molds."')";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = 'Продукция '.$id.' установлена';
		}else{
			$messages[] = 'Ошибка';
		} 
	}
	function setCurrentLine($line){
		global $messages;
		$_SESSION['currentLine'] = $line;
		$messages[] = 'Линия установлена: ' . $_SESSION['currentLine'];
	}
	function getCurrentLineState(){
		global $lineState;
		if($lineState['currentProductionRecId']==''){
			return '"lineState":{}';
		}
		return file_get_contents('states/'.$lineState['currentProductionRecId'].'short.json');
	}
	function dumpLineState($periodId){
		global $messages;
		$state = array();
		$fullState = array();
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
		//$messages[] = "Количество строк: ".mysql_num_rows($res);
		if($res){
			while($stateRow = mysql_fetch_assoc($res)){
				addCellToState($state, $stateRow, false);
			}
			$fp = fopen('states/'.$periodId.'short.json', 'w');
			$wr = fwrite($fp, '"lineState":'.json_encode($state));
			fclose($fp);
			
			/*$fp = fopen('states/'.$periodId.'full.json', 'w');
			$wr = fwrite($fp, '"lineState":'.json_encode($fullState));
			fclose($fp);*/
		}
		else{
			$messages[] = "Ошибка кэширования";
		}
	}
	function dumpFullState($periodId){
			$state = array();
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
							ON t1.id=t2.move_id WHERE t1.POL_id='".$periodId."' ORDER BY t1.id, t2.id";
			$res = mysql_query($query);
			//$messages[] = "Количество строк: ".mysql_num_rows($res);
			if($res){
				while($stateRow = mysql_fetch_assoc($res)){
					addCellToFullState($state, $stateRow, false);
				}
			}
		$fp = fopen('states/'.$periodId.'full.json', 'w');
		$wr = fwrite($fp, '"lineState":'.json_encode($state));
		fclose($fp);
	}
	function addCellToFullState(&$stateArray, $cell, $setEndDate){
		$sec = $cell['section'];
		$pos = $cell['position'];
		$mold = $cell['mold'];
		$moldRecId = $cell['move_id'];
		$flawRecId = $cell['id'];
		if(!isset($stateArray[$sec])) $stateArray[$sec]=array();
		if(!isset($stateArray[$sec][$pos])) $stateArray[$sec][$pos]=array();
		if(!isset($stateArray[$sec][$pos][$moldRecId])) $stateArray[$sec][$pos][$moldRecId]=array();
		
		$stateArray[$sec][$pos][$moldRecId]['mold'] = $mold;
		$stateArray[$sec][$pos][$moldRecId]['date_start'] = $cell['mold_date_start'];
		$stateArray[$sec][$pos][$moldRecId]['date_end'] = $cell['mold_date_end'];
		if(!isset($stateArray[$sec][$pos][$moldRecId]['flaw'])) $stateArray[$sec][$pos][$moldRecId]['flaw'] = array();
		if ($flawRecId!== NULL){
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId] = array();
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['action'] = $cell['action'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['flaw_part'] = $cell['flaw_part'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['flaw_type'] = $cell['flaw_type'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['parameter_value'] = $cell['parameter_value'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['date_start'] = $cell['date_start'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['date_end'] = $cell['date_end'];
				$stateArray[$sec][$pos][$moldRecId]['flaw'][$flawRecId]['comment'] = $cell['comment'];
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
		
		$stateArray[$sec][$pos]['mold'] = $mold;
		$stateArray[$sec][$pos]['moldRecId'] = $moldRecId;
		if(!isset($stateArray[$sec][$pos]['flaw'])) $stateArray[$sec][$pos]['flaw'] = array();
		if ($flawRecId!== NULL){
			if($cell['date_end']===NULL){
				$stateArray[$sec][$pos]['flaw'][$flawRecId] = array();
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['action'] = $cell['action'];
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['flaw_part'] = $cell['flaw_part'];
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['flaw_type'] = $cell['flaw_type'];
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['parameter_value'] = $cell['parameter_value'];
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['date_start'] = $cell['date_start'];
				$stateArray[$sec][$pos]['flaw'][$flawRecId]['comment'] = $cell['comment'];
			}
		}
	}
	function initMoldOnLine(&$arr, $row){
		$sec = $cell['section'];
		$pos = $cell['position'];
		$mold = $cell['mold'];
		$moldRecId = $cell['move_id'];
		$flawRecId = $cell['id'];
		if(!isset($stateArray[$sec])) $stateArray[$sec]=array();
		if(!isset($stateArray[$sec][$pos])) $stateArray[$sec][$pos]=array();
		$stateArray[$sec][$pos]['mold'] = $mold;
		$stateArray[$sec][$pos]['moldRecId'] = $moldRecId;
	}
	function getLineState(){
		global $messages;
		global $lineState;
		$lineState = array();
		if (isset($_SESSION['currentLine'])){
			$query = "SELECT * FROM production_on_lines WHERE line='".$_SESSION['currentLine']."' AND date_end IS NULL";
			$res=mysql_query($query);
			if($res){
				$prodRow = mysql_fetch_assoc($res);
				$lineState['currentProduction'] = $prodRow['production_id'];
				$lineState['currentProductionRecId'] = $prodRow['id'];
				$lineState['currentProductionFrom'] =  $prodRow['date_start'];
			}else{
				$lineState['currentProduction'] = '';
				$lineState['currentProductionRecId'] = '';
			}
		}else{
			$lineState['currentProduction'] = '';
			$lineState['currentProductionRecId'] = '';
			$lineState['currentProductionFrom'] =  '';
		}
		return $lineState;
	}
	function unmountAllMolds(){
		global $lineState;
		$mountedMolds = array();
		$mountedMolds = getUsedMolds($lineState['currentProductionRecId']);
		if(count($mountedMolds)>0){
			foreach($mountedMolds as $moldId){
				removeMold($moldId);
			}
		}
	}
	
?>