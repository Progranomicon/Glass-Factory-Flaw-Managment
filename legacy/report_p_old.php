<?php session_start();?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<?php include_once "conn.php";
$from_date_time = $_POST['from_year']."-".$_POST['from_month']."-".$_POST['from_day']." ".$_POST['from_hour'].":".$_POST['from_minute'].":00";
$to_date_time = $_POST['to_year']."-".$_POST['to_month']."-".$_POST['to_day']." ".$_POST['to_hour'].":".$_POST['to_minute'].":00"; ?>
<HTML>
<head>
<title>Отчеты и настройки</title>
<link rel="stylesheet" type="text/css" href="style_1.css" >
</head>
<body>
	<div class="header_div"><h2>Рузаевский стекольный завод</h2></div>
	<div class="menu_div"> [<A HREF="index.php"> В начало </A>] пункт2 пункт3 пункт4 пункт5</div>
	<div class="main_block_div"><p>Производственный отчет с <?php echo $from_date_time; ?> по <?php echo $to_date_time; ?> (за ПЕРИОД) </p>
	<?php
		
		$res=mysql_query('SELECT * FROM bottle2 WHERE date_time>="'.$from_date_time.'" AND date_time<= "'.$to_date_time.'";');
		$rows = mysql_num_rows($res);
		if ($rows<2)
			{
				echo "Недостаточно данных (менее 2х записей)";
			}
		else 
			{	
				$rec=mysql_fetch_row($res);
				$p_4_1_first = $rec[1];
				$pallets_f =$rec[5];
				$politizer_first = $rec[4];
				while($rec=mysql_fetch_row($res))
				{
					$p_4_1_last = $rec[1];
					$politizer_last = $rec[4];
					$pallets_l = $rec[5];
				}
				print '<TABLE id="table_with_report"><TR><TH>№п/п</TH><TH>Номер машинолинии</TH><TH>Количество капель (общее), шт.</TH><TH>Выброшенные капли, шт.</TH><TH>Вал капель прошедших через формокомплект</TH><TH>Выпуск готовой продукции (упакованная продукция), шт.</TH><TH>Паллет, шт.</TH><TH>Брак полуфабрикатов текущего выпуска, шт.</TH></TR>
<TR><TH>1</TH><TH>2</TH><TH>3</TH><TH>4</TH><TH>5</TH><TH>6</TH><TH>7</TH><TH>8</TH></TR>
<TR><TD>1</TD><TD>Линия №4</TD><TD>'.(($p_4_1_last-$p_4_1_first)*2).'</TD><TD>Пока не используется</TD><TD>Пока не используется</TD><TD>'.($politizer_last-$politizer_first).'</TD><TD>'.($pallets_l-$pallets_f).'</TD><TD>'.((($p_4_1_last-$p_4_1_first)*2)-($politizer_last-$politizer_first)).'</TD></TR></TABLE>';
			}
	?>

</div>
	<div class="footer_div">ОГметр. 2011 г.
</div>
</body>
<?php mysql_close(); ?>
</HTML>