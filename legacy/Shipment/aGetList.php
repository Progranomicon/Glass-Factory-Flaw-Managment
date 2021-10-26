<?php
error_reporting(0);
require "/../conn.php"; 
echo '<div><a href="javascript:ShowEditor(0,\'\')">+ Новый грузополучатель</a></div><hr><br>';
$q="SELECT * FROM consumers WHERE deleted!='1' ORDER BY id DESC";
$res=mysql_query($q);
while($row=mysql_fetch_assoc($res)){
	echo '<div><a href="javascript:ShowEditor('.$row['id'].',\''.$row['consumerName'].'\');">'.$row['consumerName'].'</a></div>';
}	
mysql_close();
?>
