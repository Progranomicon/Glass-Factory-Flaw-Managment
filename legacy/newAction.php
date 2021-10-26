<?php 
	session_start();
	require_once "conn.php";
	mysql_set_charset("utf8");
	$new_action_query="INSERT INTO actionshistory set dateTime=NOW(), IP='".$_SERVER['REMOTE_ADDR']."', UserId='', action='".$_GET['action']."', details='".$_GET['details']."'";
	if (mysql_query($new_action_query)){
        echo 'Успешно добавлено действие: '.$_GET['action'].'.';
	} 
	else{
        echo "Невозможность добавить действие <br>".$new_action_query;
	}
?>