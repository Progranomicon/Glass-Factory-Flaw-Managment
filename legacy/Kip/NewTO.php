<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <script type="text/javascript" src="PPRFunctions.js"></script>
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <title>Отчеты и настройки</title>
    </head>
    <body>
<?php
require 'Events.php';
include "KipHeader.php";
require 'Menu.php';
date_default_timezone_set('Europe/Moscow');
$fYear=getdate();
echo '<div id=MainBlock><h2>Внесите данные о выполненном ТО</h2>';  
echo '<FORM action="NewTO.php" method=POST>';
echo '<Table id="AddForm">';
if (!isset($_POST['TOArea'])){
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
        if ($i == $fYear['mon'])
            {echo '<option selected value=' . $i . '>' . $mn[$i] . '</option>';}
        else
            {echo '<option value=' . $i . '>' . $mn[$i] . '</option>';}}
    echo '</SELECT>';
        echo '<SELECT name="TODateYear" id="TODateYear"">';
        For ($i = 2012; $i <= 2030; $i++) {
            if ($i == $fYear['year'])
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
if (isset($_POST['TOArea'])){
    echo '<tr><td colspan=2><A href="NewTO.php">← Вернуться</a><br><br><b>Отчет по '.$complexReport[$_POST['TOArea']][1].'</b> за '.$mn[$_POST['TODateMonth']].' '.$_POST['TODateYear'].' года<br><br><span style="border:1px solid black;">Исполнитель: '.$User[$complexReport[$_POST['TOArea']][0]].'</td></tr>';

foreach ($complexReport[$_POST['TOArea']][2] as $val=>$el){
    echo"<tr><td colspan=4><br><b>".$PPREq[$el];
    if ($complexReport[$_POST['TOArea']][3][$val]!=0)
        echo " № ".$complexReport[$_POST['TOArea']][3][$val];
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
if (isset($_POST['TOArea']))
    echo '<INPUT type="hidden" name=Area value='.$_POST['TOArea'].'><INPUT type="hidden" name=M value='.$_POST['TODateMonth'].'><INPUT type="hidden" name=Y value='.$_POST['TODateYear'].'>';
echo ' </form>
        <br>';
//print_r($_POST);
echo '</div>';
if (isset($_POST['M'])){
    /*1 разобрать*/
    $parity=2;
    Foreach ($_POST as $k=>$v){
        if($parity==2){
            $complexReport[$_POST['Area']][4][]=$v;
            $parity=1;
        }
        else {
            $complexReport[$_POST['Area']][5][]=$v;
            $parity=2;
        }
    }    
    /*2 записать*/
    require '/../conn.php';
	mysql_set_charset("utf8");
	$q="SELECT * FROM ppr Where TODate>'".$_POST['Y']."-".$_POST['M']."-01 00:00:00' AND TODate<'".$_POST['Y']."-".$_POST['M']."-25 23:59:59' and TOArea='".$_POST['Area']."'";
	$res=mysql_query($q);
	if(mysql_num_rows($res)<2){
		$q="INSERT INTO ppr(CDate, TODate, TOArea, Equipment, EqNum, TONum, Comments, Executor) VALUES ";
		foreach ($complexReport[$_POST['Area']][2] as $el=>$val){
			$q.="(NOW(), '".$_POST['Y']."-".$_POST['M']."-15 12:00:00', '".$_POST['Area']."', '".$val."', '".$complexReport[$_POST['Area']][3][$el]."', '".$complexReport[$_POST['Area']][4][$el]."','".$complexReport[$_POST['Area']][5][$el]."', '".$complexReport[$_POST['Area']][0]."'),";  
		}
		$q{strlen($q)-1}=" ";
		$res=mysql_query($q);
		if($res==0){
			echo '<br><span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>'.$q;
		}
		Else{
			echo '<br><span style="font-size: 24px; color: #009933;font-weight: bold">Добавлено: </span>'.mysql_affected_rows().' записей<br>';
		}
	}
	else{
		Echo "На участке ".$complexReport[$_POST['Area']][1]." за ".$mn[$_POST['M']]." ".$_POST['Y']." года записи уже существуют.";
	}
}

require 'Footer.php';
?>
        <div id="AlreadyExist" style="display: none; float: right; position: absolute; border: 1px solid gray; left: 800px; top: 160px; width: 400px; height: Auto; padding: 5px;font-size: 0.75em;">
        </div>
    <script>
<?php 
if (isset($_POST['EqArea']))
    { 
    echo 'ViewEq('.$_POST['EqArea'].');';
    echo 'CallTOs();';
    }
?>
    </script>
    </body>
</HTML>


