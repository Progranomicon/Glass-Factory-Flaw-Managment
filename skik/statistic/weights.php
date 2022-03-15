<?php
	session_start();
	include "../../conn.php";
	include $_SERVER['DOCUMENT_ROOT']."/skik/line.php";

	getWeightsStats($_GET['period'], $_GET['dateFrom'], $_GET['dateTo']);

	function getWeightsStats($period, $dateFrom, $dateTo){
		$res = mysql_query("SELECT DAY(date) as dayw, month(date) as monthw, YEAR(date) as yearw, time(date) as timew, weight FROM `weights` WHERE `POL_id`='".$period."' and (date between '".$dateFrom."' and '".$dateTo."')");
		$dates = "[";
		$weights = "[";
		$returnal = "{";
		$zpt = "";
		while($row = mysql_fetch_assoc($res)){
			$dates .= $zpt.' "'.$row['dayw'].".".$row['monthw'].".".$row['yearw']." ".$row['timew'].'"';
			$weights .= $zpt.' '.str_replace(",", ".", $row['weight']);
			$zpt = ",";
		}
		$dates.="]";
		$weights .= "]";
		$returnal .= '"dates":'.$dates. ', "weights":'.$weights.'}';
		echo $returnal;
		
	}
?>