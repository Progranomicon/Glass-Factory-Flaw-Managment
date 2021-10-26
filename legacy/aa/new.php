<?php 
session_start();
$DEBUG=1;
date_default_timezone_set('Europe/Moscow');	
	
	if (isset($_POST['S'])){
		$tat=true;// значит это попадание на страницу эту для добавления, после заполнения полей, а не просто так.
		require "/conn.php";
		$q="INSERT INTO realty SET state='3',
			objectType='".$_POST['type']."', 
			locatedArea='".$_POST['area']."',
			address='".$_POST['type']."',
			s='".$_POST['S']."',
			info='".$_POST['info']."',
			price='".$_POST['price']."',
			mail='".$_POST['mail']."',
			phone='".$_POST['phone']."',
			userName='".$_POST['user']."'";
		$res=mysql_query($q);
		if(mysql_affected_rows()>0){
			$message="Добавлено";
		}
		else{
			$message="Не добавлено";
			if($DEBUG==1) $message.=" >".$q."<";
		}
	}
	else{
		$tat=false;
	}
?>
<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>AAgency</title>
    </head>
    <body>
	<?php 
		if($tat){
			echo $message."<br>";
		}
	?>
	<h3>Для подачи объявления заполните форму</h3>
		<form METHOD="POST" action="new.php">
			Объект<select id="type" name="type">
				<option value="1">Квартира</option>
				<option value="2">Дом</option>
				<option value="3">Участок</option>
				<option value="4">Нежилуха</option>
			</select><br>
			Район <select id="area" name="area">
				<option value="1">Пролетарский</option>
				<option value="2">Ленинский</option>
				<option value="3">Октябрьский</option>
			</select><br>
			Адрес <input id="address" name="address" type="text"><br>
			Площадь <input id="S" name="S" type="text"><br>
			Прочая важная информация<textarea id="info" name="info" placeholder="Прочая информация об объекте"></textarea><br>
			Цена <input id="price" name="price" type="text"> Р.<br>
			Электропочта <input id="mail" name="mail" type="text"><br>
			Телефон <input id="phone" name="phone" type="text"><br>
			Имя продавана <input id="name" name="user" type="text"><br>
			<input type="submit" value="Добавить">
		</form>

    </body>
</HTML>