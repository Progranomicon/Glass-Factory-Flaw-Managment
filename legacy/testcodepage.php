<html>
	<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	</head>
	<form action="testcodepage.php" method=GET>
		<input type=text name=text>
		<input type=submit value="Добавить">
		<?php 
			if (isset($_GET['text'])){
				$host = "192.168.113.112";
				$user = 'root';
				$psswrd = "parolll";
				$db_name = 'steklo'; 
				@mysql_connect($host, $user, $psswrd) or die("Ошибка при соединении с БД: ".mysql_error());
				mysql_set_charset("utf8");
				mysql_select_db($db_name);
				$q="insert into test_codepage set text='".$_GET['text']."'";
				if (mysql_query($q)){
					echo "<br>Добавлено: ".$_GET['text'];
				}
				else
				{
					echo "<br>Не добавлено: ".$_GET['text'];
				}
				echo "<br>".mysql_client_encoding();
				mysql_close();
			}
		?>
	</form>
</html>