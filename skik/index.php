<?php
	session_start();
?>
<html>
<head>
	<title> Контроль качества</title>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="moment-with-locales.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="UserData.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="defects.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="params.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../ModalWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../customWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../MiniMessage.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="code.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="net.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../myAlert.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="ssc.css">
	<link rel="stylesheet" type="text/css" href="table.css">
</head>
<body>
	<div id="workspace">
		<div class="paddingLeft2Pr" > 
			Линия <span class="usable" style="font-weight:500;font-size:1.2em;" id="current_line" onclick="customWindow.show(lineSelectorData)">...</span>
			<span class="" style="font-weight:500;font-size:1.2em;margin-left:3em;" id="current_production">...</span>
			<span class="" style="font-weight:500;font-size:1.2em;margin-left:3em" id="serverTime"></span>
			<span id="authSpan" style="margin-left:3em;"></span>
			<span id="modeSpan" style="margin-left:3em;" class="usable" onclick="switchMode()"></span>
			<span id="paramSpan" style="margin-left:3em;" class="usable" onclick="customWindow.show(selectParamData)"> Параметры</span>
			<span id="paramSpan" style="margin-left:3em;" class="usable" onclick="customWindow.show(selectReport)"> Отчеты</span>
			<span id="paramSpan" style="margin-left:3em;" class="usable" onclick="modalWindow.show('Опишите простой', downtimeMaker)"> ПРОСТОЙ</span>
		</div>
		<br>
		<br>
		<div style="text-align:center">
			<div id="table"></div>
			<div style="width:99%;align:center">
				<div id="mInspection"></div>
			</div>
		</div>
		<br>
		<br>
		<div style="text-align:center">
			<div id="tools" ><input id="removeAllFlaw" type="button" value="Снять все браки" onclick="removeAllFlaw()"><input id="removeAllMolds" type="button" value="Снять все формы" onclick="unmountAllMolds()"><input id="unmountAllSFM" type="button" value="Снять все черн. формы и кольца" onclick="unmountAllSFM()"> <input id="recash" type="button" value="Перекэшировать" onclick="kashigo()">Брак на линии: <span id="totalFlaw"></span>% <input type="button" value="Test" onclick="myAlert('My short alert')"></div>
		</div>
	</div>
	<div id="log"></div>
	</div> 
	<div id="messageDivWraper" style="z-index:100;position:absolute;top:0px;right:0px;display:block;text-align:right;width:auto;"></div>
	</div>
	<script type="text/javascript">
		moment.locale("ru");
		var mode = 1;
		var fields =[];			
		var currentField = 0;
		var fieldsCount = 0;
		isAuth = true;
        $(document).ready(function(){

			fields = $('.smallField');
			$(window).keyup(function(event){
			fieldsCount = fields.size();
			if(fieldsCount > 0){
				switch(event.which){
					case 37: //стрелка влево
						currentField--;
						if(currentField<0) currentField = fieldsCount - 1;
						fields[currentField].focus();
						break;
					case 39: //стрелка вправо
						currentField++;
						if(currentField > (fieldsCount - 1)) currentField = 0;
						fields[currentField].focus();
						break;
					default:
						break;
				}
			}
		});
			<?php 	if(isset($_GET['line'])){
						if($_GET['line']!='') {echo 'currentLine='.$_GET['line'].";";}
						
					}else{
						echo "currentLine='0';";
					};
					echo chr(13);
					if(isset($_GET['userType'])){
						if($_GET['userType']!='') {
							echo 'userType="'.$_GET['userType'].'";';
						}}else{
							echo 'userType="OTK";';
						}?> /* OTK или SFM */
			getProductionList();
		});
	</script>
</body>
</html>