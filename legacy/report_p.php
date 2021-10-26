<?php session_start();?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<?php 	$host = "192.168.113.111";
	$user = 'root';
	$psswrd = "parolll";
	$db_name = 'steklo'; //до сюда я думаю ясно 
	
	@mysql_connect($host, $user, $psswrd) or die("Ошибка при соединении с БД: ".mysql_error());
	mysql_select_db($db_name);
$date1_elements = explode(".", $_POST['date1']);
$from_date_time = $date1_elements[2].'-'.$date1_elements[1].'-'.$date1_elements[0]." ".$_POST['from_hour'].":".$_POST['from_minute'].":00";
$date2_elements = explode(".", $_POST['date2']);
$to_date_time = $date2_elements[2].'-'.$date2_elements[1].'-'.$date2_elements[0]." ".$_POST['to_hour'].":".$_POST['to_minute'].":00"; 
//print '<br>date1 = '.$from_date_time.'<br>date2 = '.$to_date_time.'<br>';
?>
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<title>Отчеты и настройки</title>
<link rel="stylesheet" type="text/css" href="style_1.css" >
</head>
<body>
	<?php include "main_header.php";?>
	<div class="menu_div"> [<A HREF="index.php"> В начало </A>] [<A HREF="report_first.php"> Изменить период </A>] пункт2 пункт3 пункт4 пункт5</div>
	<div class="main_block_div"><?php 
	
	$rep_string_header="Производственный отчет по линии №". $_SESSION['line_selected']." с ".$_POST['from_hour'].":".$_POST['from_minute'].' <u><b>'.$_POST['date1']."</b></u> по ".$_POST['to_hour'].":".$_POST['to_minute'].' <u><b>'.$_POST['date2']."</b></u>.";
	print '<p>'.$rep_string_header.'</p>.';  ?>
	<?php
		//узнаем последний формат на линии
		$que='SELECT * FROM formats WHERE line="'.$_SESSION['line_selected'].'" AND date_time<="'.$from_date_time.'" ORDER BY date_time DESC LIMIT 1';
		$res_last_before_report=mysql_query($que) or die ("Неудалось узнать последний формат. Запрос: ".$que.'<br>');
		if(mysql_num_rows($res_last_before_report)==1){
			$arr_changes [0][0] = $from_date_time; // начало периода
			$arr_changes [0][1] = $to_date_time;   // конец периода
			$rec_last_format = mysql_fetch_row($res_last_before_report);
			$arr_changes [0][2] = $rec_last_format[2]; // формат за этот период
			$arr_changes [0][3] = $rec_last_format[4]; // множитель
			//print'Последний формат на линии:'.$arr_changes [0][2].'<br>';
		}
		else {print'Немогу узнать последний формат. Его нет!';}
		mysql_free_result($res_last_before_report);
		//узнаем не менялись ли форматы за период отчета
		$que='SELECT * FROM formats WHERE line="'.$_SESSION['line_selected'].'" AND date_time>"'.$from_date_time.'" AND date_time<="'.$to_date_time.'" ORDER BY date_time';
		$res_in_report=mysql_query($que) or die ("Неудалось узнать форматы во время отчета. Запрос: ".$que.'<br>');
		$i=0;
		while ($rec_local=mysql_fetch_row($res_in_report)){//если менялись, то добавляем в периоды замен.
			$i++;
			$arr_changes [$i][0]=$rec_local[0];
			$arr_changes [$i][1]=$arr_changes [$i-1][1];
			$arr_changes [$i-1][1]=$rec_local[0];
			$arr_changes [$i][2]=$rec_local[2];
			$arr_changes [$i][3]=$rec_local[4];
		}
		//print_r ($arr_changes);
		//print "i=".$i."<br>";
		mysql_free_result($res_in_report);
		print  '<br>';
		//загружаем настройки
		$i2=0;
		$que='SELECT * FROM settings_v2 WHERE line_number='.$_SESSION['line_selected'].' ORDER BY num_on_line';
		$set_res=mysql_query($que) or die ('Что то не так. Запрос:'.$que.'<br>');
		
		while ($set_rec=mysql_fetch_row($set_res)){
			$arr_assets[$i2]["sensor_field"]=$set_rec[1];
			$arr_assets[$i2]["num_on_line"]=$set_rec[5];
			$arr_assets[$i2]["location_at_line"]=$set_rec[4];
			$arr_assets[$i2]["total"]=0;
			$arr_assets[$i2]["prev_val"]=0;
			$arr_assets[$i2]["total_total"]=0;
			$i2++;
		}
		//print_r ($arr_assets);
		mysql_free_result($set_res);
		//здесь начинается лютый пиздец
		for($per_rec=0;$per_rec<=$i;$per_rec++){
			$que='SELECT * FROM bottle2 WHERE date_time>="'.$arr_changes[$per_rec][0].'" AND date_time<= "'.$arr_changes[$per_rec][1].'" ORDER BY date_time';
			//Print $que."<br>";
			$res=mysql_query($que)	 or die ("Немогу получить количество бутылок за период");
			print '<br> Результат:'.mysql_num_rows($res).' строк<br>';
			Print'Отрезок времени с '.($arr_changes [$per_rec][0]).' по '.($arr_changes [$per_rec][1]).'. Формат: '.($arr_changes [$per_rec][2]).'<br>';
			if (mysql_num_rows($res)<2){
				print 'За текуший период мало данных (<2 записей). Период учтен не будет.<br>';
				print '<br>-----------------------------------------------------------------------------------------------';
			}
			else{
				$assoc_rec=mysql_fetch_assoc($res);
				for($per_rec1=0;$per_rec1<$i2;$per_rec1++){
						$arr_assets[$per_rec1]["prev_val"]=$assoc_rec[$arr_assets[$per_rec1]["sensor_field"]];
						$arr_assets[$per_rec1]["total"]=0;
					}
				//print $assoc_rec['date_time'].' - '.$assoc_rec['point_4_5'].'<br>';
				While($assoc_rec=mysql_fetch_assoc($res)){
					//print $assoc_rec['date_time'].' - '.$assoc_rec['point_4_5'].'<br>';
					for($per_rec1=0;$per_rec1<$i2;$per_rec1++){//перебор полей настройки и запись в них суммы
						if($arr_assets[$per_rec1]["prev_val"]<$assoc_rec[$arr_assets[$per_rec1]["sensor_field"]]) {
							$arr_assets[$per_rec1]["total"]+=$assoc_rec[$arr_assets[$per_rec1]["sensor_field"]]-$arr_assets[$per_rec1]["prev_val"];
						}
						$arr_assets[$per_rec1]["prev_val"]=$assoc_rec[$arr_assets[$per_rec1]["sensor_field"]];	
					}
				}
				//print 'За период с '.$arr_changes[$per_rec][0].' по '.$arr_changes[$per_rec][1].' паллет: '.$arr_assets[4]["total"].'<br>';
				$arr_assets[0]["total"]*=$arr_changes [$per_rec][3];
				for($per_rec1=0;$per_rec1<$i2;$per_rec1++){
					$arr_assets[$per_rec1]["total_total"]+=$arr_assets[$per_rec1]["total"];	
				print '<br>ИТОГО по "'.$arr_assets[$per_rec1]["location_at_line"].'": '.$arr_assets[$per_rec1]["total_total"].'<br>';
				}
				print '<br>-----------------------------------------------------------------------------------------------';
			}
			mysql_free_result($res);
		}
		print '<br>';
		//print_r ($arr_assets);
		print '<br>';
		if($arr_assets[0]["total_total"]==0) {$arr_assets[0]["total_total"]=1;}
		$rep_string = '
		<TABLE id="table_with_report" cellspacing="0" cellpadding="1" border="2" >
		<TR>
			<TH>№п/п</TH>
			<TH>Номер машинолинии</TH>
			<TH>Количество капель (общее), шт.</TH>
			<TH>Выброшенные капли, шт.</TH>
			<TH>Вал капель прошедших через формокомплект</TH>
			<TH>Выпуск готовой продукции (упакованная продукция), шт.</TH>
			<TH>Паллет, шт.</TH>
			<TH>Брак полуфабрикатов текущего выпуска, шт.</TH>
		</TR>
		<TR>
			<TH>1</TH>
			<TH>2</TH>
			<TH>3</TH>
			<TH>4</TH>
			<TH>5</TH>
			<TH>6</TH>
			<TH>7</TH>
			<TH>8</TH>
		</TR>
		<TR>
			<TD>1</TD>
			<TD>Линия №4</TD>
			<TD>'.($arr_assets[0]["total_total"]).'</TD>
			<TD>Пока не используется</TD>
			<TD>Пока не используется</TD>
			<TD>'.($arr_assets[3]["total_total"]).'</TD>
			<TD>'.($arr_assets[4]["total_total"]).'('.($arr_assets[1]["total_total"]).')</TD>
			<TD>'.(($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"])).'('.(sprintf ("%01.2f",(((($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"]))*100)/$arr_assets[0]["total_total"]))).'%)</TD>
		</TR>
		</TABLE>';
		print $rep_string;
		$rep_string_to_PDF = '
		<TABLE cellspacing="0" cellpadding="1" border="1" align="center"><TR><th width="40">№ п/п</th><TH>Номер машинолинии</TH><TH>Количество капель (общее), шт.</TH><TH>Выброшенные капли, шт.</TH><TH width="110">Вал капель прошедших через формокомплект</TH><TH>Выпуск готовой продукции (упакованная продукция), шт.</TH><TH width="60">Паллет, шт.</TH><TH width="150">Брак полуфабрикатов текущего выпуска, шт.</TH></TR>
		<TR><TH>1</TH><TH>2</TH><TH>3</TH><TH>4</TH><TH>5</TH><TH>6</TH><TH>7</TH><TH>8</TH></TR>
		<TR><TD>1</TD><TD>Линия №4</TD><TD>'.($arr_assets[0]["total_total"]).'</TD><TD>Пока не используется</TD><TD>Пока не используется</TD><TD>'.($arr_assets[3]["total_total"]).'</TD><TD>'.($arr_assets[4]["total_total"]).'('.($arr_assets[1]["total_total"]).')</TD><TD>'.(($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"])).'('.(sprintf ("%01.2f",(((($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"]))*100)/$arr_assets[0]["total_total"]))).'%)</TD></TR></TABLE>';
		$_SESSION['full_rep_string']='<FONT id="PDF_report">'.$rep_string_header.'</FONT><br><br>'.$rep_string_to_PDF;
	?>
<A HREF="make_PDF1.php"> Сохранить отчет в PDF</A>
</div>
	<div class="footer_div">ОГМетр. 2011 г. <?php print ($arr_assets[1]["total_total"]).'x1904='.($arr_assets[1]["total_total"]*2203).'. Разница = '.($arr_assets[1]["total_total"]*1904-($arr_assets[3]["total_total"])).'<br>'?>
</div>
</body>
<?php mysql_close(); ?>
</HTML>