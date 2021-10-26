<?php 
	function mountMold($mold, $section, $position){
		global $messages;
		global $lineState;
		$moldInCellId = checkMoldInCell($section, $position);
		if($moldInCellId>0){
			removeMold($moldInCellId);
		}
		$query = "INSERT INTO molds(`POL_id`, `date_start`, `mold`, `section`, `position`) VALUES ('".$lineState['currentProductionRecId']."', NOW(), '".$mold."', '".$section."', '".$position."')";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = 'Форма '.$mold.' установлена';
		}else{
			$messages[] = 'Ошибка при установке формы';
		}
	}
	function removeMold($id){
		global $messages;
		$flawList = getNotClosedFlawListByMoldId($id);
		if(count($flawList)>0){
			foreach($flawList as $flawId){
				closeFlaw($flawId);
			}
		}
		$query = "UPDATE molds SET `date_end`= NOW() WHERE `id`='".$id."'";
		$res=mysql_query($query);
		if ($res){
			$messages[] = 'Форма снята';
		}else{
			$messages[] = 'Ошибкась при снятии';
		}
	}
	function addFlaw($fType, $fPart, $fAction, $comment, $parameterValue, $moldsList){
		global $messages;
		$moldsArray = explode(",", $moldsList);
		$query = "INSERT INTO flaw(`move_id`, `flaw_type`, `flaw_part`, `parameter_value`, `action`, `comment`, `date_start`) VALUES ";
		$delim = "";
		foreach($moldsArray as $mold){
		$query .= $delim."('".$mold."', '".$fType."', '".$fPart."', '".$parameterValue."', '".$fAction."', '".$comment."', NOW())";
			$delim = ", ";
		}
		//echo $query;
		$res = mysql_query($query);
		$afRows = mysql_affected_rows();
		if ($afRows>=0){
			$messages[] = 'Добавлено браков: '.$afRows;
		}else{
			$messages[] = 'Ошибка MySQL, код '.$afRows;
		}
	}
	function closeFlaw($fId){
		global $messages;
		$query = "UPDATE flaw SET `date_end`= NOW() WHERE `id`='".$fId."'";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = 'Брак '.$fId.' закрыт';
		}else{
			$messages[] = 'Ошибкась при закрытии';
		}
	}
	function getNotClosedFlawListByMoldId($moldId){
		$flaws = array();
		$query = "SELECT * FROM `flaw` WHERE `move_id`='".$moldId."' AND `date_end` IS NULL";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			$flaws[] = $row['id'];
		}
		return $flaws;
	}
	function checkMoldInCell($sec, $pos){
		global $messages;
		global $lineState;
		$query = "SELECT * FROM `molds` WHERE `POL_id` = '".$lineState['currentProductionRecId']."' AND `section`='".$sec."' AND `position`='".$pos."' AND date_end IS NULL";
		$res = mysql_query($query);
		$moldId = mysql_fetch_assoc($res);
		if(mysql_num_rows($res)>0 ) return $moldId['id'];
		else return 0;
	}
	function getUsedMolds($periodId){
		$molds = array();
		$query = "SELECT * FROM `molds` WHERE `POL_id`='".$periodId."' AND `date_end` IS NULL";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			$molds[] = $row['id'];
		}
		return $molds;
	}
	function removeAllFlaw(){
		global $lineState;
		$mountedMolds = array();
		$mountedMolds = getUsedMolds($lineState['currentProductionRecId']);
		if(count($mountedMolds)) 
			foreach($mountedMolds as $moldId){
				$flawList = getNotClosedFlawListByMoldId($moldId);
				if(count($flawList)>0){
					foreach($flawList as $flawId){
						closeFlaw($flawId);
					}
				}
			}
	}
?>