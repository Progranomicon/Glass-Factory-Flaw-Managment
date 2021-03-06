<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"    "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="jquery.flot.js"></script>
		<script type="text/javascript" src="jquery.flot.categories.js"></script>
		<script type="text/javascript" src="ui.datepicker.js"></script>
         <style type="text/css">
		 #bars{
			border:1px solid black;
		 }
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
        
        echo '<FORM action="GetReport.php" METHOD=GET>
      <TABLE>
        <tr>
            <th>Даты начала и конца выборки</th>
            <th>Оборудование</th>
            <th>№</th>
            <th>Cобытие</th>
            <th>Смена</th>
        </tr>
        <tr>
            <td>С&nbsp&nbsp<input id="EventDateFrom" type="text" name="EventDateFrom" value="';
            if (isset ($_GET['EventDateFrom'])) echo $_GET['EventDateFrom'];
            echo '">
            <SELECT name=EventHourFrom>';
            if(isset ($_GET['EventHourFrom'])) $DefVal=$_GET['EventHourFrom']; else $DefVal=7;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>';
            print '<SELECT name=EventMinuteFrom>';
            if(isset ($_GET['EventMinuteFrom'])) $DefVal=$_GET['EventMinuteFrom']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT><br>По<input id="EventDateTo" type="text" name="EventDateTo" value="';
            if (isset ($_GET['EventDateTo'])) echo $_GET['EventDateTo'];
            echo '">
            <SELECT name=EventHourTo>';
            if(isset ($_GET['EventHourTo'])) $DefVal=$_GET['EventHourTo']; else $DefVal=7;
            For ($i = 0; $i <= 23; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>';
            print '<SELECT name=EventMinuteTo>';
            if(isset ($_GET['EventMinuteTo'])) $DefVal=$_GET['EventMinuteTo']; else $DefVal=30;
            For ($i = 0; $i <= 59; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT>&nbsp&nbsp&nbsp</td>
            <td><SELECT name=Equipment>';
            if(isset ($_GET['Equipment'])) $DefVal=$_GET['Equipment']; else $DefVal=0;
            foreach ($Equipment as $Code => $Eq) 
                    {
                       if ($Code == $DefVal) {
                            echo '<option selected value=' . $Code . '>' . $Eq . '</option>';
                       } else {
                            echo '<option value=' . $Code . '>' . $Eq . '</option>';
                       }
                    }
              echo '</SELECT></td>
            <td><SELECT name=NEq>';
              if(isset ($_GET['NEq'])) $DefVal=$_GET['NEq']; else $DefVal=0;
            For ($i = 0; $i <= 12; $i++) {
                if ($i == $DefVal) {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                } else {
                    print '<option value=' . $i . '>' . $i . '</option>';
                }
            }
            echo '</SELECT></td>
            <td><SELECT name=EventType>';
            if(isset ($_GET['EventType'])) $DefVal=$_GET['EventType']; else $DefVal=0;
            foreach ($Events as $Code => $Ev) 
                    {
                       if ($Code == $DefVal) {
                            echo '<option selected value=' . $Code . '>' . $Events[$Code] . '</option>';
                       } else {
                            echo '<option value=' . $Code . '>' . $Events[$Code] . '</option>';
                       }
                    }
              echo '</SELECT></td>
            <td><SELECT name=Shift style="text-align:center;">';
            if(isset ($_GET['Shift'])) $DefVal=$_GET['Shift']; else $DefVal=0;
            foreach ($Shift as $Code => $Sh) 
                    {
                       if ($Code == $DefVal) {
                            echo '<option selected value=' . $Code . '>' . $Sh . '</option>';
                       } else {
                            echo '<option value=' . $Code . '>' . $Sh . '</option>';
                       }
                    }
              echo '</SELECT></td>
             
        </tr>
       <tr><td><input type="submit" value="Посмотреть"></td>
       </tr>
       </TABLE>
       </FORM>';
	   ?>
	<a id="graphLink" href="javascript:zapros();">График </a>
	<div id="bars">
	<span ><a href="javascript:shg(1);">Скрыть график </a></span>
		<div id="placeholder" style="width:100%;height:300px"></div>
	</div>
<?php
 if (isset($_GET['EventDateFrom'])  )
  if($_GET['EventDateFrom']!='')
	if (isset($_GET['EventDateTo']) & $_GET['EventDateTo']!='')
	{
     require '/../conn.php';
     $date1_elements = explode(".", $_GET['EventDateFrom']);
     $DateTimeFrom = $date1_elements[2] . '-' . $date1_elements[1] . '-' . $date1_elements[0] . " " . $_GET['EventHourFrom'] . ":" . $_GET['EventMinuteFrom'] . ":00";
	$date2_elements = explode(".", $_GET['EventDateTo']);
	$DateTimeTo = $date2_elements[2] . '-' . $date2_elements[1] . '-' . $date2_elements[0] . " " . $_GET['EventHourTo'] . ":" . $_GET['EventMinuteTo'] . ":00";
     $Q = "SELECT * FROM steklo.pcsjournal WHERE EventDateTime>'" . $DateTimeFrom . "' AND EventDateTime<='" . $DateTimeTo . "'";
     if ($_GET['Equipment'] != "0")
                    {
                        $Q = $Q . " AND Equipment='" . $_GET['Equipment'] . "'";
                    }
     if ($_GET['NEq'] != "0")
                    {
                        $Q = $Q . " AND NEq='" . $_GET['NEq'] . "'";
                    }
     if ($_GET['EventType'] != "0")
                    {
                        $Q = $Q . " AND EventType='" . $_GET['EventType'] . "'";
                    }
     if ($_GET['Shift'] != "0")
                    {
                        $Q = $Q . " AND Shift='" . $_GET['Shift'] . "'";
                    }
	$Q = $Q ." ORDER BY EventDateTime";
     //echo $Q;
echo '
      <TABLE id=KipJournal>
        <tr>
            <th>Дата события</th>
            <th>Оборудование</th>
            <th>№</th>
            <th>Cобытие</th>
            <th>Смена</th>
            <th>Характер</th>
            <th>Причина</th>
            <th>Продолжительность ремонта</th>
            <th>Принятые меры</th>
            <th>Затраченные материалы</th>
            <th>Комментарий</th>
        </tr>';
$res=mysql_query($Q);
while ($assoc = mysql_fetch_assoc($res))
    {
    echo'
            <tr>
                <td>'.$assoc['EventDateTime'].'</td>
                <td>'.$Equipment[$assoc['Equipment']].'</td>
                <td>'.$assoc['NEq'].'</td>
                <td>'.$Events[$assoc['EventType']].'</td>
                <td>'.$Shift[$assoc['Shift']].'</td>
                <td>'.$assoc['NatureFault'].'</td>
                <td>'.$assoc['Reason'].'</td>
                <td>'.$assoc['RestoreTime'].'</td>
                <td>'.$assoc['ActionTaken'].'</td>
                <td>'.$assoc['SpentMaterials'].'</td>
                <td>'.$assoc['Comments'].'</td>
            </tr>';               
     }
     echo "</Table>";
}
Else
{
    Echo "Задайте даты";
}
        echo '</div>';
        require 'Footer.php';
        ?>
        <script type="text/javascript">
			var a=[];
			function shg(n){
				if (n==1){
					$('#bars').css('display','none');
					$('#graphLink').css('display','block');
				}
				if (n==2){
					$('#bars').css('display','block');
					$('#graphLink').css('display','none');
				}
			
			}
            $(document).ready(function(){
              // ---- Календарь -----
				$('#EventDateFrom').attachDatepicker();
				$('#EventDateTo').attachDatepicker();
			//---- Граффик ----	
				$("<div id='tooltip'></div>").css({
					position: "absolute",
					display: "none",
					border: "1px solid #fdd",
					padding: "2px",
					"background-color": "#fee",
					opacity: 0.80
				}).appendTo("body");
				var graphData = [{
					data: [ [6, 1300],[8, 200]],
					color: '#71c73e'
					}];
				shg(1);
				//$.plot($("#placeholder"), graphData, [{}]);
            });
			//---- AJAX -----
			function zapros(){
				shg(2);
				$.ajax({
				type: "GET",
				url: "graph.php",
				data: "df="+$('#EventDateFrom').val()+"&dt="+$('#EventDateTo').val(),
				success: function(msg){otwet(msg);}
			 });
			};
			function otwet(msg){
				//alert (msg);
				a=eval(msg);
				$.plot($("#placeholder"), [a],{
											series: {
												bars: {
													show: true,
													barWidth: 0.6,
													align: "center",
													color:'blue'
												}
											},
											grid: {
												hoverable: true,
												clickable: true
											},
											xaxis: {
												mode: "categories",
												tickLength: 2
											}
										});
				$("#placeholder").bind("plothover", function (event, pos, item) {
					if (item) {
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(y)
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(50);
					} else {
						$("#tooltip").hide();
					}
				});
			}
        </script> 
    </body>
</HTML>
