<?php
include "/../conn.php";
mysql_set_charset("utf8");
require_once 'Events.php';
echo "<b>Записи по ".$Area[$_GET['Area']];
if ($_GET['AreaNum']!=0) echo " №".$_GET['AreaNum'];
echo  ".<br>за ".$mn[$_GET['DateM']]."  ".$_GET['DateY']." г.</b><br>";
$q="SELECT * FROM steklo.ppr WHERE TODate>'".$_GET['DateY']."-".$_GET['DateM']."-01 00:00:00' AND TODate<'".$_GET['DateY']."-".$_GET['DateM']."-25 23:59:59' and TOArea='".$_GET['Area']."' and TOAreaNum='".$_GET['AreaNum']."'";
$Rules=mysql_query($q);
//echo '<br>'.$q.'<br>';
         while ($Rls =  mysql_fetch_assoc($Rules) )
        {
             echo substr($PPREq[$Rls['Equipment']],40);
             if ($Rls['EqNum']!=0) echo " №".$Rls['EqNum'];
             echo '(ТО-'.$Rls['TONum'].')<br>';
        }        
        mysql_free_result($Rules);
//echo $_GET['Area']." / ".$_GET['Date'];

?>
