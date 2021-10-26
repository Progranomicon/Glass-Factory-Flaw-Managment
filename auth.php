<?php 
	session_start();
	require_once "conn.php";

	if (isset($_GET['unAuth'])) doUnAuth();
	if (isset($_GET['isAuth'])) checkAuth();
	if (isset($_GET['pass'])) doAuth();
	
	
	function doUnAuth(){
		unset($_SESSION['userId']);
		unset($_SESSION['FIO']);
		unset($_SESSION['access']);
		echo '{"result":{"status":"ok"}}';
		return;
	}
	function checkAuth(){
		if (isset($_SESSION['userId'])){
			echo '{"result":{"status":"ok", "auth":"yes", "user_fio":"'.$_SESSION['FIO'].'", "user_access":'.$_SESSION['access'].'}}';
		}
		else{
			echo '{"result":{"status":"ok", "auth":"no"}}';
		}
		return;
	}
	function doAuth(){
		$pass=$_GET['pass'];
		$q="SELECT * FROM users WHERE `pass`='".$pass."'";
		$res=mysql_query($q);
		//echo "DATA is";
		if (mysql_num_rows($res)==1){
			$userData=mysql_fetch_assoc($res);
			echo'{"authorization":"ok","name":"'.$userData['name'].'", "access":'.$userData['access'].'}';
			$_SESSION['userId']=$userData['id'];
			$_SESSION['name']=$userData['name'];
			$_SESSION['access']=$userData['access'];
		   //echo "Удачная авторизация";
		}
		else{
			echo'{"authorization":"no"}';
		}
	}
?>