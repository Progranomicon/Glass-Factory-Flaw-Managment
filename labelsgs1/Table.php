<?php
	date_default_timezone_set('Europe/Moscow');
	require "../conn.php";
	require "../options.php";


	if(isset($_GET['getProductionFromExcel'])){
		echo '{"isFileCopied":"yes", "production":{"11100001":{"role":"Крепкий алкоголь", "customer":"Саранский ЛВЗ", "fullName":"КПМ-23спец.-500-Деревенька", "form":"109050", "code":"11100001", "shortName":"500 мл Деревенька", "color":"10", "totalUnits":"1482", "boxing":"CTUP(i)6", "layers":"6", "h":"1900", "target":"", "proc":"BB", "sap":"", "gost":"ГОСТ 32131-2013", "sto":"","vespaleta":"100"},
		 "11100020":{"role":"Слабый алкоголь", "customer":"ОПХ Хейнекен", "fullName":"ВКП-2-470-Miller", "form":"", "code":"11100020", "shortName":"470 мл Miller", "color":"10", "totalUnits":"1960", "boxing":"CTUP(i)7", "layers":"7", "h":"1900", "target":"", "proc":"NNPB", "sap":"40027005", "gost":"СТО 38772188-002-2020", "sto":"","vespaleta":"567"},
		 "11100015":{"role":"Слабый алкоголь", "customer":"ОПХ Хейнекен", "fullName":"ВКП-2-450-Emerald", "form":"112525", "code":"11100015", "shortName":"450 мл Emerald", "color":"10", "totalUnits":"1960", "boxing":"CTPL(i)7", "layers":"7", "h":"1929", "target":"", "proc":"NNPB", "sap":"40027715", "gost":"", "sto":"","vespaleta":"578"}
		 }}';		
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