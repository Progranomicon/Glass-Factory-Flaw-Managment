<?php
include '/../conn.php';
$q='select * from production';
$res=mysql_query($q);
$i=0;
$q2='insert into productionutf8(format_name, id, number_of_layers, glass_color, gost, type, units_number, pallet_size, boxing) values (';
while ($arr=mysql_fetch_assoc($res))
{
		/*$recs[$i]=array("format"=>$arr['format_name'], "id"=>$arr['id'], "num"=>$arr['number_of_layers'], "color"=>$arr['glass_color'], "type"=>$arr['type'], "units"=>$arr['units_number'], "pallet_size"=>$arr['pallet_size'], "boxing"=>$arr['boxing'] );*/
		$q2='insert into productionutf8(format_name, id, number_of_layers, glass_color, gost, type, units_number, pallet_size, boxing) values (';
		$q2.="'".iconv('windows-1251', 'UTF-8', $arr['format_name'])."', ".$arr['id'].", ".$arr['number_of_layers'].", '".iconv('windows-1251', 'UTF-8', $arr['glass_color'])."', NULL, "."'".iconv('windows-1251', 'UTF-8', $arr['type'])."', ".$arr['units_number'].", "."'".iconv('windows-1251', 'UTF-8', $arr['pallet_size'])."', '".iconv('windows-1251', 'UTF-8', $arr['boxing'])."');<br> ";
		echo $q2;
}
$q2.=')';

mysql_free_result($res);
mysql_set_charset("utf8");

?>