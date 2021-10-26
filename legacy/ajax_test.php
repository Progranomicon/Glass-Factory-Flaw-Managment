<?php
require_once 'conn.php';
$f_n=iconv('UTF-8', 'windows-1251', $_GET['format_name']);
$ajax_que= "SELECT * FROM production WHERE format_name='".$f_n."'";
$ajax_res=mysql_query($ajax_que) or die("Ничего не вышло. Ошибка MYSQL.");
$r_set=  mysql_fetch_assoc($ajax_res);
if(mysql_num_rows($ajax_res)!=0)
{
    print $r_set['id'];
}
else print "SNOVA NICHEGO".$_GET['format_name'];
mysql_close();
?>
