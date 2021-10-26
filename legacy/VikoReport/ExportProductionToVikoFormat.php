<?php
function random_html_color()
{
    return sprintf( '00%02X%02X%02X', rand(0, 255), rand(0, 255), rand(0, 255) );
}
require "/../conn.php";
$q="Select * from productionutf8 where  IsDeleted!='1'";
$res=mysql_query($q);
echo 'Файл экспорта списка кодов продукции ЭКСПРЕСС-УЧЁТ 7 <br>';
echo mysql_num_rows($res).'<br>';
while ($row=mysql_fetch_assoc($res)){
	$rand_color = sprintf( "%06X", mt_rand(0, 0xFFFFFF) );
	echo $row['id']."".$row['format_name']."".random_html_color()."0000000000000<br>";
}
?>