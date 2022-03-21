<?php
	session_start();
	include "../../conn.php";
	require_once "../../PHPExcel.php";
	include $_SERVER['DOCUMENT_ROOT']."/skik/line.php";

	getWeightsStatsExcel($_GET['period'], $_GET['dateFrom'], $_GET['dateTo']);

	function getWeightsStatsExcel($period, $dateFrom, $dateTo){
		$res = mysql_query("SELECT DAY(date) as dayw, month(date) as monthw, YEAR(date) as yearw, time(date) as timew, weight FROM `weights` WHERE `POL_id`='".$period."' and (date between '".$dateFrom."' and '".$dateTo."')");
		$file = new PHPExcel();
		
		header ( "Expires: Mon, 1 Apr 1974 05:00:00 GMT" );
		header ( "Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT" );
		header ( "Cache-Control: no-cache, must-revalidate" );
		header ( "Pragma: no-cache" );
		header ( "Content-type: application/vnd.ms-excel" );
		header ( "Content-Disposition: attachment; filename=Weights.xls " );
		
		$file->setActiveSheetIndex(0); 
		$rowCount = 1; 
		$file->getActiveSheet()->SetCellValue('A'.$rowCount,'Дата');
		$file->getActiveSheet()->SetCellValue('B'.$rowCount,'Время');
		$file->getActiveSheet()->SetCellValue('C'.$rowCount,'Вес');
		
		while($row = mysql_fetch_assoc($res)){
			$rowCount++;
			$file->getActiveSheet()->SetCellValue('A'.$rowCount, $row['dayw'].".".$row['monthw'].".".$row['yearw'] );
			$file->getActiveSheet()->SetCellValue('B'.$rowCount, $row['timew']);
			$file->getActiveSheet()->SetCellValue('C'.$rowCount, str_replace(".", ",", $row['weight']));
			//$dates .= $zpt.' "'.$row['dayw'].".".$row['monthw'].".".$row['yearw']." ".$row['timew'].'"';
			//$weights .= $zpt.' '.str_replace(",", ".", $row['weight']);
		}
		
		
		$objWriter = new PHPExcel_Writer_Excel2007($file);
		$objWriter->save('php://output');
	}
?>