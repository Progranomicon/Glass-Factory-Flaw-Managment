<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../moment.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="shiping.js" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="shiping.css">
<body>
	<div id="workspace">
	</div>
	<div id="params">
		<div id="productionSelector"></div>
		<div id="transport"></div>
		<div>
			с <span class="active" id="startDate" onclick="calendar(startReportDate,100,100, updateDate)"></span> по <span id="endDate"  class="active" onclick="calendar(endReportDate,100,100, updateDate)"></span>
		</div>
		<input type="button" onclick="getPassportData()" value="Формирование пасспорта">
	</div>
	<div id="log">
	</div>
	<script type="text/javascript">
		moment.lang("ru");
		$(document).ready(function(){
			getProduction();
			switcherClick('Авто', switcherStates, 'transport');
			updateDate();
		});
	</script>
</body>
</html>