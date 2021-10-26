<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <script type="text/javascript" src="/../js/jquery-1.2.1.js"></script>
        <script type="text/javascript" src="/../js/ui.datepicker.js"></script>
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

            #DateFrom {
                float:left;
                position:relative;
                width:100px;
            }
            #DateTo {
                float:left;
                position:relative;
                width:100px;
            }
        </style>
        <title>Отчеты и настройки</title>
    </head>
    <body>
        <?php
        require 'Events.php';
        include "KipHeader.php";
        require 'Menu.php';
        echo '<div id=MainBlock>';
If (!isset($_GET['EventHour'])){        
        echo '<FORM action="AddEvent.php" method=GET>
            <Table id="AddForm">
                <tr>
                    <td>Дата события</td>
                    <td><input id="EventDate" type="text" name="EventDate" value=""></td>
                    <td>Время события</td>
                    <td>';
        echo '<SELECT name=EventHour>';
            if(isset ($_GET['EventHour'])) $DefVal=$_GET['EventHour']; else $DefVal=12;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    echo '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    echo '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>';
            print '<SELECT name=EventMinute>';
            if(isset ($_GET['EventMinute'])) $DefVal=$_GET['EventMinute']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    echo '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    echo '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT></td>
                 </tr>
                 <tr>
                    <td>Оборудование</td>
                    <td><SELECT name=Equipment>';
            foreach ($Equipment as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT></td>
                    <td>№
                    ';
            echo '<SELECT name=NEq>';
            For ($i = 0; $i <= 12; $i++) {
                    print '<option value=' . $i . '>' . $i . '</option>';
            }
            echo '</SELECT></td>
                 <td></td>
                 </tr>
                 <tr>
                    <td>Смена</td>
                    <td><SELECT name=Shift style="text-align:center;">';
            foreach ($Shift as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT>
                    <td></td>
                    <td></td>
                 </tr>
                 <tr>
                    <td>Продолжительность ремонта</td>
                    <td>';
        echo '<SELECT name=RestoreHour>';
            if(isset ($_GET['RestoreHour'])) $DefVal=$_GET['RestoreHour']; else $DefVal=0;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT> часов ';
            print '<SELECT name=RestoreMinute colspan=3>';
            if(isset ($_GET['RestoreMinute'])) $DefVal=$_GET['RestoreMinute']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT> минут.</td>
                <td></td>
                    <td></td>
                 </tr>
                 <tr>
                    <td>Событие</td>
                    <td><SELECT name=EventType>';
            foreach ($Events as $Code => $Event) 
                    {
                        echo '"<option value=' . $Code . '>' . $Event . '</option>"';
                    }
              echo '</td>
                    <td></td>
                    <td></td>
                 </tr>
                 <tr>
                      <td>Характер<br>(внешнее <br>проявление <br>неисправности)</td>
                      <td colspan="3"><textarea placeholder="Заполнить!" cols="58" rows="6" name="NatureFault"></textarea></td>
                  </tr>
                  <tr>
                      <td>Причина отказа</td>
                      <td colspan="3"><textarea placeholder="Опиши причину отказа" cols="58" rows="6" name="Reason"></textarea></td>
                  </tr>
                  <tr>
                      <td>Принятые меры</td>
                      <td colspan="3"><textarea placeholder="Опиши принятые меры" cols="58" rows="6" name="ActionTaken"></textarea></td>
                  </tr>
                  <tr>
                      <td>Затраченные<br> материалы</td>
                      <td colspan="3"><textarea placeholder="Указать комплектующие, если брались из ЗИПа" cols="58" rows="6" name="SpentMaterials"></textarea></td>
                  </tr>
                  <tr>
                      <td>Комментарий</td>
                      <td colspan="3"><textarea placeholder="Например: Что необходимо сделать смежным подразделениям, приобрести комплектующие, материалы, инструменты и т. д." cols="58" rows="6" name="Comments"></textarea></td>
                  </tr>
                  <tr>
                      <td colspan=4 style="text-align:center"><input id="Submit" type="submit"  value="Сделать запись"></td>
                  </tr>
            </table>
        </form>';
              
}
else
{
require '/../conn.php';
$date1_elements = explode(".", $_GET['EventDate']);
$EventDateTime = $date1_elements[2] . '-' . $date1_elements[1] . '-' . $date1_elements[0] . " " . $_GET['EventHour'] . ":" . $_GET['EventMinute'] . ":00";
$q="insert into steklo.pcsjournal set CurDateTime=NOW(),
                                      EventDateTime='".$EventDateTime."',
                                      EventType='".$_GET['EventType']."',
                                      Equipment='".$_GET['Equipment']."',
                                      NEq='".$_GET['NEq']."',
                                      Shift='".$_GET['Shift']."',
                                      RestoreTime='".$_GET['RestoreHour'].":".$_GET['RestoreMinute']."',
                                      NatureFault='".$_GET['NatureFault']."',
                                      Reason='".$_GET['Reason']."',
                                      ActionTaken='".$_GET['ActionTaken']."',
                                      SpentMaterials='".$_GET['SpentMaterials']."',
                                      Comments='".$_GET['Comments']."'";
$res=mysql_query($q);
//echo $q.'<br>';
if($res==0)
{
    echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span>';
}
Else
{
    echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Записано</span>';
}
}
        echo '</div>';
        require 'Footer.php';
        ?>
        <script type="text/javascript">
            $(document).ready(function(){
                // ---- Календарь -----
                $('#EventDate').attachDatepicker();
            });
        </script> 
    </body>
</HTML>
