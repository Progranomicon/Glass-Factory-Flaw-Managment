<?php
include "/../conn.php";
mysql_set_charset("utf8");
require_once 'Events.php';
$Text="<h4>".substr($PPREq[$_GET['EqNum']], 45).".<br> Регламентные работы: </h4>";
$TO1="<b>TO-1</b>
     <ul>";
$TO2="<b>TO-2</b>
     <ul>";

$Rules=mysql_query("SELECT * FROM rules WHERE EqNum='".$_GET['EqNum']."'");
         while ($Rls =  mysql_fetch_assoc($Rules) )
        {
            if($Rls['TONum']==1)
                {
                  $TO1.="<li>".$Rls['Rule']."</li>";  
                }
            else 
                {
                $TO2.="<li>".$Rls['Rule']."</li>";  
                }
        }        
        mysql_free_result($Rules);
 
 $TO2.="</ul>";       
 $TO1.="</ul>";       
 $Text.=$TO1.$TO2;
echo $Text;
//echo $_GET['EqNum'];

?>
