<?php 
session_start();
?>
<html>
	<head>
		<link rel="stylesheet" href="http://192.168.113.112/style_1.css" type="text/css" >
		<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	</head>
<div class="header_div"><FONT color=white>Рузаевский стекольный завод</FONT>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<FONT color=red>Тестовый режим</FONT></div>

<?php
require 'Menu.php';
require_once "conn.php";
$q="UPDATE productionutf8 SET IsDeleted=TRUE WHERE id='".$_GET['DelId']."'";

$res=mysql_query($q);
if($res==0)
{
    echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка. Не удалено</span>';
}
Else
{
    echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Удалено.</span>';
}
echo '<br>
        <a href="add_format.php">Вернуться</a>';
include_once "bottom.php";
mysql_close();
?>