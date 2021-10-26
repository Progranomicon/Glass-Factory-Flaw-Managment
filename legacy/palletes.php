<?php 
session_start();
include_once "conn.php";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<title>Отчеты паллеты</title>
<script type="text/javascript" src="js/jquery-1.2.1.js"></script>
<script type="text/javascript" src="js/ui.datepicker.js"></script>
<link rel="stylesheet" type="text/css" href="style_1.css" >
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
	<div class="menu_div">  [<A HREF="line_new_format.php"> Настройки </A>][<A HREF="gen_new_bar.php"> Штрихкод </A>] [<A HREF="index.php"> В начало </A>] пункт5 <br></div>
	<div class="main_block_div">
            <h3>Отчеты по паллетам</h3>
    <?php 
    if (!isset($_POST['from_hour']))
    {
        echo '<p>ВВедите начальную и конечную даты. </p><FORM action="palletes.php" METHOD=POST>';
        include "report_form.php";
        echo '<br>
               <SELECT name=byWhat>
                <option selected value="1">Поступило на склад</option>
                <option selected value="2">Вернулось в цех</option>
                <option selected value="Отгружено">Отгружено</option>
               </SELECT>
         <SELECT id="line_n" name="line_number" onChange="get_allert_state();">';
        for($iii=1;$iii<10;$iii++) 
        { 
            print "<option value=".$iii.'>'.$iii.'</option>';                                              
        }
        print '</SELECT></option>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type=submit value="Подготовить"> </FORM>';
    }
    else
    {
        if (($_POST['date1']=="") | ($_POST['date2']=="")) 
        {
            print "Не задана одна или обе даты.<br><A HREF=palletes.php> Вернуться </A>";
            return 0;
        }
        $events=array();
        $date1_elements = explode(".", $_POST['date1']);
        $from_date_time = $date1_elements[2].'-'.$date1_elements[1].'-'.$date1_elements[0]." ".$_POST['from_hour'].":".$_POST['from_minute'].":00";
        $date2_elements = explode(".", $_POST['date2']);
        $to_date_time = $date2_elements[2].'-'.$date2_elements[1].'-'.$date2_elements[0]." ".$_POST['to_hour'].":".$_POST['to_minute'].":00";
        $query="select * from steklo.pallets WHERE eventDateTime>='".$from_date_time."' AND eventDateTime<='".$to_date_time."' ORDER BY eventDateTime";
        $q2="select * from steklo.events_and_byers";
        $res2 = mysql_query($q2);
        while ($rec=mysql_fetch_assoc($res2)){
            $events[$rec['id']]=$rec['title'];
        }
        mysql_free_result($res2);
        $res=mysql_query($query);
        if (!$res) { print "За выбранный период нет данных.<br><A HREF=palletes.php> Вернуться </A>. $res2"; print $query; return 0; }
        $total =0;
        if ($_POST['byWhat']!='Отгружено'){
            echo'<TABLE id="table_with_report"><tr><th>Код паллета</th>
                            <th>Дата события</th>
                            <th>Событие</th>
                        </tr>';
           while ($rec=mysql_fetch_assoc($res)){
                if ($rec['eventId']==$_POST['byWhat']){
		echo'<tr><td><A HREF="palletHistory.php?palletId='.$rec['sn'].'">'.$rec['sn'].'</A></td><td>'.$rec['eventDateTime'].'</td><td>'.$events[$rec['eventId']].'</td></tr>';
                $total +=1;
                }
           }
           echo'</TABLE>';
           echo'<hr size=1></hr>';
           echo 'Всего за период паллет: '.$total.'.<br> ';
        }
        else{
            echo'<TABLE id="table_with_report"><tr><th>Код паллета</th>
                            <th>Дата события</th>
                            <th>Событие</th>
                        </tr>';
           while ($rec=mysql_fetch_assoc($res)){
                if ($rec['eventId']>2){
		echo'<tr><td><A HREF="palletHistory.php?palletId='.$rec['sn'].'">'.$rec['sn'].'</A></td><td>'.$rec['eventDateTime'].'</td><td>'.$events[$rec['eventId']].'</td></tr>';
                $total +=1;
                }
           }
           echo'</TABLE>';
           echo'<hr size=1></hr>';
           echo 'Всего за период паллет: '.$total.'.<br> ';
        }
    }
    ?>
            </div>
 <div class="footer_div">ОГМетр. 2011 год.
</div><script type="text/javascript">
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