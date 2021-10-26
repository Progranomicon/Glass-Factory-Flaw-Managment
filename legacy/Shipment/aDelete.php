<?php
error_reporting(0);
require "/../conn.php"; 
$q="update consumers set deleted='1' where id='".$_GET['id']."'";
$res=mysql_query($q);
if (mysql_affected_rows()>0) echo "Удалено.";
else echo "Ошибка. Не Удалено!";
mysql_close();
?>
