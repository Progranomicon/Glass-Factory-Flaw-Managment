<?php if(!isset($_POST['lgn']))
		{
			if(isset($_SESSION['user_name']))
			{
				Print '<div class="menu_div"> <A HREF="report_first.php"> ����� </A> �����2 �����3 �����4 �����5 <br></div>';
			}
			else
			{
				echo '<div class="menu_div"> <FORM action="index.php" METHOD=POST> �����: <input type=text name=lgn > &nbsp ������: <input type=password name=pswrd > &nbsp <input type=submit value="�����"> </FORM></div>';
			}
		}
		else
		{
			include_once "conn.php";
			$res=mysql_query('SELECT * FROM people WHERE login="'.$_POST['lgn'].'" AND pswd="'.$_POST['pswrd'].'";');
			if(mysql_num_rows($res)<1)
			{
				print '<div class="menu_div">  <FORM action="index.php" METHOD=POST> �����: <input type=text name=lgn > &nbsp ������: <input type=pass name=pswrd > &nbsp <input type=submit value="�����"> <br> <b> �������������� ���� �����+������.</b>  </FORM></div>';
			}
			else
			{
				$row=mysql_fetch_row($res);
				$_SESSION['user_name']=$row[3];
				$_SESSION['lvl']=$row[4];
				Print '<div class="menu_div"> <A HREF="report_first.php"> ����� </A> �����2 �����3 �����4 �����5 </div><br><b>������� �����������, '.$_SESSION['user_name'].'.</b>';
			}
			mysql_close();
		}
		
?>
<input type=text value="2011-08-15 07:30:00" name=date1 > &nbsp <input type=datetime-local value="2011-08-15 19:30:00" name=date2 >
<meta http-equiv="Content-Type" content="text/html; charset=cp1251">
[<A HREF="report_first.php"> ����� </A>]

print '<TABLE id="table_with_report"><TR><TH>��/�</TH><TH>����� �����������</TH><TH>���������� ������ (�����), ��.</TH><TH>����������� �����, ��.</TH><TH>��� ������ ��������� ����� �������������</TH><TH>������ ������� ��������� (����������� ���������), ��.</TH><TH>������, ��.</TH><TH>���� �������������� �������� �������, ��.</TH></TR>
<TR><TH>1</TH><TH>2</TH><TH>3</TH><TH>4</TH><TH>5</TH><TH>6</TH><TH>7</TH><TH>8</TH></TR>
<TR><TD>1</TD><TD>����� �4</TD><TD>'.(($p_4_1_last-$p_4_1_first)*2).'</TD><TD>���� �� ������������</TD><TD>���� �� ������������</TD><TD>'.($politizer_last-$politizer_first).'</TD><TD>'.($pallets_l-$pallets_f).'</TD><TD>'.((($p_4_1_last-$p_4_1_first)*2)-($politizer_last-$politizer_first)).'</TD></TR></TABLE>';

$rep_string_to_PDF = '<TABLE cellspacing="0" cellpadding="1" border="1" align="center" >
		<TR>
			<Td width="50">��/�</td>
			<td width="140">����� �����������</td>
			<td width="200">���������� ������ (�����), ��.</td>
			<td width="150">����������� �����, ��.</td>
			<td width="60">��� ������ ��������� ����� �������������</td>
			<td width="200">������ ������� ��������� </br>(����������� ���������), ��.</td>
			<td width="70">������, ��.</td>
			<td width="30">���� �������������� �������� �������, ��.</td>
		</TR>
		<TR>
			<Td width="30">1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td>6</td>
			<td>7</td>
			<td>8</td>
		</TR>
		<TR>
			<TD width="30">1</TD>
			<TD>����� 4</TD>
			<TD>'.($arr_assets[0]["total_total"]).'</TD>
			<TD>���� �� ������������</TD>
			<TD>���� �� ������������</TD>
			<TD>'.($arr_assets[3]["total_total"]).'</TD>
			<TD>'.($arr_assets[4]["total_total"]).'('.($arr_assets[1]["total_total"]).')</TD>
			<TD>'.(($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"])).'('.(sprintf ("%01.2f",(((($arr_assets[0]["total_total"])-($arr_assets[3]["total_total"]))*100)/$arr_assets[0]["total_total"]))).'%)</TD>
		</TR>
		</TABLE>';