<?php
	date_default_timezone_set('Europe/Moscow');
	include "PHPExcel/IOFactory.php";
	$fileName="n.xlsx";
	$objReader = PHPExcel_IOFactory::createReader('Excel2007');
	$excFile = $objReader->load($fileName);
	$excFile->setActiveSheetIndex(0);
	for ($row=1;$row<10000;$row++){
		for ($col=1;$col<22;$col++){
			echo $excFile->getActiveSheet()->getCellByColumnAndRow($col,$row)->getCalculatedValue()." ";
		}
		echo'<br>';
	}
	
	
?>