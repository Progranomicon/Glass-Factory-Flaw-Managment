<?php
$host="db4.ipipe.ru";
$user="qdashkin_db0";
$pass="Revo9000";

$db_name = "qdashkin_db0";

@mysql_connect($host, $user, $pass) or die("Ошибка MySQL: ".mysql_error());
mysql_set_charset("utf8");
mysql_select_db($db_name);
?>