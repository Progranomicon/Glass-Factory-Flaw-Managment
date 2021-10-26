<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="js.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
<link rel="stylesheet" type="text/css" href="css.css" >
</head>
<body>
<?php ?>
<?php
	require "connect.php";
	if (!isset($_POST['toolName']) & !isset($_GET['del'])){
		$q="SELECT * from metrology where id='".$_GET['id']."'";
		$r=mysql_query($q);
		$row=mysql_fetch_assoc($r);
		echo '<h2>';
		if( $_GET['id']==0){ 
				echo 'Добавление нового прибора';
			}
		else{
			echo $row['toolName'];
			echo ', '.$row['sn'];
		}
		echo '</h2>';	
?>
<form action="edit.php" METHOD="POST">
<div>
	<div class="labelForm">ID: </div><div class="formInput"><input type="hidden" name="id" value="<?php echo $row['id']; if( $_GET['id']==0) echo '0';?>"><?php echo $row['id'];if( $_GET['id']==0) echo 'Новый'; ?></div><br>
	<div class="labelForm">Наименование:</div><div class="formInput"><input type="text" name="toolName"  value="<?php echo $row['toolName']; ?>"></div><br>
	<div class="labelForm">Серийный номер:</div><div class="formInput"><input type="text" name="sn"  value="<?php echo $row['sn']; ?>"></div><br>
	<div class="labelForm">Тип:</div><div class="formInput"><input type="text" name="toolType"  value="<?php echo $row['toolType']; ?>"></div><br>
	<div class="labelForm">Класс точности:</div><div class="formInput"><input type="text" name="accClass"  value="<?php echo $row['accClass']; ?>"></div><br>
	<div class="labelForm">Диапазон измерений:</div><div class="formInput"><input type="text" name="mRange" value="<?php echo $row['mRange']; ?>"></div><br>
	<div class="labelForm">Межповерочный интервал:</div><div class="formInput"><input type="text" name="frValidation" value="<?php echo $row['frValidation']; ?>"></div><br>
	<div class="labelForm">Последняя поверка:</div><div class="formInput"><input type="hidden" name="lastValidation" id="lastVld" value="<?php echo $row['lastValidation']; ?>"><span id="vldDate"></span></div><br>
	<div class="labelForm">Место использования:</div><div class="formInput"><input type="text" name="validationOrg" value="<?php echo $row['validationOrg']; ?>"></div><br>
	<div class="labelForm"></div><input type="submit" value="Записать"><input type="button" value="Удалить" onclick="document.location.href='edit.php?del='+<?php  if( $_GET['id']==0){ echo '0" disabled'; } else echo $row['id'].'"';?>>
</div>
</form>
<?php 
	}
	else{
	if (!isset($_GET['del']))
		if( $_POST['id']==0) {
			if ($_POST['frValidation']=='')$_POST['frValidation']=0;
			$q="INSERT INTO metrology(toolName, sn, toolType, accClass, mRange, frValidation, lastValidation, validationOrg) VALUES ('".$_POST['toolName']."', '".$_POST['sn']."', '".$_POST['toolType']."', '".$_POST['accClass']."', '".$_POST['mRange']."', '".$_POST['frValidation']."', '".$_POST['lastValidation']."', '".$_POST['validationOrg']."')";
			
		}
		else $q="UPDATE metrology SET toolName='".$_POST['toolName']."', sn='".$_POST['sn']."', toolType='".$_POST['toolType']."', accClass='".$_POST['accClass']."', mRange='".$_POST['mRange']."', frValidation='".$_POST['frValidation']."', lastValidation='".$_POST['lastValidation']."', validationOrg='".$_POST['validationOrg']."' WHERE id='".$_POST['id']."'";
	if (isset ($_GET['del']))$q="UPDATE metrology SET isDeleted='1' WHERE id='".$_GET['del']."'";
	$qres=mysql_query($q) or die ("Ошибка MySQL: ".mysql_error());
	if ($qres>0){
		echo '<span style="font-size:2em;color:green;">Успешно. </span>';
		if (isset($_POST['toolName'])) {echo $_POST['toolName'].', '.$_POST['sn'].'.<br>';}
	}
	else{
		echo '<span style="font-size:2em;color:red;">ОШИБКА. <br></span>'.$q;
	}
	echo '';
	}
?>
<br><a style="margin-left:10cm;" href="/kip/metrology/index.php">←Назад к списку</a>
<div id="popup" class="popupDateSel" style="display:none;">
	<input type="hidden" id="dDay" value="">
	<input type="hidden" id="dMonth" value="">
	<input type="hidden" id="dYear" value="">
	<div style="float:right;"><a href="javascript:function e(){ebi('popup').style.display='none';}; e();">X</a></div>
<?php 
	echo 'Выбор даты последней поверки. <br><div style="display:block; width:200px;float:left;border:1px solid #aaa;padding:3px;margin:3px">Число<br>';
	for ($i=1;$i<32;$i++){
		echo '<div class="selsel" onclick="applyValue(\'dDay\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div>';
	echo '<div style="display:block;width:100px;float:left;border:1px solid #aaa;padding:3px;margin:3px">Месяц<br>';
	for ($i=1;$i<13;$i++){
		echo '<div class="selsel" onclick="applyValue(\'dMonth\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div>';
	echo '<div style="display:block;width:200px;float:left;border:1px solid #aaa; padding:3px;margin:3px">Год<br>';
	for ($i=2012;$i<2031;$i++){
		echo '<div class="selsel" onclick="javascript:applyValue(\'dYear\',\''.$i.'\')">'.$i.'</div>';
	}
	echo '</div><br>';
	?>
	<p style="text-align:center;margin-top:1em;"><input type="button" onclick="ebi('popup').style.display='none';" value="Закрыть" style="display:inline-block;"></p>
</div>
<script>
	moment.lang("ru");
	if(ebi("lastVld").value!=''){ 
		ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment(ebi("lastVld").value, "YYYY-MM-DD").format('D MMMM YYYY')+'</a>';
	}
	else{
		ebi("vldDate").innerHTML='<a href="javascript:showDateSelector();">'+moment().format('D MMMM YYYY')+'</a>';
		ebi("lastVld").value=moment().format("YYYY-MM-DD");
	}
</script>
</body>
</html>