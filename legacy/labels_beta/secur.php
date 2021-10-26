<?php
	date_default_timezone_set('Europe/Moscow');
	include "conn.php";
	include "PHPExcel/IOFactory.php";
	$locale = 'ru_ru';
	$validLocale = PHPExcel_Settings::setLocale($locale);
	if (!$validLocale) {
		echo 'Unable to set locale to '.$locale." - reverting to en_us" . PHP_EOL;
	}else{echo "locale assigned<br>";}
	$file = iconv( 'UTF-8', 'CP866', "z:/Номера продуктов.xlsx");
	$newfile = 'Production.xlsx';

	if (!copy($file, $newfile)) {
		echo "не удалось скопировать $file...\n";
	}
	
	
	/*system('C:\\apache\\localhost\\www\\labels\\copy.bat', $output);
	echo iconv('CP866', 'UTF-8',print_r($output));
	/*$copyname=iconv( 'UTF-8', 'CP866', "z:\\Номера продуктов.xlsx");
	 $file = fopen($copyname,"a+");
				$lastNums= fread($file,3000); // читаем в строку весь файл
				fclose($file);
				echo "File ".$lastNums;*/
				
				
				
				
	$role="";
	//$fileName="c:/apache/localhost/www/labels/Production3.xlsx";
	$fileName='"Production.xlsx"';
	//$fileName=iconv( 'UTF-8', 'CP866', "z:/Номера продуктов.xlsx");
	$objReader = PHPExcel_IOFactory::createReader('Excel2007');
	//$objReader->setReadDataOnly(true);
	$excFile = $objReader->load($fileName);
	$excFile->setActiveSheetIndex(4);
	for ($row=0;$row<470;$row++){
		for ($col=0;$col<25;$col++){
			//if($excFile->getActiveSheet()->getCellByColumnAndRow(5,$row)->getCalculatedValue()=="") break;
			$role.=$col."=".$excFile->getActiveSheet()->getCellByColumnAndRow($col,$row)->getCalculatedValue().", ";
		}
		$role.="<br>";
	}
	//$role=$excFile->getActiveSheet()->getCell("C2")->getCalculatedValue();
	echo $role;
	
?>