<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../moment.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../moment-with-locales.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../production.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../params.js" charset="utf-8"></script>	
	<script language="javascript" type="text/javascript" src="shiping.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="shiping.css">
<body>
	<div id="workspace">
	</div>
	<div id="params">
		<div id="productionSelector" class="active" onclick="showProductionSelector();">Выбрать продукцию</div>
		<div id="transport"></div>
		<div>
			с <span class="active" id="startDate" onclick="calendar(startReportDate,100,100, updateDate)"></span> по <span id="endDate"  class="active" onclick="calendar(endReportDate,100,100, updateDate)"></span>
		</div>
		<input type="button" onclick="getStatistic()" value="Формирование пасспорта">
	</div>
	<div id="passport" onclick="showhide('params');showhide('passport');" >
		<img src="logo.jpg">
		<h3>Паспорт качества</h3>
		<strong id="tareType"></strong><br>
		<span id="declaration"></span><br>
		<span id="declarationTime"></span><br>
		<span id="STO">СТО 99982965-001-2008,</span><br>
		<span id="">TP TC 005/2011</span><br>
		<div style="text-align:right;margin-top:-25px;padding-right:2cm"><img src="eac.jpg"><img id="colorImg"></div>
		<i><h3>Основные показатели качества</h3></i>
		<div id="summaryTable" style="display:inline-block">
		</div>
		<div style="text-align:left;">
		<b>Условия хранения</b> в закрытых отапливаемых или не отавливаемых помещениях, под навесом.	<br>
		<b>Срок годности</b>- 1 год с даты изготовления бутылки.	
		</div>
		<div>
			<div style="float:left;">
				A/машина______________<br>
				Партия (ТНН)№_________<br>
				Дата отгрузки_________<br>
				Куда отправлено_______<br>
				______________________
			</div>
			<div  style="float:right;">
			<span id="lot"></span><br>
				Количество бутылок в партии<br>
				___________________________<br>
				Дата изготовления бутылки<br>
				<span id="dates"></span>
			</div>
		</div>
	</div>
	<div id="log">
	</div>
	<script type="text/javascript">
		moment.lang("ru");
		$(document).ready(function(){
			getProductionList(f);
			switcherClick('Авто', switcherStates, 'transport');
			updateDate();
			showhide('passport');
		});
		function f(prodStr){
			//log(prodStr);
			productionList = $.parseJSON(prodStr);
			productionList = productionList.data.production;
			//alert('production loaded');
			//if(currentProduction) setCurrentProduction(currentProduction);
		}
	</script>
</body>
</html>