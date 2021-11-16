<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="js.js" charset=utf-8></script>
<link rel="stylesheet" type="text/css" href="css.css" >
</head>
<body>
<?php
	require "../conn.php";
	if (!isset($_POST['fullName']) & !isset($_GET['del'])){
		if (!isset($_GET['id']))  $_GET['id'] = 0;
		$q="SELECT * from factory.nomenclatures where idNomenclatures='".$_GET['id']."'";
		// echo $q;
		$r=mysql_query($q);
		$row=mysql_fetch_assoc($r);
		echo '<h2>';
		if( $_GET['id']==0){ 
				echo 'Добавление нового SKU';
			}
		else{
			echo $row['internalCode'];
			echo ', '.$row['fullName'];
		}
		echo '</h2>';	
?>
<form action="edit.php" METHOD="POST">
<div>
	<div class="labelForm">ID: </div><div class="formInput"><input type="hidden" name="id" value="<?php if (!isset($row['idNomenclatures'])) echo '0'; else echo $row['idNomenclatures'];?>"><?php if (($_GET['id']==0)) echo 'Новый'; else if (isset($row['idNomenclatures'])) echo $row['idNomenclatures']; ?></div><br>
	<div class="labelForm">Наименование:</div><div class="formInput"><input type="text" name="fullName"  value="<?php if (isset($row['fullName']) ) echo $row['fullName']; ?>"></div><br>
	<div class="labelForm">Внутренний код:</div><div class="formInput"><input type="text" name="internalCode"  value="<?php if (isset($row['internalCode']) ) echo $row['internalCode']; ?>"></div><br>
	<div class="labelForm">Группа:</div><div class="formInput"><input type="text" name="role"  value="<?php if (isset($row['role']) ) echo $row['role']; ?>"></div><br>
	<div class="labelForm">Клиент:</div><div class="formInput"><input type="text" name="customer"  value="<?php if (isset($row['customer']) ) echo $row['customer']; ?>"></div><br>
	<div class="labelForm">Номер формы:</div><div class="formInput"><input type="text" name="form"  value="<?php if (isset($row['form']) ) echo $row['form']; ?>"></div><br>
	<div class="labelForm">Краткое наименование:</div><div class="formInput"><input type="text" name="shortName"  value="<?php if (isset($row['shortName']) ) echo $row['shortName']; ?>"></div><br>
	<div class="labelForm">Цвет:</div><div class="formInput"><input type="text" name="color"  value="<?php if (isset($row['color']) ) echo $row['color']; ?>"></div><br>
	<div class="labelForm">Кол-во на паллете:</div><div class="formInput"><input type="text" name="totalUnits"  value="<?php if (isset($row['totalUnits']) ) echo $row['totalUnits']; ?>"></div><br>
	<div class="labelForm">Упаковка:</div><div class="formInput"><input type="text" name="boxing"  value="<?php if (isset($row['boxing']) ) echo $row['boxing']; ?>"></div><br>
	<div class="labelForm">Кол-во слоёв:</div><div class="formInput"><input type="text" name="layers"  value="<?php if (isset($row['layers']) ) echo $row['layers']; ?>"></div><br>
	<div class="labelForm">Высота паллета:</div><div class="formInput"><input type="text" name="h"  value="<?php if (isset($row['h']) ) echo $row['h']; ?>"></div><br>
	<div class="labelForm">Назначение:</div><div class="formInput"><input type="text" name="target"  value="<?php if (isset($row['target']) ) echo $row['target']; ?>"></div><br>
	<div class="labelForm">Процесс:</div><div class="formInput"><input type="text" name="process"  value="<?php if (isset($row['process']) ) echo $row['process']; ?>"></div><br>
	<div class="labelForm">Код SAP:</div><div class="formInput"><input type="text" name="sapCode"  value="<?php if (isset($row['sapCode']) ) echo $row['sapCode']; ?>"></div><br>
	<div class="labelForm">ГОСТ:</div><div class="formInput"><input type="text" name="gost"  value="<?php if (isset($row['gost']) ) echo $row['gost']; ?>"></div><br>
	<div class="labelForm">СТО:</div><div class="formInput"><input type="text" name="sto"  value="<?php if (isset($row['sto']) ) echo $row['sto']; ?>"></div><br>
	<div class="labelForm"></div><input type="submit" value="Записать"><input type="button" value="Удалить" onclick="document.location.href='edit.php?del='+<?php  if( $_GET['id']==0){ echo '0" disabled'; } else echo $row['idNomenclatures'].'"';?>>
</div>
</form>
<?php 
	}
	else{
	require 'cacheProductionToJson.php';
	if (!isset($_GET['del']))
		if( $_POST['id']=='0') {
			echo '<br>POST='.$_POST['id']."<br>";
			if ($_POST['totalUnits']=='')$_POST['totalUnits']=0;
			if ($_POST['layers']=='')$_POST['layers']=0;
			if ($_POST['h']=='')$_POST['h']=0;
			$q="INSERT INTO factory.nomenclatures(fullName, internalCode, role, customer, form, shortName, color, totalUnits, boxing, layers, h, target, process, sapCode, gost, sto, DateCreated) 
			VALUES ('".$_POST['fullName']."', '".$_POST['internalCode']."', '".$_POST['role']."', '".$_POST['customer']."', '".$_POST['form']."', '".$_POST['shortName']."', '".$_POST['color']."', '".$_POST['totalUnits']."',
			'".$_POST['boxing']."', '".$_POST['layers']."', '".$_POST['h']."', '".$_POST['target']."', '".$_POST['process']."', '".$_POST['sapCode']."', '".$_POST['gost']."', '".$_POST['sto']."', NOW())";
			
		}	
		else $q="UPDATE factory.nomenclatures SET fullName='".$_POST['fullName']."', internalCode='".$_POST['internalCode']."', role='".$_POST['role']."', customer='".$_POST['customer']."',
				form='".$_POST['form']."', shortName='".$_POST['shortName']."', color='".$_POST['color']."', totalUnits='".$_POST['totalUnits']."', boxing='".$_POST['boxing']."',
				layers='".$_POST['layers']."', h='".$_POST['h']."', target='".$_POST['target']."', process='".$_POST['process']."', 
				sapCode='".$_POST['sapCode']."', gost='".$_POST['gost']."', sto='".$_POST['sto']."' WHERE idNomenclatures='".$_POST['id']."'";
		if (isset ($_GET['del']))$q="UPDATE nomenclatures SET DateExcluded=NOW() WHERE idNomenclatures='".$_GET['del']."'";
			$qres=mysql_query($q) or die ("Ошибка MySQL: ".mysql_error());
		if ($qres>0){
			echo '<span style="font-size:2em;color:green;">Успешно. </span>';
			if (isset($_POST['fullName'])) {
				echo $_POST['internalCode'].', '.$_POST['fullName'].'.<br>';
			}
		}
		else{
			echo '<span style="font-size:2em;color:red;">ОШИБКА. <br></span>'.$q;
		}
		echo '';
	}
?>
<br><a style="margin-left:10cm;" href="/nomenclature/index.php">← Назад к списку</a>
</body>
</html>