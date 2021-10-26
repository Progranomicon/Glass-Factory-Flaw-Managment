<?php
	session_start();
?>
<html>
<head>
	<title>РСЗ. Check v6</title>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	
	<script language="javascript" type="text/javascript" src="moment-with-locales.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="highcharts.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../customWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../MiniMessage.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="rigCode.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="css.css">
</head>
<body>
	<div id="header">
		<div id="dateFrom" style="display:inline-block;vertical-align:top" class="usable" onclick="calendar(dateStart, 400, 100, calCallback)"></div>
		<div id="dateTo" style="display:inline-block;vertical-align:top" class="usable" onclick="calendar(dateEnd, 400, 100, calCallback)"></div>
	</div>
	<h3>В целом за период</h3>
	<div class="statDiv">
	Всего изделий проверено: <span id="cuttedSpan">0</span>, всего с дефектами: <span id="ejectedSpan">0</span> <br>
	Годных изделий: <span id="performanceSpan"></span>
	</div>
	<h3>Графики</h3>
	<div id="mainGraph"></div>
	<!--<div id="cuttedGraph"></div>
	<div id="ejectedGraph"></div>
	<div id="idleGraph"></div>
	<div id="ejectedWareGraph"></div>-->
	
	<div id="messageDivWraper" style="z-index:100;position:absolute;top:0px;right:0px;display:block;text-align:right;width:auto;"></div>
	<br>
	<div id="log"></div>
	<script type="text/javascript">
		var dataObj;
		el('dateFrom').innerHTML = moment().format('D MMM YYYY HH:mm');
		moment.lang("ru");
		$(document).ready(function(){
			calCallback();
		});		
	</script>
</body>
</html>