<?php
error_reporting(0);
require "/../conn.php";
$name=str_replace('"', '&quot;', $_GET['name']);
if  ($_GET['id']>0){
	$q="update consumers set consumerName='".$name."' where id='".$_GET['id']."'";
	$res=mysql_query($q);
	if (mysql_affected_rows()>0){
		echo "Изменено";
	}
	else{ 
		echo "Ошибка. Не изменено!";
	}
}
else{
	$q="insert into consumers (consumerName, deleted) values('".$name."', 0)";
	$res=mysql_query($q);
	if (mysql_affected_rows()>0) {
		echo "Добавлено.";
	}
	else{ 
		echo "Ошибка. Не добавлено!";
	}
}
mysql_close();
?>
