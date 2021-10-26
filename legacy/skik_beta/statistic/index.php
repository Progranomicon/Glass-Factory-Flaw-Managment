<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="../tools.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../defects.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../auth.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../moment.min.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../readable-range.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="../langs.min.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="jquery.calendarPicker.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="stuff.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="calendar.js" charset=utf-8></script>
	<!--<script language="javascript" type="text/javascript" src="report.js" charset=utf-8></script> -->
	<link rel="stylesheet" type="text/css" href="css.css">
	<link rel="stylesheet" type="text/css" href="calendar.css">
	<link rel="stylesheet" type="text/css" href="jquery.calendarPicker.css">
</head>
<body>
	<script src="highstock.js"></script>
	<script src="exporting.js"></script>
	<div id="workspace">
		<div class="reportHeader">
			<div id="currentLine" class="inlineDiv headerItem" onclick="popup('Выбор линии', lineSelectContent(), 20, 65);">Линия </div>
			<div id="lastProduction" class="inlineDiv headerItem" onclick="popup('Продукция', getListFromProductionOnLine(), 130, 65);">[Загрузка...]</div>
			Форм: <div id="forms" class="inlineDiv headerItem" onclick=""></div>
			C <div id="startDate" class="inlineDiv headerItem" onclick="popup('Выбор начальной даты', getCalHtml('startReportDate'),330,65);updateCal();"> [ждите...]</div> 
			ПО <div id="endDate" class="inlineDiv headerItem" onclick="popup('Выбор конечной даты', getCalHtml('endReportDate'),330,65);updateCal();">[ждите...]</div> 
			<!--<a class="btn" href="javascript:function e(){history.back()}; e();"> Вернуться на главный экран </a> -->
		</div>
		
	</div>
	<div id="list_of_changes"></div>
	<div>
		<div id="barsReject" style="float:left;width:45%"></div>
		<div id="barsLevel" style="float:left;width:45%"></div>
		<div id="barsByMold" style="float:left;width:100%;"></div>
	</div>
	<div>
		
	</div>
	<div id="reportByMolds"></div>
	
	<div id="popupWindow">
		<b><span id="popupHeader">Заголовок  </span></b> &nbsp <img src="../close2.png" onclick="closePopup()" class="close_img">
		<div id="popupContent"></div>
	</div>
	<div id="log" style="text-align:left;"></div>
	<script type="text/javascript">
		moment.lang("ru");
		var production_list;
        $(document).ready(function(){
			getProdList();
			lineSelect(4);
		});
	</script>
</body>
</html>