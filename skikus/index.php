<?php
	session_start();
?>
<html>
<head>
	<title>РСЗ. Контроль качества</title>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="moment.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="UserData.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="defects.js" charset="utf-8"></script>
	<!--<script language="javascript" type="text/javascript" src="../auth.js" charset="utf-8"></script>-->
	<script language="javascript" type="text/javascript" src="../production.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="params.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../customWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../MiniMessage.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="code.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="net.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="ssc.css">
	<link rel="stylesheet" type="text/css" href="table.css">
</head>
<body>
	<div id="workspace">
		<div class="paddingLeft20Pr" > 
			Линия <span class="usable" style="font-weight:500;font-size:1.2em;" id="current_line" onclick="customWindow.show(lineSelectorData)">...</span>
			<span class="" style="font-weight:500;font-size:1.2em;margin-left:3em;" id="current_production">...</span>
			<span class="" style="font-weight:500;font-size:1.2em;margin-left:3em" id="serverTime"></span>
			<span id="authSpan" style="margin-left:3em;"></span>
			<span id="modeSpan" style="margin-left:3em;" class="usable" onclick="switchMode()"></span>
			<span id="paramSpan" style="margin-left:3em;" class="usable" onclick="customWindow.show(selectParamData)"> Параметры</span>
		</div>
		<br>
		<br>
		<div style="text-align:center">
			<div id="table"></div>
		</div>
		<br>
		<br>
		<div style="text-align:center">
			<div id="tools" style="display:none;" ><input type="button" value="Снять все браки" onclick="removeAllFlaw()"><input type="button" value="Снять все формы" onclick="unmountAllMolds()"> Брак на линии: <span id="totalFlaw"></span>%</div>
		</div>
	</div>
	<div id="log"></div>
	</div> 
	<div id="messageDivWraper" style="z-index:100;position:absolute;top:0px;right:0px;display:block;text-align:right;width:auto;"></div>
	</div>
	<script type="text/javascript">
		moment.lang("ru");
		var mode = 1;
        $(document).ready(function(){
			<?php if(isset($_GET['line'])){if($_GET['line']!='') {echo 'currentLine='.$_GET['line'].';';}}else{}?>
			getProductionList(f);
		});
		function f(prodStr){
			//log(prodStr);
			log('ПРОДУКЦИЯ ЗАГРУЖЕНА!');
			log(prodStr);
			productionList = $.parseJSON(prodStr);
			setCurrentLine(currentLine);
		}
	</script>
</body>
</html>