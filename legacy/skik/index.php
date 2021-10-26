<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="defects.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="auth.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="production.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="defects_forms.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="js.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="moment.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../Bottles.js" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="css.css">
	<link rel="stylesheet" type="text/css" href="table.css">
</head>
<body>
	<div id="workspace">
		<div class="statusDiv"> Линия <span style="font-weight:500;font-size:1.2em;" id="current_line">...</span>, Посл. обновление: <span id="today" style="font-weight:700"> </span>, Пользователь: <span id="user" style="font-weight:700;"><a href="javascript:start_auth();" style="color:red">Нажмите для авторизации.</a>  </span> Наименование продукции: <span style="font-weight:500;font-size:1.2em;" id="current_production">...</span> <a class="btn" href="statistic"> Статистика </a>
		</div>
		<br>
		<br>
		<div id="main_table"></div>
		<br>
		<br>
	</div>
	<div id="production_selector" class="popup_menu">Выберите продукцию:<img src="close.jpg" onclick="show_production_selector('off')" class="close_img"><br><br><input type="text" placeholder="Моментальный поиск" id="production_selector_input" onkeyup="fill_list();" style="width:300px;"><div id="production_list"></div></div>
	<div id="defects_selector" class="popup_menu">Выберите дефект:<img src="close.jpg" onclick="show_defects_selector('off')" class="close_img"><br><br><input type="text" placeholder="Моментальный поиск" id="defects_selector_input" onkeyup="fill_defects_list();" style="width:300px;"><div id="defects_list"></div></div>
	<div id="def_details_selector" class="popup_menu"><img src="close.jpg" onclick="show_def_details_selector('off')" class="close_img"><div id="selected_defect" ></div><hr>Укажите подробности дефекта:<br>Значение параметра (если требуется):<br><input type="text" placeholder="" id="param_value"><br>Корректирующее мериприятие:<br><div id="action_selector" style="text-align:center;"></div>
	Процент брака:<br>
	<input type="text" id="defects_part" placeholder="XXX.XX"><br>Примечание:<br><input type="text" placeholder="Примечание" id="comment" style="width:100%"><br><br><input type="button" value="Добавит дефект" onclick="set_defect()"></div>
	<div id="form_selector" class="popup_menu" style="width:660px;">Выберите форму:<img src="close.jpg" onclick="show_form_selector('off')" class="close_img"><br><br><div id="form_list"></div></div>
	<div id="log"></div>
	<div id="fade" onclick="show_production_selector('off'); show_defects_selector('off');show_def_details_selector('off');show_form_selector('off')"></div>
	<div style="display:none">
		<input type="text" id="form_code">
		<input type="text" id="defect_code">
		<input type="text" id="action_code">
	</div>
	<div id="waitDiv" style="">
		<img src="images/wait.gif" style="padding-top:100px;padding-left:100;"><br>
		<span style="font-size:56px; color:darkblue;">Ждите. Обработка...</span>
	</div>
	<div style="display:none" id="lineSelector" class="popup_menu">
	</div>
	<script type="text/javascript">
		moment.lang("ru");
		var current_line=5;
		var bottles=new Bottles();
        $(document).ready(function(){
			<?php if(isset($_GET['line'])){if($_GET['line']!='') {echo 'current_line='.$_GET['line'].';';}}else{}?>
			setLine(current_line);
			is_auth();
			
		});
	</script>
</body>
</html>