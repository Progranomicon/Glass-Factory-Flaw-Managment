<html>
<head></head>
<body>
<?php
	$host = "192.168.113.119";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'metrolog'; 
	
	@mysql_connect($host, $user, $psswrd) or die("Îøèáêà MySQL: ".mysql_error());
        //mysql_set_charset("utf8");
	mysql_select_db($db_name);
	$q='SELECT * from tools';
	$r=mysql_query($q);
	while ($row=mysql_fetch_assoc($r)){
		echo 'insert into metrology(id, toolName, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) values(\''.$row['No'].'\', \''.$row['ToolName'].'\', \''.$row['SN'].'\', \''.$row['ToolType'].'\', \''.$row['AccuracyClass'].'\', \''.$row['MeasurementRange'].'\', \''.$row['FrequencyValidation'].'\', \''.$row['LastValidation'].'\', \''.$row['PlaceOfValidation'].'\');<br>';
	}
?>
</body>
</html>