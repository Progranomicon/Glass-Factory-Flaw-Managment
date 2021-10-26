<?php
include "Auth.php";
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	</head>
	<body>
<?
$authForm='<div style="margin-top:350px; width:100%;text-align:center;"><FORM action="logon.php" method=POST>
<INPUT type="text" name="login" value="" placeholder="логин(почта)"> &nbsp
<INPUT type="text" name="pass" value="" placeholder="пароль"> &nbsp
<INPUT type="submit"  value="Войти">
</FORM><br><a href="register.php">Регистрация</a></div>';

	
if ($AccLvl==9){
	if (isset($_POST['login']))
		{
		require_once "connect.php";
		$authRes=mysql_query("SELECT * FROM users WHERE login='".$_POST['login']."' AND pass='".$_POST['pass']."' AND State='1'");
		if (mysql_num_rows($authRes)==0)
			{
			echo "Неправельный пароль или логин (".$_POST['login'].")";
			echo $authForm;
			}
		else 
			{
				$UserData=mysql_fetch_assoc($authRes);
				$_SESSION['Email']=$UserData['login'];
				$_SESSION['UserId']=$UserData['ID'];
				$_SESSION['AccessLevel']=$UserData['AccessLevel'];
				$_SESSION['UserName']=$UserData['FIO'];
			}
		mysql_free_result($authRes);
		}
	else
		{
			echo $authForm;
		}
}

?>
</body>
</html>