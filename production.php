<?php
	//Settings and defaults
	//$file = iconv("UTF-8", "CP1251", '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx');
	include "PHPExcel/IOFactory.php";
	$locale = 'ru_ru';
	$validLocale = PHPExcel_Settings::setLocale($locale);
	
	//$file = iconv("UTF-8", "CP1251", '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx');
	//$newfile = 'c:/apache/localhost/www/labels/Production.xlsx';
	//$file = '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx';
	
	$file ='c:/p/p.xlsx';
	//$file = 'с:/apache/localhost/www/labels/Production.xlsx';
	$fileCP1251 =  iconv("UTF-8", "CP1251", $file);
	$newfile = 'Production.xlsx';
	$cachePath = 'c:/apache/localhost/www/JSONCache';
	$isFileChanged = "no";
	$isFileCopied = "no";
	
	//Program
	if(isset($_GET['task']))
		if($_GET['task']=='getProduction'){
			//updateJSON();
			answerBuilder('JSONCache/production.json', $isFileChanged, $isFileCopied);
		}
	function cacheProductionIntoJSON($path, $file){
		$JSONString = '"production":{';
		$delim="";
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		$excFile = $objReader->load($file);
		$excFile->setActiveSheetIndex(2);
		for ($row=2;$row<100000;$row++){
			if($excFile->getActiveSheet()->getCellByColumnAndRow(5,$row)->getCalculatedValue()=="") break;
			$role=$excFile->getActiveSheet()->getCellByColumnAndRow(2,$row)->getCalculatedValue();
			$customer=$excFile->getActiveSheet()->getCellByColumnAndRow(3,$row)->getCalculatedValue();
			$fullName=$excFile->getActiveSheet()->getCellByColumnAndRow(4,$row)->getCalculatedValue();
			$form=$excFile->getActiveSheet()->getCellByColumnAndRow(5,$row)->getCalculatedValue();
			$code=$excFile->getActiveSheet()->getCellByColumnAndRow(6,$row)->getCalculatedValue();
			$shortName=$excFile->getActiveSheet()->getCellByColumnAndRow(8,$row)->getCalculatedValue();
			$proc=$excFile->getActiveSheet()->getCellByColumnAndRow(11,$row)->getCalculatedValue();
			$color=$excFile->getActiveSheet()->getCellByColumnAndRow(12,$row)->getCalculatedValue();
			$totalUnits=$excFile->getActiveSheet()->getCellByColumnAndRow(14,$row)->getCalculatedValue();
			$boxing=$excFile->getActiveSheet()->getCellByColumnAndRow(15,$row)->getCalculatedValue();
			$layers=$excFile->getActiveSheet()->getCellByColumnAndRow(16,$row)->getCalculatedValue();
			$h=$excFile->getActiveSheet()->getCellByColumnAndRow(17,$row)->getCalculatedValue();
			$target=$excFile->getActiveSheet()->getCellByColumnAndRow(28,$row)->getCalculatedValue();
			$SAP=$excFile->getActiveSheet()->getCellByColumnAndRow(30,$row)->getCalculatedValue();
			$GOST=$excFile->getActiveSheet()->getCellByColumnAndRow(31,$row)->getCalculatedValue();
			$STO=$excFile->getActiveSheet()->getCellByColumnAndRow(32,$row)->getCalculatedValue();
			$JSONString.=$delim.' "'.$code.'":{"role":"'.$role.'", "customer":"'.$customer.'", "fullName":"'.$fullName.'", "form":"'.$form.'", "code":"'.$code.'", "shortName":"'.$shortName.'", "color":"'.$color.'", "totalUnits":"'.$totalUnits.'", "boxing":"'.$boxing.'", "layers":"'.$layers.'", "h":"'.$h.'", "target":"'.$target.'", "proc":"'.$proc.'", "sap":"'.$SAP.'", "gost":"'.$GOST.'", "sto":"'.$STO.'"}';
			$delim=",";
		}
		$JSONString.="}";
		
		$fp = fopen($path, 'w');
		$wr = fwrite($fp, $JSONString);
		fclose($fp);
		
	}
	function updateJSON(){
		global $file;
		global $newfile;
		global $isFileChanged;
		global $isFileCopied;
		global $fileCP1251;
		
		if (file_exists($file)) {
			//echo filemtime($file);
			//echo '-';
			//echo file_get_contents('productionFileLastChanged.txt');
			if(((int)filemtime($file))>((int)getChangeProductionTime('productionFileLastChanged.txt'))){ 
			
				$isFileChanged="yes";
				if (copy($fileCP1251, $newfile)){
				//if (copy($file, $newfile)){
					$isFileCopied = "yes";
					saveChangeProductionTime($file);
					cacheProductionIntoJSON('JSONCache/production.json', $newfile);
				}
			}
		}else{echo 'file not exist';}
	}
	function getProductionFromJSON($path){
		return file_get_contents($path);
	}
	function saveChangeProductionTime($filePath){
		$fp = fopen('productionFileLastChanged.txt', 'w');
		$wr = fwrite($fp, filemtime($filePath));
		fclose($fp);
	}
	function getChangeProductionTime($path){
		return file_get_contents($path);
	}
	function answerBuilder($filePath, $isFileChanged, $isFileCopied){
		echo '{"data":{';
		echo getProductionFromJSON($filePath);
		echo '}, "info":{"messages":[';
		if ($isFileChanged=='yes') echo '"Файл с продукцией изменялся"';
		if ($isFileChanged=='yes' && $isFileCopied=='yes') echo ", ";
		if ($isFileCopied=='yes') echo '"Файл скопирован"';
		
		echo ']}';
		echo '}';
	}
?>