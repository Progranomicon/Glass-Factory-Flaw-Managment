<?php 
	include "PHPExcel/IOFactory.php";
	$locale = 'ru_ru';
	$validLocale = PHPExcel_Settings::setLocale($locale);
		
	/*$file = iconv("UTF-8", "CP1251", '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx');*/
	$SETTINGS = array();
	$SETTINGS['file'] = iconv("UTF-8", "CP1251", 'c:/p/p.xlsx');
	//$SETTINGS['file'] = iconv("UTF-8", "CP1251", '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx');
	$SETTINGS['new_file'] = 'c:/apache/localhost/www/Production.xlsx';
	$SETTINGS['copy_date_file'] = 'c:/apache/localhost/www/copyDate.txt';
	$SETTINGS['production_json_file'] = 'c:/apache/localhost/www/production.json';

	if(isset($_GET['getProduction'])){
		global $SETTINGS;
		//echo $SETTINGS['production_json_file'];
		copyFileIfUpdated();
		echo file_get_contents($SETTINGS['production_json_file']);
	}

	function copyFile(){
		global $SETTINGS;
		if(@copy($SETTINGS['file'], $SETTINGS['new_file'])) return true;
		else return false;
	}
	function copyFileIfUpdated(){
		global $SETTINGS;
		
		if(((int)@filemtime($SETTINGS['file']))>((int)getLastUpdateTime())){
			copyFile();
			saveCopyTime();
			cacheProductionIntoJSON();
			return true;
		} 
		else return false;
	}
	function saveCopyTime(){
		global $SETTINGS;
		
		$fp = fopen($SETTINGS['copy_date_file'], 'w');
		$wr = fwrite($fp, filectime($SETTINGS['file']));
		fclose($fp);
	}
	function getLastUpdateTime(){
		global $SETTINGS;
		
		if($copyDate = @file_get_contents($SETTINGS['copy_date_file'])) return $copyDate;
		else return 0;
		
	}
	function cacheProductionIntoJSON(){
		global $SETTINGS;
		//echo $SETTINGS['new_file'];
		$prodArray = array();
		
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		
		$excFile = $objReader->load($SETTINGS['new_file']);
		$excFile->setActiveSheetIndex(2);
		for ($row=2;$row<100000;$row++){
			if($excFile->getActiveSheet()->getCellByColumnAndRow(6,$row)->getCalculatedValue()=="") break;
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
			
			if(!isset($prodArray[$code])) $prodArray[$code] = array();
			$prodArray[$code]['role'] = $role;
			$prodArray[$code]['customer'] = $customer;
			$prodArray[$code]['fullName'] = $fullName;
			$prodArray[$code]['form'] = $form."";
			$prodArray[$code]['code'] = $code."";
			$prodArray[$code]['shortName'] = $shortName;
			$prodArray[$code]['proc'] = $proc;
			$prodArray[$code]['color'] = $color."";
			$prodArray[$code]['totalUnits'] = $totalUnits;
			$prodArray[$code]['boxing'] = $boxing;
			$prodArray[$code]['layers'] = $layers;
			$prodArray[$code]['h'] = $h;
			$prodArray[$code]['target'] = $target;
			$prodArray[$code]['sap'] = $SAP;
			$prodArray[$code]['gost'] = $GOST;
			$prodArray[$code]['sto'] = $STO;
			//$JSONString.=$delim.' "'.$code.'":{"role":"'.$role.'", "customer":"'.$customer.'", "fullName":"'.$fullName.'", "form":"'.$form.'", "code":"'.$code.'", "shortName":"'.$shortName.'", "color":"'.$color.'", "totalUnits":"'.$totalUnits.'", "boxing":"'.$boxing.'", "layers":"'.$layers.'", "h":"'.$h.'", "target":"'.$target.'", "proc":"'.$proc.'", "sap":"'.$SAP.'", "gost":"'.$GOST.'", "sto":"'.$STO.'"}';
			
		}

		$fp = fopen($SETTINGS['production_json_file'], 'w');
		$wr = fwrite($fp, json_encode($prodArray));
		fclose($fp);		
	}
?> 