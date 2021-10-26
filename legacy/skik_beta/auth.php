<?php 
	session_start();
	require_once "conn.php";
	mysql_set_charset("utf8");
	if (isset($_GET['unauth'])){
		unset($_SESSION['user_id']);
		unset($_SESSION['FIO']);
		unset($_SESSION['access']);
		echo '{"result":{"status":"ok"}}';
		return;
	}
	if (isset($_GET['is_auth'])){
		if (isset($_SESSION['user_id'])){
			echo '{"result":{"status":"ok", "auth":"yes", "user_fio":"'.$_SESSION['FIO'].'", "user_access":'.$_SESSION['access'].'}}';
		}
		else{
			echo '{"result":{"status":"ok", "auth":"n"}}';
		}
		return;
	}
	$user_pass=$_GET['user_pass'];
	$q="SELECT * FROM systemusers WHERE pass='".$user_pass."'";
	$res=mysql_query($q);
	//echo "DATA is";
	if (mysql_num_rows($res)==1){
		$user_data=mysql_fetch_assoc($res);
		echo'{"authorization":"ok","user_fio":"'.$user_data['FIO'].'", "user_access":'.$user_data['access'].'}';
		$_SESSION['user_id']=$user_data['id'];
		$_SESSION['FIO']=$user_data['FIO'];
		$_SESSION['access']=$user_data['access'];
       //echo "Удачная авторизация";
	} 
	else{
		echo'{"authorization":"no"}';
	}
?>