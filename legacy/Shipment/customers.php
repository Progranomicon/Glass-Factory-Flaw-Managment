<?php /* кешируем форматы*/
	require_once "/../conn.php";
	date_default_timezone_set("Europe/Moscow");
?>
<html>
	<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<link type="text/css" rel="stylesheet" href="css.css" />
	</head>
	<body>
	<style type="text/css">
	#Editor{
		position:absolute;
		display:none;
		top:400;
		left:400;
		border:1px solid black;
		padding:10px;
	}
	#consumerName{
		width:10cm;
	}
	#okBut{
		width:3cm;
	}
	</style>
	<?php if (!isset($_GET['shsess']))
		echo '<div style="font-family:Helvetica;font-weight:lighter;font-size:4em;margin-top:1em;margin-left:2em;">Грузополучатели</div>';
	?>
		<div id="<?php if (!isset($_GET['shsess'])) echo "content" ?>">
		<?php 
			
		 /*заглавие*/
				echo "<br><br>";
				echo '<div id="CunsumerList"></div>';
		?>
		</div>
		<div id="Editor"><div>Введите новое название<a href="javascript:HideEditor();" style="font-family:Helvetica;float:right;">X</a></div><br><div><input type="text" id="consumerName"><input type="button" value="Сохранить" id="okBut" onclick="MakeChange()"></div>
		<a href="javascript:deleteItem()">Удалить</a>
		<input type="hidden" id="id" value="0">
		</div>
		<div id="debug">
		</div>
		<script type="text/javascript">


			var xmlHttp  = false;
			var xmlHttp2 = false;
			var xmlHttp3 = false;
			if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
				xmlHttp = new XMLHttpRequest();
			}
			if (!xmlHttp2 && typeof XMLHttpRequest != 'undefined') {
				xmlHttp2 = new XMLHttpRequest();
			}
			if (!xmlHttp3 && typeof XMLHttpRequest != 'undefined') {
				xmlHttp3 = new XMLHttpRequest();
			}
			function ebi(str){/* ElementById*/
				return document.getElementById(str);
			}
			function CallList(){
				var url = "aGetList.php";
				xmlHttp.open("GET", url, true);
				xmlHttp.onreadystatechange = ShowList;
				xmlHttp.send(null);
			}
			function deleteItem(item){
				var item=ebi('id').value;
				var url = "aDelete.php?id="+item;
				xmlHttp2.open("GET", url, true);
				xmlHttp2.onreadystatechange = ShowMessage;
				xmlHttp2.send(null);
				
			}
			function ShowList(){
				if (xmlHttp.readyState == 4) {
					var response = xmlHttp.responseText;
					ebi('CunsumerList').innerHTML=response;
				}
			}
			function ShowMessage(){
				if (xmlHttp2.readyState == 4) {
					var response = xmlHttp2.responseText;
					alert(response);
					//ebi('Debug').innerHTML=response;
					
				}
				ebi('Editor').style.display='none';
				CallList();
			}
			function MakeChange(){
				name=ebi('consumerName').value;
				id=ebi('id').value;
				var url = "aMakeChange.php?id="+id+"&name="+encodeURIComponent(name);
				xmlHttp3.open("GET", url, true);
				xmlHttp3.onreadystatechange = ShowResult;
				xmlHttp3.send(null);
				ebi('Editor').style.display='none';
			}
			function ShowResult(){
				if (xmlHttp3.readyState == 4) {
					var response = xmlHttp3.responseText;
					alert(response);
				}
				CallList();
			}
			function ShowEditor(id,name){
				ebi('Editor').style.display='block';
				ebi('id').value=id;
				ebi('consumerName').value=name;
			}
			function HideEditor(){
				ebi('Editor').style.display='none';
			}
			CallList();
		</script>
	</body>
</html>