<?php 
	session_start();
	include '../../conn.php';
	if(isset($_GET['task'])){
		if($_GET['task']='checkDB'){
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
							ON t1.id=t2.move_id WHERE t1.POL_id='26' ORDER BY t1.id, t2.id";
			$res = mysql_query($query);
			//$messages[] = "Количество строк: ".mysql_num_rows($res);
			if($res){
				while($stateRow = mysql_fetch_assoc($res)){
					addCellToState($state, $stateRow, false);
				}
			}
			printState($state);
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
	function printState($state){
		foreach($state as $pos=>$posArray){
			foreach($posArray as $sec=>$secArray){
				echo '<div style="padding-left:50px">pos:'.$pos.', sec:'.$sec.'</div>';
				foreach($secArray as $moldId=>$moldArray){
					if(!$moldArray['date_end']) $date_end = 'now';
					else $date_end = $moldArray['date_end'];
					echo '<div style="padding-left:100px">Mold '.$moldArray['mold'].'('.$moldId.'), '.$moldArray['date_start'].'-'.$date_end.'</div>';
					foreach($moldArray['flaw'] as $flawId=>$flawUnit){
						if($flawUnit['date_end']==NULL){
							$date_end = 'now';
							$bColor = 'green';
						}
						else{ 
							$date_end = $flawUnit['date_end'];
							$bColor = 'grey';
						}
						echo '<div style="padding-left:150px;background-color:'.$bColor.'">'.$flawUnit['date_start'].'-'.$date_end.'</div>';
						
					}
				}
			}
		}
	}
?>