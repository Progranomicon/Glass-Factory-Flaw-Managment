<?php 
session_start();
$_SESSION['line_selected']=4;
if (isset($_POST['selected_line'])){
$_SESSION['line_selected']=$_POST['selected_line'];

}
	$host = "192.168.113.111";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'steklo'; //до сюда я думаю ясно 
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка при соединении с БД: ".mysql_error());
	mysql_select_db($db_name);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<title>Отчеты и настройки</title>
<link rel="stylesheet" type="text/css" href="style_1.css" >
<script type="text/javascript" src="js/jquery-1.2.1.js"></script>
<script type="text/javascript" src="js/ui.datepicker.js"></script>
<style type="text/css">
* {
    margin:0;
    padding:0;
}

html, body {
    /*background-color:#E2F2E2;*/
}


/* Стили для jQuery UI Datepicker */
#datepicker_div, .datepicker_inline {
	font-family: "Trebuchet MS", Tahoma, Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	padding: 0;
	margin: 0;
	background: #DDD;
	width: 185px;
}
#datepicker_div {
	display: none;
	border: 1px solid #FF9900;
	z-index: 10;
}
.datepicker_inline {
	float: left;
	display: block;
	border: 0;
}
.datepicker_dialog {
	padding: 5px !important;
	border: 4px ridge #DDD !important;
}
button.datepicker_trigger {
	width: 25px;
}
img.datepicker_trigger {
	margin: 2px;
	vertical-align: middle;
}
.datepicker_prompt {
	float: left;
	padding: 2px;
	background: #DDD;
	color: #000;
}
*html .datepicker_prompt {
	width: 185px;
}
.datepicker_control, .datepicker_links, .datepicker_header, .datepicker {
	clear: both;
	float: left;
	width: 100%;
	color: #FFF;
}
.datepicker_control {
	background: #0099FF;
	padding: 2px 0px;
}
.datepicker_links {
	background: #ffc9ea; /*фон строки пред-сегодня-след*/
	padding: 2px 0px;
}
.datepicker_control, .datepicker_links {
	font-weight: bold;
	font-size: 80%;
	letter-spacing: 1px;
}
.datepicker_links label {
	padding: 2px 5px;
	color: #6699CC;
}
.datepicker_clear, .datepicker_prev {
	float: left;
	width: 34%;
}
.datepicker_current {
	float: left;
	width: 30%;
	text-align: center;
}
.datepicker_close, .datepicker_next {
	float: right;
	width: 34%;
	text-align: right;
}
.datepicker_header {
	padding: 1px 0 3px;
	background: #6699CC;
	text-align: center;
	font-weight: bold;
	height: 1.3em;
}
.datepicker_header select {
	background: #6699CC;
	color: #000;
	border: 0px;
	font-weight: bold;
}
.datepicker {
	background: #CCC;
	text-align: center;
	font-size: 100%;
}
.datepicker a {
	display: block;
	width: 100%;
}
.datepicker .datepicker_titleRow {
	background: #61d2e7;
	color: #000;
}
.datepicker .datepicker_daysRow {
	background: #FFF;
	color: #666;
}
.datepicker_weekCol {
	background: #B1DB87;
	color: #000;
}
.datepicker .datepicker_daysCell {
	color: #000;
	border: 1px solid #DDD;
}
#datepicker .datepicker_daysCell a {
	display: block;
}
.datepicker .datepicker_weekEndCell {
	background: #a0e8fc;
}
.datepicker .datepicker_daysCellOver {
	background: #FFF;
	border: 1px solid #777;
}
.datepicker .datepicker_unselectable {
	color: #888;
}
.datepicker_today {
	background: #61d2e7 !important;
}
.datepicker_currentDay {
	background: #4499ee !important;
}
#datepicker_div a, .datepicker_inline a {
	cursor: pointer;
	margin: 0;
	padding: 0;
	background: none;
	color: #000;
}
.datepicker_inline .datepicker_links a {
	padding: 0 5px !important;
}
.datepicker_control a, .datepicker_links a {
	padding: 2px 5px !important;
	color: #000 !important;
}
.datepicker_titleRow a {
	color: #000 !important;
}
.datepicker_control a:hover {
	background: #FDD !important;
	color: #333 !important;
}
.datepicker_links a:hover, .datepicker_titleRow a:hover {
	background: #FFF !important;
	color: #333 !important;
}
.datepicker_multi .datepicker {
	border: 1px solid #83C948;
}
.datepicker_oneMonth {
	float: left;
	width: 185px;
}
.datepicker_newRow {
	clear: left;
}
.datepicker_cover {
	display: none;
	display/**/: block;
	position: absolute;
	z-index: -1;
	filter: mask();
	top: -4px;
	left: -4px;
	width: 193px;
	height: 200px;
}
/* Стили для jQuery UI Datepicker */

#example {
  float:left;
  position:relative;
  width:100px;
}
#example2 {
  float:left;
  position:relative;
  width:100px;
}
#exampleRange {
  float:right;
  position:relative;
  width:200px;
  right:10px;
}

</style>
</head>
<body>
	<?php include "main_header.php";?>
	<div class="menu_div"> [<A HREF="index.php"> В начало </A>] пункт2 пункт3 пункт4 пункт5 пунктN</div>
	<div class="main_block_div">
        <h3>Отчеты по линиям</h3>    
            <p>
        <?php print 'Выбрана линия №'.$_SESSION['line_selected'].'.';
	date_default_timezone_set("Europe/Moscow");
	$arr_date = getdate(time());
	//print 'Секунд:'.$arr_date['seconds'];
	$que='SELECT * FROM formats WHERE line="'.$_SESSION['line_selected'].'" AND date_time<="'.$arr_date['year']."-".$arr_date['mon']."-".$arr_date['mday']." ".$arr_date['hours'].":".$arr_date['minutes'].":".$arr_date['seconds'].'" ORDER BY date_time DESC LIMIT 1';
	//print $que;
	$res_last_before_report=mysql_query($que) or die ("Неудалось узнать последний формат. Запрос: ".$que.'<br>');
	$fin_recd = mysql_fetch_assoc($res_last_before_report);
	print ' Текущий формат продукции:'.$fin_recd["format"];
	mysql_free_result($res_last_before_report);
	mysql_close();?>
	</p><p>ВВедите начальную и конечную даты. </p> 
<FORM action="report_p.php" METHOD=POST> <?php include "report_form.php"?> <br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type=submit value="Получить отчет"> </FORM>
        </div>
	<div class="footer_div">ОГМетр. 2011 год.
</div>
<script type="text/javascript">
$(document).ready(function(){
  // ---- Календарь -----
  $('#example').attachDatepicker();
  $('#example2').attachDatepicker();
  $('#exampleRange').attachDatepicker({
  	rangeSelect: true,
  	yearRange: '2000:2010',
  	firstDay: 1
  });
  // ---- Календарь -----
});
</script>        
</body>
</HTML>