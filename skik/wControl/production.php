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
				if($pair[1]!="0"){
				$query.=$delim."(NOW(),'".$_GET['id']."','".$pair[0]."','".$pair[1]."')";
				$delim=",";
				}
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
		if($_GET['task']=='getStatistic'){
			$query="SELECT * FROM format_passport_data WHERE `paramRecordId`='".$_GET['paramId']."' AND `operationDate` BETWEEN '".$_GET['fromDate']."' AND '".$_GET['toDate']."' ORDER BY `operationDate` ";
			$res=mysql_query($query);
			echo '{"statistic":{';
			$delimiter="";
			if (mysql_num_rows($res)>=0){
				while($row=mysql_fetch_assoc($res)){
					echo $delimiter.' "'.$row['id'].'":{"id":"'.$row['id'].'", "operationDate":"'.$row['operationDate'].'", "val":"'.$row['val'].'"}';
					$delimiter=",";
				}
				echo '}, "result":{"status":"ok"}}';
			}
			else echo '}, "result":{"status":"fail", "message":"MySQL Error", "MySQL query":"'.$query.'"}}';
			return;
		}
		if($_GET['task']=='getFullStatistic'){
			$prodId = $_GET['productionId'];
			$dateFrom = $_GET['startDate'];
			$dateTo = $_GET['endDate'];
			$query="SELECT t1.productionId, t1.paramId, t1.minValue, t1.maxValue, t1.textValue, t2.operationDate, t2.id, t2.paramRecordId, t2.val FROM format_passport_params AS t1 JOIN format_passport_data AS t2 ON(t1.productionId='".$prodId."' AND t2.paramRecordId=t1.id AND t2.operationDate BETWEEN '".$dateFrom."' AND '".$dateTo."')";
			$res=mysql_query($query);
			$summary= array();
			if (mysql_num_rows($res)>=0){
				while($row=mysql_fetch_assoc($res)){
					if(!isset($summary[$row['paramId']])){
						$summary[$row['paramId']]= array();
						$summary[$row['paramId']]['summ']=0;
						$summary[$row['paramId']]['count']=0;
						$summary[$row['paramId']]['max']=-1000;
						$summary[$row['paramId']]['min']=10000;
						
					}
					$summary[$row['paramId']]['summ']+=$row['val'];
					$summary[$row['paramId']]['count']++;
					if($row['val']>$summary[$row['paramId']]['max']) $summary[$row['paramId']]['max']=$row['val'];
					if($row['val']<$summary[$row['paramId']]['min']) $summary[$row['paramId']]['min']=$row['val'];
				}
				
			}
			echo '{"data":{';
			$delim = '';
			foreach($summary as $param=>$arr){
				echo $delim.'"'.$param.'":{"val":"'.($arr['summ']/$arr['count']).'", "min":"'.$arr['min'].'", "max":"'.$arr['max'].'"}';
				$delim = ', ';
			}
			echo "}}";
			return;
		}
	}else{
		echo '{"result":{"status":"fail", "message":"No task defined."}}';
	}
?>