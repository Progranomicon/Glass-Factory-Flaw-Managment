<?php 
	session_start();
	date_default_timezone_set('Europe/Moscow');
	include '../conn.php';
	include '../tools.php';
	include 'molds.php';
	include 'line.php';
	
	$messages = array();
	$lineState = array();
	$lineState = getLineState();
	
	if(isset($_GET['task'])){
		if($_GET['task']=='mountMold'){
			mountMold($_GET['mold'],$_GET['section'],$_GET['position']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='unmountMold'){
			removeMold($_GET['id']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='addFlaw'){
			addFlaw($_GET['flaw_type'], $_GET['flaw_part'], $_GET['action'], $_GET['comment'], $_GET['parameter_value'], $_GET['moldsList']);
			dumpLineState($lineState['currentProductionRecId']);
		}
		if($_GET['task']=='closeFlaw'){
			closeFlaw($_GET['id']);
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
		if ($_GET['task']=='removeAllFlaw') {
			removeAllFlaw();
			dumpLineState($lineState['currentProductionRecId']);
		}
	}
	function printAnswer(){
		global $messages;
		global $lineState;
		
		echo '{';
		echo '"data":{';
		echo '"currentProduction":{"id":"'.$lineState['currentProduction'].'"},';
		echo '"currentLine":"'.$_SESSION['currentLine'].'",';
		echo getCurrentLineState();
		echo '}, "info":{';
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