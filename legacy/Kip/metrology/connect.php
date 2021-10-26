<?php
	$host = "192.168.113.112";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'steklo'; 
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
	mysql_set_charset("utf8");
	mysql_select_db($db_name);
?>