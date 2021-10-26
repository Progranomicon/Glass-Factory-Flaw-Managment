<!DOCTYPE html>
<?php require "connect.php";
?>
<html>

	<head>

		<script type="text/javascript" src="scenario.js"></script>

		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

		<link type="text/css" rel="stylesheet" href="css.css" />

	</head>

	<body>

		<div id="site" style="margin-top:5%;"><?php 

		if (!isset($_POST['objectType'])){

		?>

		<span>Добавить объект недвижимости</span><br><br>

			<form method="POST" action="addnewobj.php" ENCTYPE="multipart/form-data">

			<div class="new_object_parametr_label">Раздел</div><div class="new_object_parametr_input" id="select_obj_type"></div><br>

			<br>

			<div class="new_object_parametr_label">Район</div><div class="new_object_parametr_input" id="select_obj_area"></div><br>

			<br>

			<div class="new_object_parametr_label">Адрес</div><div class="new_object_parametr_input" id="select_obj_address"><textarea name="objectAddress" rows="3" cols="45"></textarea></div><br>

			<br>

			<div class="new_object_parametr_label">Площадь</div><div class="new_object_parametr_input" id="select_obj_s"><input type="text" name="objectS"></div> м<sup>2</sup>.<br>

			<br>

			<div class="new_object_parametr_label">Цена</div><div class="new_object_parametr_input" id="select_obj_price"><input type="text" name="objectPrice"> P.</div><br>

			<br>

			<div class="new_object_parametr_label">Фотография</div><div class="new_object_parametr_input" id="select_obj_foto"><input type="file" name="objectPic"></div><br>

			<br>
			<div class="new_object_parametr_label">Дополнительная информация</div><div class="new_object_parametr_input" id="select_obj_comment"><textarea name="objectComment" rows="3" cols="45"></textarea></div><br>

			<br>

			<input type="submit" value="Добавить" style="margin-left:230px;">
			
			</form>

			<br><a href="index.php">← Вернуться на главную</a>

		<script type="text/javascript">

			ebi("select_obj_type").innerHTML=getListSelectionFromArray (objectsTypes, "objectType");

			ebi("select_obj_area").innerHTML=getListSelectionFromArray (areas, "objectArea");

		</script>

		<?php

		}
		else {
			
			$uploaddir = 'files/';
			$apend=date('YmdHis').rand(100,1000);
			$uploadfile = $uploaddir.$apend.$_FILES['objectPic']['name'];
			echo "<br>Размер закаченного файла: ".$_FILES['objectPic']['size']." байт.<br>";
			if (move_uploaded_file($_FILES['objectPic']['tmp_name'], $uploadfile)) {		
				echo "Файл загружен.";
			}
			else { 
				echo "Файл не загружен, вернитесь и попробуйте еще раз. ".$uploadfile;
			}
			echo '<br>';
			$q="INSERT INTO `RealtyObjects`(`CurrentDate`, `State`, `ObjectType`, `Area`, `Address`, `S`, `Price`, `Phone`, `UserID`, `Comment`, `PicPath`) 
			VALUES (NOW(),'1','".$_POST['objectType']."','".$_POST['objectArea']."','".$_POST['objectAddress']."','".$_POST['objectS']."','".$_POST['objectPrice']."','89709889900','223','".$_POST['objectComment']."','".$uploadfile."')";
			$a = mysql_query($q);
			if ($a==0){
				echo '<span style="color:red;font-size:2em;">Ошибка добавления!</span> '.$q;
			}
			else {
				echo '<span style="color:green;font-size:2em;">объект добавлен.</span> ';
			}
			echo '<br><a href="addnewobj.php">← Вернуться к форме</a>';

		}

		?>

	</div>

	</body>

</html>

<?php ?>