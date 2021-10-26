<?php
error_reporting(0);
session_start();

$line[7]=array(5051,5055,5056,5062,5039);
$line[8]=array(5049,5053,5063,5064,5037);
$line[9]=array(5050,5052,5065,5057,5038);
$Lines= explode(', ', $_GET['Lines']);
$Report='<div style="text-align:center;"><h2>Производственный отчет</h2> по линии №'.$_GET['Lines']." ".$_GET['TheTime']." <br><br>";
include_once 'Settings.php';
$Report.='
<TABLE id="table_with_report" class=TableWithReport style="text-align:center; align:center; border:1px solid black; border-spacing:0px;border-collapse:sCollaps; " >
<TR>

<TH>Номер машинолинии</TH>
<TH>Формат</TH>';
foreach ($VC2["7"] as $F => $C){
	$Report.='<TH>'.$C[1].'</TH>';
}
$Report.='</TR>
<TR>
<TH>1</TH>
<TH>2</TH>
<TH>3</TH>
<TH>4</TH>
<TH>5</TH>
<TH>6</TH>
<TH>7</TH>

</TR>';
// часть 1 - получить все форматы
$host = "192.168.113.112";
$user = 'root';
$psswrd = "parolll";
$db_name = 'steklo'; 
$Production=array();
print_r($arr);
reset($arr);
@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
mysql_set_charset("utf8");
mysql_select_db($db_name);
$rows=mysql_query('SELECT * FROM productionutf8;');
while ($row =  mysql_fetch_assoc($rows) ){
	$production[$row['id']]=$row['format_name'];
}
mysql_free_result($rows);
mysql_close();

// часть 2  - сделать отчет
$host = "192.168.113.112";
$user = 'root';
$psswrd = "parolll";
$db_name = 'viko1'; 
$arr=array();
@mysql_connect($host, $user, $psswrd) or die("Ошибка MySQL: ".mysql_error());
mysql_set_charset("utf8");
mysql_select_db($db_name);
foreach ($Lines as $N => $L) {
	if($L!=""){
		$NewReq= str_replace("tabname", "viko".$L, $_GET['MR']);
		$rows=mysql_query($NewReq);
		while ($row =  mysql_fetch_assoc($rows)){
			$arr[$L][$row['VikoCode']][$row['VikoCounterId']]+=intval($row['VikoCount']);
		}
		mysql_free_result($rows);
		foreach ($arr[$L] as $Format => $Counters){
			$Report.="<TR>
			<TD>".$L."</TD>
			<TD>";
			if (isset($production[$Format])) $Report.= $production[$Format];
			else $Report.=" Неизвестен (".$Format.")";
			$Report.= '</TD>';

			foreach($line[$L] as $ord=>$cou){
				$Report.= "<TD>";
				if (!isset($arr[$L][$Format][$cou])) $Report.='No data.';
				else $Report.=$arr[$L][$Format][$cou];
				$Report.="</TD>";
			}
			/*foreach ($Counters as $Cou => $Co)
			{
			//echo "<TD> Счетчик ".$Cou."=".$Co."</TD>";
			$Report.= "<TD>".$Co."</TD>";
			}*/
			$Report.= "</TR>";
		}
	}
}
mysql_close();
error_reporting(1);
$Report.="</Table>";
echo $Report;
$_SESSION['Report']=$Report;
echo '</div><br> <a href="MakePDF.php" >Скачать в PDF</a> <br><br>';
?>
