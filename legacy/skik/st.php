<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="tools.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="defects.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="auth.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="jquery.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="jquery.calendarPicker.js" charset=utf-8></script>
	<script language="javascript" type="text/javascript" src="Report.js" charset=utf-8></script>
	<link rel="stylesheet" type="text/css" href="css.css">
	<link rel="stylesheet" type="text/css" href="jquery.calendarPicker.css">
</head>
<body>
	<script src="highstock.js"></script>
	<script src="exporting.js"></script>
	<div id="workspace">
		<div class="reportHeader">
			<div id="currentLine" class="inlineDiv headerItem" onclick="popup('Выбор линии', lineSelectContent(), 20, 65);">Линия 5</div>
			<div id="lastProduction" class="inlineDiv headerItem" onclick="popup('Продукция', r.get_changes_list(), 130, 65);">[Загрузка...]</div>
			Форм: <div id="forms" class="inlineDiv headerItem" onclick=""></div>
			C <div id="startDate" class="inlineDiv headerItem" onclick="popup('Выбор начальной даты', calDiv,330,65);showCal('startDate', 'startReportDate');"> [ждите...]</div> 
			ПО <div id="endDate" class="inlineDiv headerItem" onclick="popup('Выбор конечной даты', calDiv,630,65);showCal('endDate', 'endReportDate');">[ждите...]</div> 
			<a class="btn" href="javascript:function e(){history.back()}; e();"> Вернуться на главный экран </a>
		</div>
		<div id="list_of_changes"></div>
		<div id="graphCommand"><a href="#" onclick="r.prepare_your_anus();">Построить граффик</a></div>
		<div id="defects_chart" style="min-height: 0px; min-width: 310px"></div>
		</div>
	<div>
	<div id="det_rep"></div>
	<div id="bars"></div>
	</div>
	<div id="popupWindow">
		<b><span id="popupHeader">Заголовок  </span></b> &nbsp <img src="close2.png" onclick="closePopup()" class="close_img">
		<div id="popupContent"></div>
	</div>
	<div id="log" style="text-align:left;"></div>
	<script type="text/javascript">
		var r;
		var production_list;
		var calDiv='<div id="dsel1" style="width:600px"></div><div style="text-align:center"><br>'+genTimeSelector()+'<br><br><input type="button" value="Ок" onclick="ok();closePopup();"></div>';
		moment.lang("ru");
        $(document).ready(function(){
			r = new Report();
			getProdList();
		});
		function show_chart(){
			$('#defects_chart').highcharts('StockChart', {
			

			rangeSelector : {
				selected : 1
			},

			title : {
				text : 'Уровень дефектов'
			},
			 yAxis: {
		        min: 0
		    },
			series : [{
				name : 'Общий уровень',
				data : r.graph_array['all'],
				type : 'areaspline',
				pointStart: Date.UTC(2014, 3, 12, 12, 31),
				pointInterval: 60 * 1000,
				threshold : null,
				tooltip : {
					valueDecimals : 1,
					valueSuffix: '%'
				}
			},{
				name : 'сброс',
				data : r.graph_array['rejected'],
				type : 'areaspline',
				pointStart: Date.UTC(2014, 3, 12, 12, 31),
				pointInterval: 60 * 1000,
				threshold : null,
				tooltip : {
					valueDecimals : 1,
					valueSuffix: '%'
				}
			}]
			});
		}
		function showBars(){
			$('#bars').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Брак'
            },
            subtitle: {
                text: 'по типам'
            },
            xAxis: {
                categories: r.barsC,
                title: {
                    text: 'Название'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Процент',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
				name:"Брак",
                data: r.bars
            }]
        });
		}
	</script>
</body>
</html>