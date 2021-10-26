<?php
	
	function addManualFlaw($flawType, $flawPart, $inspectionType){
		global $messages;
		global $lineState;
		$query = "INSERT INTO `manual_inspection_flaw`(`POL_id`, `inspection_type`, `flaw_part`, `flaw_type`, `date_start`) VALUES ('".$lineState['currentProductionRecId']."', '".$inspectionType."', '".$flawPart."', '".$flawType."', NOW())";
		//echo $query;
		$res = mysql_query($query);
		$afRows = mysql_affected_rows();
		if ($afRows>=0){
			$messages[] = 'Брак добавлен';
		}else{
			$messages[] = 'Ошибка MySQL, код '.$afRows;
		}
	}
	function closeManualFlaw($fId){
		global $messages;
		$query = "UPDATE `manual_inspection_flaw` SET `date_end`= NOW() WHERE `id`='".$fId."'";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = 'Брак '.$fId.' закрыт';
		}else{
			$messages[] = 'Ошибка при закрытии';
		}
	}
	function getNotClosedMIFlaw(){
		global $lineState;
		$flaws = array();
		$query = "SELECT * FROM `manual_inspection_flaw` WHERE `POL_id`='".$lineState['currentProductionRecId']."' AND `date_end` IS NULL";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			$flaws[] = $row['id'];
		}
		return $flaws;
	}
	
?>