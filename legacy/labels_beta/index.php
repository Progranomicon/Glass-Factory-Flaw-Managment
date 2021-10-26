<html>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="jquery.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="js.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="tools.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="../Bottles.js" charset=utf-8></script>


<title>Этикетки</title>
<link rel="stylesheet" type="text/css" href="css.css" > 
<link rel="stylesheet" type="text/css" href="toast.css" > 
</head>
<body>
<div id="labelPreview">
	
</div>
<div id="productionListWrap" class="productionList" style="height:13cm;width:13cm;overflow:hidden;border:1px solid black;">
	<input id="search" type="text" class="midInput" placeholder="Быстрый поиск по номеру" style="float:left" onkeyup="showList()">
	<div>
		<div id="productionList" class="productionList" style="	width:-moz-available;">
			Загрузка. Ждите.
		</div>
	</div>
</div>
<div id="genForm" class="productionList" style="display:none">
	<span id="selectedProduct" style="font-size:20px"></span><br>
	Номера паллетов<br>
	Последний номер: <span id="numStart"></span><br>
	
	Сделать <input type="text" id="count" class="shortInput"> штук<br>
	Линия <span id="line"></span><br>
	<input type="button" onclick="generate()" value="Создать ярлыки">
	<input type="button" onclick="goBack('genForm')" value="Назад">
	
</div>
<script language="javascript" type="text/javascript">
	var bottles = new Bottles();
	el("labelPreview").innerHTML=labelPattern;
	getProductionData();
</script>
<div id="log"></div>
</body>
</html>