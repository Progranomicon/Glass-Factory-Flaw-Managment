<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <script type="text/javascript" src="PPRFunctions.js"></script>
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <script>
            
        </script>
        <title>Отчеты и настройки</title>
    </head>
    <body>
<?php
require 'Events.php';
include "KipHeader.php";
require 'Menu.php';
echo '<div id=MainBlock><h2>Внесите данные о выполненном ТО</h2>';  
echo '<FORM action="NewTO.php" method=GET>';
echo '<Table id="AddForm">';
if (!isset($_GET['TOArea'])){
    echo '<tr><td>Участок</td><td><SELECT name="TOArea">';
    foreach ($complexReport as $val=>$elem){
        echo "<option value='".$val."'>".$elem[1]."</option>";
        }
    echo '</SELECT></td></tr>';
    echo '          <tr>
                    <td>Месяц, год</td>
                    <td colspan="3">';
    echo '<SELECT name=TODateMonth id=TODateMonth>';
    For ($i = 1; $i <= 12; $i++) {
        if ($i == $_GET['TODateMonth'])
            {echo '<option selected value=' . $i . '>' . $mn[$i] . '</option>';}
        else
            {echo '<option value=' . $i . '>' . $mn[$i] . '</option>';}}
    echo '</SELECT>';
        echo '<SELECT name="TODateYear" id="TODateYear"">';
        For ($i = 2012; $i <= 2030; $i++) {
            if ($i == $_GET['TODateYear'])
                {
                    print '<option selected value=' . $i . '>' . $i . '</option>';
                }
                else
                {
                     print '<option value=' . $i . '>' . $i . '</option>';
                }

        }
    echo '</SELECT></td></tr>
          <tr><td colspan=2 style="text-align:center"><input id="Submit" type="submit"  value="Продолжить"><hr></td></tr>';
}
if (isset($_GET['TOArea'])){
    echo '<tr><td colspan=2><A href="NewTO.php">← Вернуться</a><br><br><b>Отчет по '.$complexReport[$_GET['TOArea']][1].'</b> за '.$mn[$_GET['TODateMonth']].' '.$_GET['TODateYear'].' года<br><br><span style="border:1px solid black;">Исполнитель: '.$User[$complexReport[$_GET['TOArea']][0]].'</td></tr>';

foreach ($complexReport[$_GET['TOArea']][2] as $val=>$el){
    echo"<tr><td colspan=4><br><b>".$PPREq[$el];
    if ($complexReport[$_GET['TOArea']][3][$val]!=0)
        echo " № ".$complexReport[$_GET['TOArea']][3][$val];
    echo "</b></td></tr>";
    echo '<tr><td colspan=2><br>ТО-
          <SELECT name="TO'.$val.'">
          <option value=1>1</option>
          <option value=2>2</option>
          </SELECT></td></tr>';
    echo '<tr>
          <td>Комментарии</td>
          <td colspan="3"><textarea placeholder="Оставь пустым, если комментариев нет" cols="58" rows="6" name="Comments'.$val.'"></textarea></td>
          </tr>';
    
    echo '<tr><td colspan=2 style="text-align:center"><hr></td></tr>';
   
}
echo '<tr>
                        
            </tr>';
echo '<tr><td colspan=2 style="text-align:center"><br><input id="Submit" type="submit"  value="Записать"></td></tr>';
}
echo '</table>';
if (isset($_GET['TOArea']))
    echo '<INPUT type="hidden" name=Area value='.$_GET['TOArea'].'><INPUT type="hidden" name=M value='.$_GET['TODateMonth'].'><INPUT type="hidden" name=Y value='.$_GET['TODateYear'].'>';
echo ' </form>
        <br>';
//print_r($_GET);
echo '</div>';
if (isset($_GET['M'])){
    /*1 разобрать*/
    $parity=2;
    Foreach ($_GET as $k=>$v){
        if($parity==2){
            $complexReport[$_GET['Area']][4][]=$v;
            $parity=1;
        }
        else {
            $complexReport[$_GET['Area']][5][]=$v;
            $parity=2;
        }
    }    
    /*2 записать*/
    require '/../conn.php';
    mysql_set_charset("utf8");
    $q="INSERT INTO ppr(CDate, TODate, TOArea, Equipment, EqNum, TONum, Comments, Executor) VALUES ";
    foreach ($complexReport[$_GET['Area']][2] as $el=>$val){
        $q.="(NOW(), '".$_GET['Y']."-".$_GET['M']."-15 12:00:00', '".$_GET['Area']."', '".$val."', '".$complexReport[$_GET['Area']][3][$el]."', '".$complexReport[$_GET['Area']][4][$el]."','".$complexReport[$_GET['Area']][5][$el]."', '".$complexReport[$_GET['Area']][0]."'),";  
    }
    $q{strlen($q)-1}=" ";
    //echo "<br>".$q."<br>";
    $res=mysql_query($q);
    //echo $q.'<br>res='.$res.'<br>';
    if($res==0){
        echo '<br><span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>';
    }
    Else{
        echo '<br><span style="font-size: 24px; color: #009933;font-weight: bold">Добавлено: </span>'.mysql_affected_rows().' записей<br>';
    }
}

require 'Footer.php';
?>
        <div id="AlreadyExist" style="display: none; float: right; position: absolute; border: 1px solid gray; left: 800px; top: 160px; width: 400px; height: Auto; padding: 5px;font-size: 0.75em;">
        </div>
    <script>
<?php 
if (isset($_GET['EqArea']))
    { 
    echo 'ViewEq('.$_GET['EqArea'].');';
    echo 'CallTOs();';
    }
?>
    </script>
    </body>
</HTML>


