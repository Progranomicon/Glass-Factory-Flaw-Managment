<?php 
	session_start();
	
	require "../conn.php";
	require "line.php";
	function serverTime(){
		return date("Y-m-d H:i:s");
	}
	setCurrentLine(4);
	$lineState = array();
	$lineState = getLineState();
	//echo print_r(getUsedMolds($_SESSION['currentProductionRecId']));
	dumpLineState($lineState['currentProductionRecId']);
	
?>