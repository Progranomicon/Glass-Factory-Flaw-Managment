<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Пасспорт продукции</title>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<!--<script language="javascript" type="text/javascript" src="../../production.js" charset="utf-8"></script>-->
	<script language="javascript" type="text/javascript" src="../../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../moment-with-locales.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="highcharts.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../UserData.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../defects.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../params.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../customWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../ModalWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../MiniMessage.js" charset="utf-8"></script>
	
    <script language="javascript" type="text/javascript" src="molds_code.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="code.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="stats.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="net.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="css.css">
</head>
<body>
	<div id="header">
		<div id="currentProduction" style="display:inline-block;vertical-align:top" class="usable" onclick="customWindow.show(productionSelectorData)"></div>
		<div id="currentPeriod" style="display:inline-block; text-align:center;" class="usable" onclick="customWindow.show(periodSelectorData)"></div>
		<div id="dateFrom" style="display:inline-block;vertical-align:top" class="usable" onclick="calendar(dateFrom, 400, 100, calCallback)"></div>
		<div id="dateTo" style="display:inline-block;vertical-align:top" class="usable" onclick="calendar(dateTo, 400, 100, calCallback)"></div>
		<div id="report_type" style="display:inline-block;vertical-align:top" class="usable" onclick="showRepTypeSelector();">Тип отчета</div>
	</div>
	<div id="statsDiv">
		
	</div>
	<div id="messageDivWraper" style="z-index:100;position:absolute;top:0px;right:0px;display:block;text-align:right;width:auto;"></div>
	<br>
	<div id="log"></div>
	<script type="text/javascript">
		moment.locale("ru");
		var currentProduction;
		$(document).ready(function(){
			<?php if(isset($_GET['production'])){if($_GET['production']!='') {echo 'currentProduction='.$_GET['production'].';';}}else{}?>
			getProductionList();
		});
	</script>
</body>
</html>