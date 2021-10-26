<?php
	
	function mountSFM($mold, $section, $position, $type){
		global $messages;
		global $lineState;
		$tableName = "";
		$object = "";
		if($type == 'rings') {
			$tableName = 'rings';
			$object = "Кольцо";
		}else {
			$tableName = 'rough_molds';
			$object = "Черновая форма";
		}
		$InCellId = checkInCellSFM($section, $position, $type);
		if($InCellId > 0){
			removeFromCellSFM($InCellId, $type);
		}
		$query = "INSERT INTO `" . $tableName . "`(`POL_id`, `date_start`, `number`, `section`, `position`) VALUES ('".$lineState['currentProductionRecId']."', NOW(), '".$mold."', '".$section."', '".$position."')";
		$res=mysql_query($query);
		if (mysql_affected_rows()==1){
			$messages[] = $object . ' '.$mold.' установлен(-a)';
		}else{
			$messages[] = 'Ошибка при установке: ' . $object;
		}
	}
	function removeFromCellSFM($id, $type){
		global $messages;
		$tableName = "";
		$object = "";
		if($type == 'rings') {
			$tableName = 'rings';
			$object = "Кольцо";
		}else {
			$tableName = 'rough_molds';
			$object = "Черновая форма";
		}
		$query = "UPDATE `" . $tableName . "` SET `date_end`= NOW() WHERE `id`='".$id."'";
		$res=mysql_query($query);
		if ($res){
			$messages[] = 'Снято: ' . $object;
		}else{
			$messages[] = 'Ошибка при снятии';
		}
	}
	function checkInCellSFM($sec, $pos, $type){
		global $messages;
		global $lineState;
		$tableName = "";
		if($type == 'rings') $tableName = 'rings';
		else $tableName = 'rough_molds';
		$query = "SELECT * FROM `" . $tableName . "` WHERE `POL_id` = '".$lineState['currentProductionRecId']."' AND `section`='".$sec."' AND `position`='".$pos."' AND date_end IS NULL";
		$res = mysql_query($query);
		$moldId = mysql_fetch_assoc($res);
		if(mysql_num_rows($res)>0 ) return $moldId['id'];
		else return 0;
	}
	function getUsedSFMMolds($periodId){
		$molds = array();
		$query = "SELECT * FROM `rough_molds` WHERE `POL_id`='".$periodId."' AND `date_end` IS NULL";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			$molds[] = $row['id'];
		}
		return $molds;
	}
	function getUsedRings($periodId){
		$rings = array();
		$query = "SELECT * FROM `rings` WHERE `POL_id`='".$periodId."' AND `date_end` IS NULL";
		$res = mysql_query($query);
		while($row = mysql_fetch_assoc($res)){
			$rings[] = $row['id'];
		}
		return $rings;
	}
	function unmountAllSFM(){
		global $lineState;
		$mountedSFMMolds = array();
		$mountedSFMMolds = getUsedSFMMolds($lineState['currentProductionRecId']);
		if(count($mountedSFMMolds)>0){
			foreach($mountedSFMMolds as $moldId){
				removeFromCellSFM($moldId, 'rough_molds');
			}
		}
		$mountedRings = array();
		$mountedRings = getUsedRings($lineState['currentProductionRecId']);
		if(count($mountedRings)>0){
			foreach($mountedRings as $moldId){
				removeFromCellSFM($moldId, 'rings');
			}
		}
	}
?>