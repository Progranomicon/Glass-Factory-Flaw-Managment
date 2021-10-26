<?php
include '/../conn.php';
$q='select * from pcsjournal4';
$res=mysql_query($q);
$i=0;
$q2='insert into pcsjournal3(CurDateTime, EventDateTime, EventType, Equipment, NEq, Shift, RestoreTime, NatureFault, Reason, ActionTaken, SpentMaterials, Comments) values (';
while ($arr=mysql_fetch_assoc($res))
{
		/*$recs[$i]=array("format"=>$arr['format_name'], "id"=>$arr['id'], "num"=>$arr['number_of_layers'], "color"=>$arr['glass_color'], "type"=>$arr['type'], "units"=>$arr['units_number'], "pallet_size"=>$arr['pallet_size'], "boxing"=>$arr['boxing'] );*/
		$q2='insert into pcsjournal3(CurDateTime, EventDateTime, EventType, Equipment, NEq, Shift, RestoreTime, NatureFault, Reason, ActionTaken, SpentMaterials, Comments) values (';
		$q2.="'".$arr['CurDateTime']."', '".$arr['EventDateTime']."', ".$arr['EventType'].", '".$arr['Equipment']."', "."'".$arr['NEq']."', ".$arr['Shift'].", '".$arr['RestoreTime']."', '".iconv('windows-1251', 'UTF-8', $arr['NatureFault'])."', '".iconv('windows-1251', 'UTF-8', $arr['Reason'])."', '".iconv('windows-1251', 'UTF-8', $arr['ActionTaken'])."', '".iconv('windows-1251', 'UTF-8', $arr['SpentMaterials'])."', '".iconv('windows-1251', 'UTF-8', $arr['Comments'])."');<br> ";
		echo $q2;
}
$q2.=')';

mysql_free_result($res);

?>