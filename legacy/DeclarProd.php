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
if (isset($_GET['Change'])){
    $q="UPDATE productionutf8 SET MorePics='".$_GET['St']."' WHERE id='".$_GET['Change']."'";
    $res=mysql_query($q);
    if($res==0)
    {
        echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка.</span>';
    }
    Else
    {
        echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Удачно.</span>';
    }
    echo "<br>";
    $_GET['Id']=$_GET['Change'];
    }
If (isset($_GET['Id'])){
    $q="SELECT * FROM productionutf8 WHERE id='".$_GET['Id']."'";
    $res=mysql_query($q);
    $Prod=mysql_fetch_assoc($res);
    echo "<h2>Продукция:".$Prod['format_name'].'.</h2>';
    echo "Декларированность: ";
    if ($Prod['MorePics']==1){ 
        echo '<span style="font-size: 1em; color: #009933;font-weight: bold">ДА</span>';
        $Change=0;
        }
    else {
        echo '<span style="font-size: 1em; color: #990000;font-weight: bold">НЕТ</span>';
        $Change=1;
        }
    echo " ";
    echo '<A href="DeclarProd.php?Change='.$_GET['Id'].'&St='.$Change.'">(Изменить)';
}
else echo 'Нет параметров';

echo '<br>
        <a href="add_format.php">← Вернуться</a>';
include_once "bottom.php";
mysql_close();
?>