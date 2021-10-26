<?php
echo '<IMG id="t" SRC="t.png">';
echo "<h2>Паллет ".$_GET['SN']."</h2>";
include "/../conn.php";
mysql_set_charset("utf8");
require_once 'Events.php';

echo "Номер: ".  substr($_GET['SN'], 10, 4)."<br>";
Echo "Формат: ";
$RExecutors=mysql_query("SELECT * FROM scaner_users");
        $Executors = array();
        while ($RetExecs =  mysql_fetch_assoc($RExecutors) )
        {
            $Executors[$RetExecs['id']]=$RetExecs['FIO'];
        }        
        mysql_free_result($RExecutors);
        
$RProduction=mysql_query("SELECT * FROM productionutf8 WHERE id='".substr($_GET['SN'],7,3)."'");

        while ($RetProd =  mysql_fetch_assoc($RProduction) )
        {
           $Production=array($RetProd['format_name'],$RetProd['units_number'],$RetProd['boxing'],0);
        }        
        mysql_free_result($RProduction);
        echo  $Production[0].' ('.$Production[1].' шт., '.$Production[2].')<br>';
$RHistory=mysql_query("SELECT * FROM steklo.pallets WHERE sn='".$_GET['SN']."'");
        $History = array();
        while ($RetHistory =  mysql_fetch_assoc($RHistory) )
        {
           $History[]=array($RetHistory['eventDateTime'],$RetHistory['eventId'],$RetHistory['executor'],0);
        }
        mysql_free_result($RHistory);
echo '<TABLE id="table_with_report">
                        <tr>
                            <th>Дата</th>
                            <th>Операция</th>
                            <th>Исполнитель</th>
                        </tr>';
foreach ($History as $Code => $inf) 
      {
		if (isset($Executors[$inf[2]])){
								$ExecutorP=$Executors[$inf[2]];
							}
							else{
								$ExecutorP="не записан.";
							}
          echo "<tr><td>".$inf[0]."</td><td>".$Events[$inf[1]]."</td><td>".$ExecutorP."</td></tr>";
      }
echo "</table>";
   echo '<br><A HREF="javascript:HideHistory();"> [Х] Убрать историю</A>';
?>