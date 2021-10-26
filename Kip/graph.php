<?php
	function addTime($str){
		$a=explode(':',$str);
		$res=intval($a[0])*60+intval($a[1]);
		return $res; 
	}
	require "/../conn.php";
	mysql_select_db("steklo");
	$Q="SELECT EventDateTime, RestoreTime FROM pcsjournal ";
	if ((isset($_GET['df']) & $_GET['df']!='') | (isset($_GET['dt']) & $_GET['dt']!=''))
	$Q.=" WHERE ";
	if (isset($_GET['df']) & $_GET['df']!='')
	$Q.=" EventDateTime>='".substr($_GET['df'],6,4)."-".substr($_GET['df'],3,2)."-1' ";
	if (isset($_GET['df']) & $_GET['df']!=''& isset($_GET['dt']) & $_GET['dt']!='')
	$Q.=" AND ";
	if (isset($_GET['dt']) & $_GET['dt']!='')
	$Q.=" EventDateTime<='".substr($_GET['dt'],6,4)."-".substr($_GET['dt'],3,2)."-31'";
	//Echo $Q;
	$res=mysql_query($Q);
	while ($assoc = mysql_fetch_assoc($res))
    {	
		$month=substr($assoc['EventDateTime'], 2, 5);
		if (!isset($ar[$month])) $ar[$month]=0;
		$ar[$month]+=addTime($assoc['RestoreTime']);
	}
	echo "[";
	foreach($ar as $month=>$val){
		echo "['".$month."',".($val/60)."],";
	}
	echo "];";
?>