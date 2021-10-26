<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <script type="text/javascript" src="/../js/jquery-1.2.1.js"></script>
        <script type="text/javascript" src="/../js/ui.datepicker.js"></script>
        <link rel="stylesheet" type="text/css" href="styles.css" >
        
        <style type="text/css">
* {
    margin:0;
    padding:0;
}

html, body {
    /*background-color:#E2F2E2;*/
}


/* ����� ��� jQuery UI Datepicker */
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
	background: #ffc9ea; /*��� ������ ����-�������-����*/
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
/* ����� ��� jQuery UI Datepicker */

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
    <body style="font-family: Helvetica;">
        
<?php
    include "Settings.php";
    require "/../main_header.php";
    require '/../Menu.php';
    echo '<form>';
    print '<TABLE id="table_with_form_1" style="padding-left:1em;"><tr><th></th><th>Дата</th><th>Время</th><th></th></tr><tr><td>C</td><td>';
    print '<input name=FirstDate type=text value="" id="Date1">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td> ';
    print '<td><SELECT name=FirstDateHour id=FirstDateHour>';
    For($i=0;$i<=23;$i++)
            {
                    if ($i==7){
                            print print '<option selected value='.$i.'>'.$i.'</option>';
                    }
                    else {
                            print print '<option value='.$i.'>'.$i.'</option>';
                    }
            }
    print '</SELECT></td>';
    print '<td><SELECT name=FirstDateMinute id=FirstDateMinute>';
    For($i=0;$i<=59;$i++)
            {
                    if ($i==30){
                            print print '<option selected value='.$i.'>'.$i.'</option>';
                    }
                    else {
                            print print '<option value='.$i.'>'.$i.'</option>';
                    }
            }
    print '</SELECT></td><td style="padding-left:1cm;text-align:left;"> ← <a href="javascript:TimePreset(\'FirstDateHour\',\'FirstDateMinute\',0,0)">0:00</a> <a href="javascript:TimePreset(\'FirstDateHour\',\'FirstDateMinute\',7,30)">7:30</a> <a href="javascript:TimePreset(\'FirstDateHour\',\'FirstDateMinute\',19,30)">19:30</a></td>
	</tr>';
    print '<tr><td>По</td><td>';
    print '<input name="SecondDate" type=text value="" id="Date2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
    print '<td><SELECT name="SecondDateHour" id="SecondDateHour">';
    For($i=0;$i<=23;$i++)
            {
                    if ($i==19){
                            print print '<option selected value='.$i.'>'.$i.'</option>';
                    }
                    else {
                            print print '<option value='.$i.'>'.$i.'</option>';
                    }
            }
    print '</SELECT></td>';
    print '<td><SELECT name="SecondDateMinute" id="SecondDateMinute">';
    For($i=0;$i<=59;$i++)
            {
                    if ($i==30){
                            print print '<option selected value='.$i.'>'.$i.'</option>';
                    }
                    else {
                            print '<option value='.$i.'>'.$i.'</option>';
                    }
            }
    echo '</SELECT> </td><td style="padding-left:1cm;text-align:left;"> ← <a href="javascript:TimePreset(\'SecondDateHour\',\'SecondDateMinute\',23,59)">23:59</a> <a href="javascript:TimePreset(\'SecondDateHour\',\'SecondDateMinute\',7,30)">7:30</a> <a href="javascript:TimePreset(\'SecondDateHour\',\'SecondDateMinute\',19,30)">19:30</a></td></tr>';
    echo'<tr><td colspan=2>
        <input type=checkbox CHECKED id=L7 value=7 > Линия 7 <br>
        <input type=checkbox id=L8 value=8> Линия 8 <br>
        <input type=checkbox id=L9 value=9> Линия 9 <br>
        </td></tr></TABLE><input id="Submit" type="button"  value="Посмотреть" onClick="CallReport();"><input id="Req" type="HIDDEN"  value=""></form><br><hr>';
    
    echo'<div id="ReportAsIs" ></div>';
    
?>
        <div class="footer_div">ОГМетр. 2012 год.
        </div>
		<div id="InProcess"><div>Отчет готовится</div><img src="gears3.gif" style="display:inline-block;" ><div>Надо подождать<br></div>
        <script type="text/javascript">
$(document).ready(function(){
  $('#Date1').attachDatepicker();
  $('#Date2').attachDatepicker();
  document.getElementById("L7").checked = true;
});
var Production=[];
Production.push(["7", "5051", "Капля"], ["7", "5055", "Перед сдувом"], ["7", "5056", "Перед инспекцией"], ["7", "5062", "После инспекции"], ["7", "5039","Паллеты"]);
Production.push(["8", "5049", "Капля"], ["8", "5053", "Перед сдувом"], ["8", "5063", "Перед инспекцией"], ["8", "5064", "После инспекции"], ["8", "5037","Паллеты"]);



var xmlHttpTOs = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttpTOs = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttpTOs = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttpTOs = false;
  }
}
@end @*/
if (!xmlHttpTOs && typeof XMLHttpRequest != 'undefined') {
  xmlHttpTOs = new XMLHttpRequest();
}
function ebi(str){/* ElementById*/
	return document.getElementById(str);
}
function ebn(str){/* ElementsByName*/
	return document.getElementsByName(str);
}
function CallReport() 
{
	document.getElementById("InProcess").style.display="block";
 var i;
 var FirstDate = GetNormDate(document.getElementById("Date1").value) +" "+ document.getElementById("FirstDateHour").value+":"+document.getElementById("FirstDateMinute").value;
 var SecondDate = GetNormDate(document.getElementById("Date2").value)+" "+ document.getElementById("SecondDateHour").value+":"+document.getElementById("SecondDateMinute").value;
 var TheTime = "c "+document.getElementById("Date1").value+" "+ document.getElementById("FirstDateHour").value+":"+document.getElementById("FirstDateMinute").value+" по "+document.getElementById("Date2").value+" "+ document.getElementById("SecondDateHour").value+":"+document.getElementById("SecondDateMinute").value;
 //var Req = "SELECT DISTINCT * FROM viko"+document.getElementById("Line").value+" WHERE VikoDate BETWEEN '" + FirstDate + "' AND '"+SecondDate+"'" ;
 var MultiReq ="SELECT DISTINCT * FROM tabname WHERE VikoDate BETWEEN '" + FirstDate + "' AND '"+SecondDate+"'" ;
 var Lines="";
 
 for(i=7;i<10;i++)
     {
         if (document.getElementById("L"+i.toString()).checked == true)
             {
                 Lines+=i.toString()+", ";
             }
     }
     if (Lines=="")
         {
			alert("Не выбрано ни одной линии");
			document.getElementById("InProcess").style.display="none";
			return;
         }
 var url = "AJAXGetReport.php?Req=" + encodeURIComponent(Req)+"&TheTime="+encodeURIComponent(TheTime)+"&Lines="+encodeURIComponent(Lines)+"&MR="+encodeURIComponent(MultiReq);
 
 Lines="";
    // Открыть соединение с сервером
  xmlHttpTOs.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttpTOs.onreadystatechange = ShowReport;

  // SПередать запрос
  xmlHttpTOs.send(null);
}
function ShowReport()
{
  if (xmlHttpTOs.readyState == 4) {
    var response = xmlHttpTOs.responseText;
    document.getElementById("ReportAsIs").innerHTML=response;
	document.getElementById("InProcess").style.display="none";
  }
}
function GetNormDate(date){
    var arr=date.split(".");
    return arr[2]+"-"+arr[1]+"-"+arr[0];
}
function TimePreset(timeEl1,timeEl2,h,m){/*name Selecta с часами, name Selecta с минутами, часы, минуты */
	ebn(timeEl1)[0].value=h;
	ebn(timeEl2)[0].value=m;
}
        </script>
        </body>
</html>