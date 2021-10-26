<?php 
	session_start();
	require_once "../../conn.php";
	
	if (isset($_GET['task'])){
		if($_GET['task']=='getProduction'){
			$get_production_query="SELECT id, format_name, glass_color, units_number, boxing FROM productionutf8 WHERE isDeleted='0' ORDER BY id DESC";
			$res=mysql_query($get_production_query);
			echo '{"production":{';
			$delimiter="";
			if (mysql_num_rows($res)>0){
				while($row=mysql_fetch_assoc($res)){
					echo $delimiter.' "'.$row['id'].'":{"id":"'.$row['id'].'", "color":"'.$row['glass_color'].'", "boxing":"'.$row['boxing'].'", "count":"'.$row['units_number'].'", "formatName":"'.$row['format_name'].'"}';
					$delimiter=",";
				}
				echo '}, "result":{"status":"ok"}}';
			}
			else echo '}, "result":{"status":"fail", "message":"MySQL Error"}}';
			return;
		}
		if($_GET['task']=='saveParam'){
			$query="REPLACE INTO format_passport_params SET `minValue`='".$_GET['min']."', `maxValue`='".$_GET['max']."', `productionId`='".$_GET['productionId']."', `operationDate`=NOW(), `textValue`='".$_GET['text']."', `paramId`='".$_GET['paramId']."', `isUsed`='".$_GET['isUsed']."', `isPassportOnly`='".$_GET['isPassportOnly']."'";
			if(isset($_GET['id'])){
				if($_GET['id']!='0') $query.=", `id`='".$_GET['id']."'";
			}
			$res=mysql_query($query);
			if (mysql_affected_rows()>=1){
				echo '{"result":{"status":"ok", "message": "Сохранено."}}';
			}else{
				echo '{"result":{"status":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$query.'", "mysql_error":"'.mysql_error().'"}}';
			}
			return;
		}
		if($_GET['task']=='getSavedParams'){
			$query="SELECT * FROM format_passport_params WHERE productionId='".$_GET['productionId']."'";
			$res=mysql_query($query);
			echo '{"productionParams":{';
			$delimiter="";
			if (mysql_num_rows($res)>=0){
				while($row=mysql_fetch_assoc($res)){
					echo $delimiter.' "'.$row['paramId'].'":{"paramId":"'.$row['paramId'].'", "min":"'.$row['minValue'].'", "max":"'.$row['maxValue'].'", "text":"'.$row['textValue'].'", "id":"'.$row['id'].'", "isUsed":"'.$row['isUsed'].'", "isPassportOnly":"'.$row['isPassportOnly'].'"}';
					$delimiter=",";
				}
				echo '}, "result":{"status":"ok"}}';
			}
			else echo '}, "result":{"status":"fail", "message":"MySQL Error"}}';
			return;
		}
		if($_GET['task']=='saveParamsData'){
			$query="insert into format_passport_data(operationDate, paramRecordId, mold, val) values ";
			$molds=explode(",",$_GET['moldsArray']);
			$delim="";
			foreach($molds as $value){
				$pair=explode(':', $value);
				$query.=$delim."(NOW(),'".$_GET['id']."','".$pair[0]."','".$pair[1]."')";
				$delim=",";
			}
			$res=mysql_query($query);
			if(mysql_affected_rows()>=0){
				echo '{"result":{"status":"ok", "message": "Сохранено."}}';
			}else{
				echo '{"result":{"status":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$query.'", "mysql_error":"'.mysql_error().'"}}';
			}
			//echo $query;
			return;
		}
	}else{
		echo '{"result":{"status":"fail", "message":"No task defined."}}';
	}
?>