<?php
	date_default_timezone_set('Europe/Moscow');
	include "conn.php";
	include "PHPExcel/IOFactory.php";
	$locale = 'ru_ru';
	$validLocale = PHPExcel_Settings::setLocale($locale);

	$file = iconv("UTF-8", "CP1251", '//192.168.113.4/Public/КОДЫ ПРОДУКТОВ/Номера продуктов.xlsx');
	$newfile = 'c:/apache/localhost/www/labels/Production.xlsx';
	$isFileCopied = "no";

	if(isset($_GET['getProductionFromExcel'])){
		
		error_reporting(0);
		if (!copy($file, $newfile)) {
			$isFileCopied = "no";
		}else{$isFileCopied = "yes";}
		error_reporting(1);
		
		$jsonXLSX='{"isFileCopied":"'.$isFileCopied.'", "production":{';
		$delim="";
		$fileName="c:/apache/localhost/www/labels/Production.xlsx";
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		$excFile = $objReader->load($fileName);
		$excFile->setActiveSheetIndex(2);
		for ($row=2;$row<10000;$row++){
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
		$jsonXLSX.=$delim.' "'.$code.'":{"role":"'.$role.'", "customer":"'.$customer.'", "fullName":"'.$fullName.'", "form":"'.$form.'", "code":"'.$code.'", "shortName":"'.$shortName.'", "color":"'.$color.'", "totalUnits":"'.$totalUnits.'", "boxing":"'.$boxing.'", "layers":"'.$layers.'", "h":"'.$h.'", "target":"'.$target.'", "proc":"'.$proc.'", "sap":"'.$SAP.'", "gost":"'.$GOST.'", "sto":"'.$STO.'"}';
			$delim=",";
		}
		$jsonXLSX.="}}";
		echo $jsonXLSX;
	}
	if(isset($_GET['getLastNums'])){
			$nums=getLastNums();
			echo $nums;
	}	
	if(isset($_GET['setLastNum'])){
			$newNum=$_GET['newNum'];
			$newName=$_GET['newName'];
			$line=$_GET['line'];
			$nums=getLastNums();
			// Разбор json
			$nums=trim($nums,"{}");
			for ($i=0;$i<10;$i++){
				$lineDataArr[$i]=array();
				$from=strpos($nums,"{",0);
				$to=strpos($nums,"}",0);
				if(!$to) $to=strlen($nums)+1;
				//echo substr($nums, $from, $to-$from)."+from=".$from."+to=".$to."<br>";
				$lineData=substr($nums, $from, $to-$from);
				$lineDataExploded=explode('"',$lineData);
				$lineDataArr[$i]['name']=$lineDataExploded[11];
				$lineDataArr[$i]['num']=$lineDataExploded[7];				
				$nums=substr($nums, $to+1);
				//echo $nums."<br>";
			}
			// Запись новых полученных значений
			$lineDataArr[$line]['name']=$newName;
			$lineDataArr[$line]['num']=$newNum;
			// Сборка нового json
			$json="{";
			for ($i=0;$i<10;$i++){
				$json.='"'.$i.'":{"line":"'.$i.'", "lastNum":"'.$lineDataArr[$i]['num'].'", "name":"'.$lineDataArr[$i]['name'].'"}, ';
			}
			$trimmed=substr($json, 0, strlen($json)-2);
			$json=$trimmed."}";
			//echo $json;
			$file = fopen("lastNums.json","w");
			// Перезапись файла с json
			if ($file){
				fwrite($file, $json);
				fclose($file);
			}
			echo "Ok!";
	}
	function getLastNums(){
			 $file = fopen("lastNums.json","a+");
			if ($file)
			{
				$lastNums= fread($file,3000); // читаем в строку весь файл
				fclose($file);
			}
			return $lastNums;
	}
?>