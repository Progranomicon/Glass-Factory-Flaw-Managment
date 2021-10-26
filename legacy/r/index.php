<?php 
	require_once "Auth.php";
	/*INSERT INTO `RealtyObjects`(`ID`, `CurrentDate`, `State`, `ObjectType`, `Area`, `Address`, `S`, `Price`, `Phone`, `UserID`, `Comment`) 
	VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11])*/
	require 'connect.php';
?>

<!DOCTYPE html>

<html>
	<head>
		<script type="text/javascript" src="scenario.js"></script>
		<script type="text/javascript" >
			<?php 
				$i=0;
				$RO = mysql_query("SELECT * FROM RealtyObjects WHERE State='1'");
				while ($RetOb = mysql_fetch_assoc($RO)) {
					echo 'realty_objects['.$i.']={"id":' . $RetOb['ID'] . ', "object_type":' . $RetOb['ObjectType'] . ', "area":' . $RetOb['Area'] . ', "address":"' . $RetOb['Address'] . '", "s":' . $RetOb['S'] . ', "price":' . $RetOb['Price'] . '}; '.chr(13);
					$i++;
				}	
			?>
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="css.css" />
	</head>
	<body>
		<div id="state" style="display:none;">
			<input name="objects_type" type="text" value="">
		</div>
		<div id="top_area">
		</div>
		<div id="site">
			<div id="first_select_area">
				<a class="first_select_link" href="javascript:selectTypeOfObjects(1);">Квартиры</a>
				<a class="first_select_link" href="javascript:selectTypeOfObjects(4);">Дома</a> 
				<a class="first_select_link" href="javascript:selectTypeOfObjects(2);">Участки</a> 
				<a class="first_select_link" href="javascript:selectTypeOfObjects(3);">Нежилая недвижимость</a>
			</div>
			<div id="main_area">
				<span id="objects_type" style="font-size:3em;font-family:Helvetica;"></Span><br>
				<span id="objects_types_else" style="font-size:1.2em;font-family:Helvetica;" ></span>
			</div>
			<div id="objects_list">
				
			</div>
		</div>
		<div id="logon"><a href="logon.php">Вход</a></div>
		<div id="full_obj_info"></div>
	<script type="text/javascript">
	</script>
	</body>
</html>