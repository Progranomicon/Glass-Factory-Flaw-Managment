<?php 
	session_start();
	if (Isset($_GET['Exit'])) {
		$_SESSION['Permissions'] = array();
		unset($_SESSION['UserName']);
	}
	if (isset($_POST['Pass'])) {
	include 'conn.php';
	$res = mysql_query("SELECT * FROM steklo.SystemUsers WHERE pass='" . $_POST['Pass'] . "'");
		while ($row = mysql_fetch_assoc($res)) {
			$_SESSION['Permissions'] = array_flip(explode(',', $row['access']));
			$_SESSION['UserName'] = $row['FIO'];
		}
	}

?>
<html>
<head>
	<LINK rel="icon" href="favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<link rel="stylesheet" type="text/css" href="css.css">
</head>
<body>
	<img src="logo2.jpg" alt="Лого Рузаевского стекольного завода" style="padding-top:50px;"><br>
	<span style="font-size:2em;">Рузаевский Стекольный Завод</span>
	<div>
	<?php
	if(!isset($_SESSION['UserName'])){//авторизация
	?>
	<FORM action="index2.php" method="POST"><br>
		Авторизация.<br>Введите свой пароль<br>
		<input type="password" name="Pass" value=""><br>
		<input type="submit" value="Авторизоваться">
	</TABLE></FORM>
	<?php
	}
	else{//список разделов <li></li>
	include "menu2.php";
	}
	?>
		
	</div>
</body>
</html>