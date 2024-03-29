<?php 
	session_start();
	date_default_timezone_set('Europe/Moscow');
	include '../conn.php';
	include '../tools.php';
	include 'SFM.php';
	include 'manual_flaw.php';
	include 'molds.php';
	include 'line.php';
	
	$messages = array();
	$lineState = array();
	$lineState = getLineState();
	
	if(isset($_GET['task'])){
		if($_GET['task']=='acceptFlaw'){
			acceptFlaw($_GET['id']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='mount'){
			mountMold($_GET['mold'],$_GET['section'],$_GET['position']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='mountSFM'){
			mountSFM($_GET['mold'],$_GET['section'],$_GET['position'],$_GET['type']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='unmountSFM'){
			removeFromCellSFM($_GET['id'], $_GET['type']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='unmount'){
			removeMold($_GET['id']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='addFlaw'){
			addFlaw($_GET['flaw_type'], $_GET['flaw_part'], $_GET['action'], $_GET['comment'], $_GET['parameter_value'], $_GET['moldsList'], $_GET['flaw_author']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='addComment'){
		
			addComment($_GET['flawId'], $_GET['commentText']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='closeFlaw'){
			closeFlaw($_GET['id']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='addMIFlaw'){
			addManualFlaw($_GET['flaw_type'], $_GET['flaw_part'], $_GET['inspection_type']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='closeMIFlaw'){
			closeManualFlaw($_GET['id']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='setNewProduction') {
			setNewProduction($_GET['id'], $_GET['kis'], $_GET['molds']);
			$lineState = getLineState();
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='setCurrentLine'){
			setCurrentLine($_GET['line']);
			$lineState = getLineState();
		}
		if ($_GET['task']=='closeProduction') {
			$closingProductionId = $lineState['currentProductionRecId'];
			closeProduction();
			dumpLineState($closingProductionId);
		}
		if ($_GET['task']=='unmountAllMolds') {
			unmountAllMolds();
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='unmountAllSFM') {
			unmountAllSFM();
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='removeAllFlaw') {
			removeAllFlaw();
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='addCorrectiveAction') {
			addCorrectiveAction($_GET['action'],$_GET['corrective_comment'], $_GET['flawId']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='addDowntime') {
			addDowntime($_GET['dReason'], $_GET['date_start'], $_GET['date_end'], $_GET['comment']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if ($_GET['task']=='kashigo') {
			dumpLineState($lineState['currentProductionRecId']);
		}
	}
	function getW(){
		$r = '"weights":"error"';
		$res = mysql_query("SELECT weight, p.minValue, p.maxValue FROM factory.weights w
								left join factory.production_on_lines pol on w.POL_id = pol.id 
								left join factory.format_passport_params p on pol.production_id = p.productionId and p.paramId = 58
								where pol.line = 1  
								ORDER BY `date` DESC LIMIT 0, 4");
				if($res){
						$delim =" &nbsp &nbsp &nbsp";
						$r = '"weights":" (';
						$minVal = 0;
						$maxVal = 10000;
						while($row = mysql_fetch_assoc($res)){
							$minVal = intval($row['minValue']);
							$maxVal = intval($row['maxValue']);
							if (intval($row['weight'])<$minVal or intval($row['weight'])>$maxVal){ 
								$r .= "<span class=blinkred-2>".$row['weight']."g.</span>".$delim;
							}else{
								$r .= $row['weight']."g. ".$delim;
							}
							//$delim = " g. &nbsp &nbsp &nbsp";
						}
						$r .= ' ('.$minVal.' - '.$maxVal.'g.)"';
				}else echo $res;
		echo $r;
	}
	function printAnswer(){
		global $messages;
		global $lineState;
		
		echo '{';
		echo '"data":{';
		echo '"currentProduction":{"id":"'.$lineState['currentProduction'].'"},';
		echo '"currentLine":"'.$_SESSION['currentLine'].'",';
		echo getCurrentLineState();
		echo '},';
		echo getW();
		echo ',"info":{';
		echo '"messages":[';
		$delim = '';
		foreach($messages as $message){
			echo $delim.'"'.$message.'"';
			$delim = ', ';
		}
		echo '], "serverTime":"'.serverTime().'"}}';
	}
	printAnswer();
?>