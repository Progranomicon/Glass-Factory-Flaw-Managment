<?php
	$q="SELECT * from factory.nomenclatures where DateExcluded is NULL";
	
	$nomList = '"production":{';
	
	$delim = "";
	
	$r=mysql_query($q);
	
	while ($row=mysql_fetch_assoc($r)){
	
		$nomList.= $delim.'"'.$row['idNomenclatures'].'":{"role": "'.$row['role'].'",
        "customer": "'.$row['customer'].'",
        "fullName": "'.$row['fullName'].'",
        "form": "'.$row['form'].'",
        "code": "'.$row['internalCode'].'",
        "shortName": "'.$row['shortName'].'",
        "color": "'.$row['color'].'",
        "totalUnits": "'.$row['totalUnits'].'",
        "boxing": "'.$row['boxing'].'",
        "layers": "'.$row['layers'].'",
        "h": "'.$row['h'].'",
        "target": "'.$row['target'].'",
        "proc": "'.$row['process'].'",
        "sap": "'.$row['sapCode'].'",
        "gost": "'.$row['gost'].'",
        "sto": "'.$row['sto'].'"}';
		
		$delim = ", ";
		//echo ' SKU.push({id:'.$row['idNomenclatures'].', role:\''.$row['role'].'\', customer:\''.$row['customer'].'\', fullName:\''.$row['fullName'].'\', color:\''.$row['color'].'\', internalCode:\''.$row['internalCode'].'\'}); '.chr(13);
		
	}
	
	$nomList.= "}";
	
	$fp = fopen("../JSONCache/production.json", 'w');
	
	$wr = fwrite($fp, $nomList);
	
	fclose($fp);
?>