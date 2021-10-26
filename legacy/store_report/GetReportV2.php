<?php 
/**
 * @$Table - переменная агрегирования таилицы
 */
?>
<HTML>
    <head>
        <LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
        <link rel="stylesheet" href="/../style_1.css" type="text/css" >
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <script language="javascript" type="text/javascript" src="report_functions.js"></script>
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
        <title>Отчеты по паллетам</title>
    </head>
    <BODY>

        <?php
        require_once '\..\conn.php';
		mysql_set_charset("utf8");
        require_once 'Events.php';
        require "\..\main_header.php";
        require "/../Menu.php";
        ?>

        <div class="main_block_div">
            <?php
            echo '<script type="text/javascript">
       
            var executors=[];';
            $RExecutors = mysql_query("SELECT * FROM scaner_users");
            while ($RetExecs = mysql_fetch_assoc($RExecutors)) {
                echo 'executors.push([' . $RetExecs['id'] . ',"' . $RetExecs['FIO'] . '"]);';
                $Executors[$RetExecs['id']] = $RetExecs['FIO'];
            }
            mysql_free_result($RExecutors);
            echo ' var Production=[];';
            $RProduction = mysql_query("SELECT * FROM productionutf8");
            while ($RetProd = mysql_fetch_assoc($RProduction)) {
                echo 'Production.push([' . $RetProd['id'] . ',"' . $RetProd['format_name'] . '", "' . $RetProd['boxing'] . '", "' . $RetProd['units_number'] . '"]);';
                $Production[$RetProd['id']] = array($RetProd['format_name'], $RetProd['units_number'], $RetProd['boxing'], 0);
            }
            mysql_free_result($RProduction);
            echo '</script>
    <FORM action="GetReportV2.php" METHOD=GET>
      <TABLE>
        <tr>
            <th>Дата C</th>
            <th >Дата ПО</th>
            <th>Линия</th>
            <th>Код продукции</th>
            <th>Исполнитель</th>
            <th>Операция</th>
            <th>Диапазон паллет</th>
        </tr>
        <tr>
            <td><input id="DateFrom" type="text" name="DateFrom" value="';
            if (isset ($_GET['DateFrom'])) echo $_GET['DateFrom'];
            echo '">
            <SELECT name=HourFrom>';
            if(isset ($_GET['HourFrom'])) $DefVal=$_GET['HourFrom']; else $DefVal=7;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>';
            print '<SELECT name=MinuteFrom>';
            if(isset ($_GET['MinuteFrom'])) $DefVal=$_GET['MinuteFrom']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>&nbsp&nbsp&nbsp</td>
            <td><input id="DateTo" type="text" name="DateTo" value="';
            if (isset ($_GET['DateTo'])) echo $_GET['DateTo'];
            echo '"><SELECT name=HourTo>';
            if(isset ($_GET['HourTo'])) $DefVal=$_GET['HourTo']; else $DefVal=19;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>';
            print '<SELECT name=MinuteTo>';
            if(isset ($_GET['MinuteTo'])) $DefVal=$_GET['MinuteTo']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            
            echo '</SELECT>&nbsp&nbsp&nbsp</td>
            <td><SELECT name=LineNumber>';
            if(isset ($_GET['LineNumber'])) $DefVal=$_GET['LineNumber']; else $DefVal=0;
            For ($i = 0; $i <= 9; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT></td>
            <td><input type="text" name="ProductCode" id="ProductCode" value="';
            if (isset ($_GET['HProduct'])&&$_GET['HProduct']!='' ) echo $Production[$_GET['HProduct']][0]; else echo "По всей";
            echo '" onClick="javascript:ClearF(2);" onKeyup="javascript:PopupProduction();"><input type="hidden" id="HProduct" name="HProduct" value="';
            if (isset ($_GET['HProduct'])) echo $_GET['HProduct'];
            echo '"></td>
            <td><input type="text" id="Executor" name="Executor" value="';
            if (isset ($_GET['HExecutor'])&& $_GET['HExecutor']!='' ) echo $Executors[$_GET['HExecutor']]; else echo "По всем";
            echo '" onKeyup="javascript:PopupExecutors();" onClick="javascript:ClearF(1);"><input type="hidden" id="HExecutor" name="HExecutor" value="';
            if (isset ($_GET['HExecutor'])) echo $_GET['HExecutor'];
            echo '"></td>
            <td><SELECT name=OperationCode id=OperationCode>';
            if(isset ($_GET['OperationCode'])) $DefVal=$_GET['OperationCode']; else $DefVal=0;
            For ($i = 0; $i <= 4; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $Events[$i] . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $Events[$i] . '</option>';
                }
            }
            echo '</SELECT></td>
             <td><input type="text" name="PalletesFrom" style="width:70px; text-align:center;" value="';
            if (isset ($_GET['PalletesFrom'])) echo $_GET['PalletesFrom']; else echo '0';
            echo '">-<input type="text" name="PalletesTo" style="width:70px; text-align:center;" value="';
            if (isset ($_GET['PalletesTo'])) echo $_GET['PalletesTo']; else echo '9999';
            echo '"></td>
        </tr>
       <tr><td><input type="submit" value="Получить">&nbsp&nbsp<input type=checkbox name=ShortReport ';
            if (isset ($_GET['ShortReport'])) echo "CHECKED ";
           echo '>&nbspТолько сводка &nbsp&nbsp</td>
           <td><input type=checkbox onClick="javascript:StoreClick();" name=StoreOnly id=StoreOnly';
            if (isset ($_GET['StoreOnly'])) echo " CHECKED ";
           echo '>&nbspОстаток на складе</td>
       </tr>
       </TABLE>
       </FORM>
       <a href="GetReportV2.php">Очистить</a>
       <hr></hr>';
            if (isset($_GET['DateTo'])) {
                if ($_GET['DateTo'] == "")
                    Echo '<b>Задайте хотябы даты</b>';
                Else {
                    $Table = '';
                    if (!isset($_GET['StoreOnly']))  echo "<br>Отчет с ". $_GET['DateFrom'] . ' по '.$_GET['DateTo'] . ', Операция: ' . $Events[$_GET['OperationCode']] . '.<br><br>'; 
                    else echo "<br>Сдано на склад с ".$_GET['DateFrom']." по ".$_GET['DateTo'].'.<br><br>';
                    if (!isset($_GET['ShortReport'])) {
           Echo "<div id=Summary></div><TABLE id=table_with_report>
        <tr>
            <th>Дата внесения</th>
            <th>Код паллета</th>
            <th>Линия</th>
            <th>Продукция</th>
            <th>Исполнитель</th>
        </tr>";
        }
                    $date1_elements = explode(".", $_GET['DateFrom']);
                    $DateTimeFrom = $date1_elements[2] . '-' . $date1_elements[1] . '-' . $date1_elements[0] . " " . $_GET['HourFrom'] . ":" . $_GET['MinuteFrom'] . ":00";
                    $date2_elements = explode(".", $_GET['DateTo']);
                    $DateTimeTo = $date2_elements[2] . '-' . $date2_elements[1] . '-' . $date2_elements[0] . " " . $_GET['HourTo'] . ":" . $_GET['MinuteTo'] . ":00";
                    $q = "SELECT * FROM steklo.pallets WHERE eventDateTime>'" . $DateTimeFrom . "' AND eventDateTime<='" . $DateTimeTo . "'";
                    $QStore="SELECT * FROM (SELECT * FROM pallets GROUP BY sn HAVING COUNT(sn)=1 ORDER BY eventDateTime) AS a WHERE a.eventId=1 AND a.eventDateTime>'". $DateTimeFrom . "' AND a.eventDateTime<='" . $DateTimeTo . "'";
                    if ($_GET['HExecutor'] != "")
                    {
                        $q = $q . " AND Executor='" . $_GET['HExecutor'] . "'";
                        $QStore=$QStore." AND a.Executor='" . $_GET['HExecutor'] . "'";
                    }
                    if (isset($_GET['OperationCode']))
                    if ($_GET['OperationCode'] != "0")
                    {
                        $q = $q . " AND eventId='" . $_GET['OperationCode'] . "'";
                    }
                    if (!isset($_GET['StoreOnly'])) 
                    {
                        $res = mysql_query($q);
                    }
                    else
                    {
                        $res = mysql_query($QStore);
                    }
                    $q = $q . " ORDER BY eventDateTime";
                    $QStore=$QStore." ORDER BY a.eventDateTime";
                    $RowsPrinted = 0; // кол-во подходящих строк
                    $UnknownCodes = 0;//неизвестные форматы
                    while ($assoc = mysql_fetch_assoc($res)) { //Цикл Заполняет таблицу результатом в соответствии с заданными фильтрами
                        
                        $PrintRow = true;
                        if ($_GET['LineNumber'] != "0")
                            if ($_GET['LineNumber'] != substr($assoc['sn'], 6, 1) ) {
                                $PrintRow = false;
                            } 
                        if ($_GET['HProduct'] != "") {
                            if ($_GET['HProduct'] != substr($assoc['sn'], 7, 3)) {
                                $PrintRow = false;
                            }
                        }
                        if ($_GET['PalletesFrom'] > substr($assoc['sn'], 10, 4) || $_GET['PalletesTo'] < substr($assoc['sn'], 10, 4)) {
                            $PrintRow = false;
                        }


                        if ($PrintRow) {

                            if (!isset($_GET['ShortReport']))
                               Echo '<tr> 
                             <td><b>' . substr($assoc['eventDateTime'], 8, 2) . "." . substr($assoc['eventDateTime'], 5, 2) . "." . substr($assoc['eventDateTime'], 0, 4) . '</b> ' . substr($assoc['eventDateTime'], 11, 8) . " " . '</td>
                             <td><a id=' . $RowsPrinted . ' href="javascript:callHistory(' . "'" . $assoc['sn'] . "'" . ", '" . $RowsPrinted . "'" . ');" >' . $assoc['sn'] . '</A></td>
                             <td>' . substr($assoc['sn'], 6, 1) . '</td>';
                            if (isset($Production[substr($assoc['sn'], 7, 3) * 1])) {
                                $prnt = $Production[substr($assoc['sn'], 7, 3) * 1][0] . '(' . $Production[substr($assoc['sn'], 7, 3) * 1][1] . ' шт., ' . $Production[substr($assoc['sn'], 7, 3) * 1][2] . ')';
                                $Production[substr($assoc['sn'], 7, 3) * 1][3]+=1;
                            } else {
                                $prnt = "Не найден код: " . substr($assoc['sn'], 7, 3);
                                $UnknownCodes+=1;
                            }
                            if (!isset($_GET['ShortReport']))
							if (isset($Executors[$assoc['executor']])){
								$ExecutorP=$Executors[$assoc['executor']];
							}
							else{
								$ExecutorP="не записан.";
							}
                                Echo '<td>' . $prnt . '</td>
                             <td>' .$ExecutorP. '</td>
                             </tr>';

                            $RowsPrinted+=1;
                        }
                    }
                    if (!isset($_GET['ShortReport']))
                       Echo "</TABLE><br>";
                    Echo '<div id=PreSummary>Сводка:<br>';
                    foreach ($Production as $Code => $inf) {
                        if ($inf[3] > 0)
                            Echo $inf[0] . '(' . $inf[1] . ' шт., ' . $inf[2] . ') х ' . $inf[3] . ' паллет = '.($inf[1]*$inf[3]).' шт.<br>';
                    }
                    if ($UnknownCodes > 0)
                        echo 'Неизвестных: ' . $UnknownCodes . '.<br>';
                    echo "Итого строк по выборке :" . $RowsPrinted . ".<br></div>";
                  
                }
            }
            ?>
        </div>
        <div id="popup_list">
        </div>
        <div class="footer_div">ОГМетр. 2012 год.
        </div> 
        <script type="text/javascript">
            $(document).ready(function(){
                // ---- Календарь -----
                $('#DateFrom').attachDatepicker();
                $('#DateTo').attachDatepicker();
                document.getElementById("Summary").innerHTML=document.getElementById("PreSummary").innerHTML;
                document.getElementById("PreSummary").innerHTML='';
                StoreClick();
                
                // ---- Календарь -----
            });
        </script>        
    </BODY>
</HTML>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          