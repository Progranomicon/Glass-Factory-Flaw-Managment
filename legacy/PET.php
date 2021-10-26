<?php 
session_start();
require_once "/phpExcel/phpExcel.php";
?>
<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>PHP-Excell Test</title>
    </head>
    <body>	
	<?php
			date_default_timezone_set('Europe/Moscow');
			$PHPExcel_file = PHPExcel_IOFactory::load("./Label/nomera1.xlsx");
			$worksheet=$PHPExcel_file->setActiveSheetIndex(0);
			$rows_count = $worksheet->getHighestRow();
			echo "Строк:".$rows_count."<br>";
			echo "- ".$worksheet->getCell("K13")->getCalculatedValue()." -";
			//$sheetData = $PHPExcel_file->getActiveSheet()->toArray(null,true,true,true);
			//for($i=1;$i<$rows_count;$i++){
				
				//echo $worksheet->getCell("".$i)->getCalculatedValue()."-".$worksheet->getCell("E".$i)->getCalculatedValue()."<br>";
			//	echo $sheetData[$i]["A"]."-".$sheetData[$i]["F"]."<br>";
			//}
			//var_dump($sheetData);
		?>
    </body>
</HTML>