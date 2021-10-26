<html>
	<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	</head>
	<body>
<?php 
	require 'conn.php';
	$q="SELECT * FROM productionutf8";
	$res=mysql_query($q);
	while($row=mysql_fetch_assoc($res)){
		if (!strpos($row['LabelHTML'],$row['glass_color'])){
			echo '<span style="background-color:red;">'.$row['id'].'-'.$row['format_name']." = ".$row['glass_color']." </span><br> ";
		}
		else{
			echo '<span style="background-color:green;color:white;">'.$row['format_name']." Ok </span>".strpos($row['LabelHTML'],$row['glass_color'])."<br> ";
		}
	}
?>
</body>