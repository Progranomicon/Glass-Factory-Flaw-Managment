<?php session_start();?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<?php include_once "conn.php";
$from_date_time = $_POST['from_year']."-".$_POST['from_month']."-".$_POST['from_day']." ".$_POST['from_hour'].":".$_POST['from_minute'].":00";
$to_date_time = $_POST['to_year']."-".$_POST['to_month']."-".$_POST['to_day']." ".$_POST['to_hour'].":".$_POST['to_minute'].":00"; ?>
<HTML>
<head>
<title>������ � ���������</title>
<link rel="stylesheet" type="text/css" href="style_1.css" >
</head>
<body>
	<div class="header_div"><h2>���������� ���������� �����</h2></div>
	<div class="menu_div"> [<A HREF="index.php"> � ������ </A>] �����2 �����3 �����4 �����5</div>
	<div class="main_block_div"><p>���������������� ����� � <?php echo $from_date_time; ?> �� <?php echo $to_date_time; ?> (�� ������) </p>
	<?php
		
		$res=mysql_query('SELECT * FROM bottle2 WHERE date_time>="'.$from_date_time.'" AND date_time<= "'.$to_date_time.'";');
		$rows = mysql_num_rows($res);
		if ($rows<2)
			{
				echo "������������ ������ (����� 2� �������)";
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
				print '<TABLE id="table_with_report"><TR><TH>��/�</TH><TH>����� �����������</TH><TH>���������� ������ (�����), ��.</TH><TH>����������� �����, ��.</TH><TH>��� ������ ��������� ����� �������������</TH><TH>������ ������� ��������� (����������� ���������), ��.</TH><TH>������, ��.</TH><TH>���� �������������� �������� �������, ��.</TH></TR>
<TR><TH>1</TH><TH>2</TH><TH>3</TH><TH>4</TH><TH>5</TH><TH>6</TH><TH>7</TH><TH>8</TH></TR>
<TR><TD>1</TD><TD>����� �4</TD><TD>'.(($p_4_1_last-$p_4_1_first)*2).'</TD><TD>���� �� ������������</TD><TD>���� �� ������������</TD><TD>'.($politizer_last-$politizer_first).'</TD><TD>'.($pallets_l-$pallets_f).'</TD><TD>'.((($p_4_1_last-$p_4_1_first)*2)-($politizer_last-$politizer_first)).'</TD></TR></TABLE>';
			}
	?>

</div>
	<div class="footer_div">������. 2011 �.
</div>
</body>
<?php mysql_close(); ?>
</HTML>