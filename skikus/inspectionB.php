<?php
	function getInspectionData($IP, $dateFrom,$dateTo){
		@mysql_connect($IP, "root", "parolll") or die("Ошибка MySQL: ".mysql_error());
        mysql_set_charset("utf8");
		mysql_select_db("historique");
		$query="SELECT * FROM compteurs WHERE `T_Date`>'".$dateFrom."' AND `T_Date`<'".$dateTo."'";
		//echo $query."<br>";
		$resource=mysql_query($query);
		while($row=mysql_fetch_assoc($resource)){
			$summaryTable[$row['T_Capteur']] [$row['T_NumCpt']]=$row['T_Valeur'];
		}
		//Цикл отдающий JSON
		$jsonString='{"sensors":[';
		foreach($summaryTable as $key=>$val){
		$jsonString.='{"code":"'.$key.'"';
			foreach($val as $Numcpt=>$valeur){
				$jsonString.=', "'.$Numcpt.'":"'.$valeur.'"';
			}
			$jsonString.='}, ';
		}
		$jsonString=substr($jsonString,0, strlen($jsonString)-2); //убирание лишней запятой
		$jsonString.="]}";
		mysql_close();
		return $jsonString;
	}
	
	echo getInspectionData("192.168.113.112",$_GET['dateFrom'],$_GET['dateTo']);
?>