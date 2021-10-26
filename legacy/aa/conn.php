<?php
	$host = "localhost";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'realty'; 
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
        mysql_set_charset("utf8");
	mysql_select_db($db_name);
?>