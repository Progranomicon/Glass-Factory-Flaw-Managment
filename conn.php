<?php
	
	$host = "localhost";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'factory'; 
	
	if (version_compare(PHP_VERSION, '7.0.0','>=')) include 'mysql.php';
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
        mysql_set_charset("utf8");
	mysql_select_db($db_name);
?>