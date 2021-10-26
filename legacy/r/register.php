<?php
include "Auth.php";
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="register.css" />
		<script type="text/javascript" src="scenario.js"></script>
	</head>
	<body>
<div id="regForm">
<?php if (!isset($_POST['login'])){
	echo '
	<span style="font-family:Helvetica, Arial;font-size:3em;">Быстрая регистрация</span><br><br>
	<FORM action="register.php" method=POST onsubmit="return checkPassIdentity(1);">
	<div class="regLabel">Логин (ваша почта)</div><div class="regField"><INPUT type="text" name="login" value=""></div><br>
	<div class="regLabel">Пароль</div><div class="regField"><INPUT type="text" name="pass" value="" oninput="checkPassIdentity()"></div><br>
	<div class="regLabel">Пароль еще раз</div><div class="regField"><INPUT type="text" name="pass2" value="" oninput="checkPassIdentity()"></div><div class="regLabel" id="passIdentity" style="width:5cm;margin-left:-5cm;"></div><br>
	<div class="regLabel">Имя (отображается в объявлениях)</div><div class="regField"><INPUT type="text" name="FIO" value=""></div><br>
	<div class="regLabel">Телефон</div><div class="regField"><INPUT type="text" name="Phone" value=""></div><br>
	<INPUT type="submit"  value="Продолжить">
	</FORM>';
 }
	else {
		include "connect.php";
		$q="Select * from `Users` where `Login`='".$_POST['login']."'";
		$res = mysql_query($q);
		if (mysql_num_rows($res)>0) {
			echo '<span style="color:red;font-size:2em;">Ошибка регистрации!<br></span>Пользователь с такой почтой уже есть. ';
			echo '<br><a href="register.php">← Вернуться к форме регистрации.</a>';
		}
		else{
			if ($_POST['login']=="" || $_POST['pass']==""){
				Echo '<span style="color:red;font-size:2em;">Ошибка регистрации!<br></span>Не заполнены поля Почта и/или Пароль. ';
				echo '<br><a href="register.php">← Вернуться к форме регистрации.</a>';
			}
			else{
				//echo ">".mysql_num_rows($res)."<";
				$q="INSERT INTO `Users`(`Login`, `Pass`, `FIO`, `AccessLevel`, `Phone`, `State`) VALUES ('".$_POST['login']."','".$_POST['pass']."','".$_POST['FIO']."','6','".$_POST['phone']."','1')";
				$a = mysql_query($q);
				if ($a==0){
					echo '<span style="color:red;font-size:2em;">Ошибка регистрации!</span> '.$q;
				}
				else {
					echo '<span style="color:green;font-size:2em;">Регистрация прошла успешно.</span> ';
				}
			}
		echo '<br><a href="logon.php">← Вернуться к форме входа</a>';
		}
	}
 ?>
	
</div>
<script type="text/javascript">
function checkPassIdentity(message){
var p1=ebn('pass')[0].value;
var p2=ebn('pass2')[0].value;
if (p1==p2){
	ebi('passIdentity').innerHTML='<span style="color:lime;border:1px solid lime;">Ок!</span>';
	return true;
}
else {
	ebi('passIdentity').innerHTML='<span style="color:red;border:1px solid red;padding-left:3px;"> Пароли не совпадают.</span>';
	if (message==1) { alert ('Пароли не совпадают.');}
	return false;
}
}
</script>
</body>
</html>