<?php
	$host = "localhost";
	$user = 'root';
	$pass = "parolll";
	$db_name = 'factory'; 
	
	@mysql_connect($host, $user, $pass) or die("Ошибка MySQL: ".mysql_error());
        mysql_set_charset("utf8");
	mysql_select_db($db_name);
?>