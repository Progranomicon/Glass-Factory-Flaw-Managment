<?php 
session_start();
?>
<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>Отчеты ППР</title>
    </head>
    <body>
        
        <?php
        include "KipHeader.php";
        require 'Menu.php';
        require '/../conn.php';
        require 'Events.php';
        echo '
            <FORM action="ViewTO.php" method=GET>
            <h2>Отчеты о проведенном ТО</h2>
        <Table id="AddForm">
                <tr>
                        <td>Участок</td>
                        <td colspan="3"><SELECT name="EqArea">';
            foreach ($Area as $Code => $Eq) {
				if(isset($_GET['EqArea'])){
					if (intval($_GET['EqArea'])==$Code) echo '"<option selected value=' . $Code . '>' . $Eq . '</option>"';
					echo '"<option value=' . $Code . '>' . $Eq . '</option>"';}
				else echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
            }
              echo '</SELECT>';
            echo ' </tr>
                    <tr>
                        <td>Месяц, год</td>
                        <td colspan="3">';
            echo '<SELECT name=TODateMonth>';
            For ($i = 1; $i <= 12; $i++) {
				if(isset($_GET['TODateMonth'])){
					if (intval($_GET['TODateMonth'])==$i)  echo '<option selected value=' . $i . '>' . $mn[$i] . '</option>';
					echo '"<option value=' . $i . '>' . $mn[$i] . '</option>"';
				}
                else print '<option value=' . $i . '>' . $mn[$i] . '</option>';
            }
            echo '</SELECT>
                    
                    ';
            
            echo '<SELECT name=TODateYear><option selected value="2013">2013</option>';
            For ($i = 2012; $i <= 2020; $i++) {
				if(isset($_GET['TODateYear'])){
					if(intval($_GET['TODateYear'])==$i) print '<option selected value=' . $i . '>' . $i . '</option>';
					echo '"<option value=' . $i . '>' . $i . '</option>"';}
				else print '<option value=' . $i . '>' . $i . '</option>';
            }
            echo '</SELECT>
                </tr>
                <tr>
                     <td colspan=4 style="text-align:center"><input id="Submit" type="submit"  value="Получить"></td>
                </tr>
                </TABLE>
                </form>
                <hr>
                ';
            if (isset($_GET['TODateYear']))
                {
                $ToPrint =/*'<div id="Shapka">
                        “Утверждаю”:<br>
                            Главный инженер Филиала <br>
                            ЗАО “Рузаевский Стекольный Завод”<br>
                            __________________ М.Х. Юсупов<br>
                            “___”_____________ 20____ г.
                    </div>*/'
                    <br>
                     <div style="text-align:center;"> Отчет о проведение ППР АСУ  '.$Area2[$_GET['EqArea']];
                
                $ToPrint.='<br> '.$mn[$_GET['TODateMonth']].' '.$_GET['TODateYear'].' г. </div>
                    <Table align=center width=100% id="PDFReport">
                <tr>
                        <td>Оборудование<br></td>
                        <td>Выполнено</td>
                        <td>Коментарии</td>
                        <td>Исполнитель</td>
                </tr>
                ';
                    $q="SELECT * FROM steklo.ppr WHERE TODate>'".$_GET['TODateYear']."-".$_GET['TODateMonth']."-01 00:00:00' AND TODate<'".$_GET['TODateYear']."-".$_GET['TODateMonth']."-25 23:59:59' and TOArea='".$_GET['EqArea']."'";
                    //echo "<br>".$q."<br>";
                    
                    $res = mysql_query($q);
                    if(mysql_num_rows($res)>0)
                        {
                            while ($assoc = mysql_fetch_assoc($res)) {
                                $ToPrint.='<tr>
                                                <td>'.substr($PPREq[$assoc['Equipment']],45);
                                if ($assoc['EqNum']!=0 )
                                    {
                                        $ToPrint.=" №".$assoc['EqNum'];
                                }
                                 $ToPrint.='</td>
                                                <td>ТО-'.$assoc['TONum'].'</td>
                                                <td><a href="edit.php?edit='.$assoc['id'].'" style="text-decoration:none;color:black;">';
                                if ($assoc['Comments']=="")
                                    {
                                        $ToPrint.=" Комментариев нет ";
                                    }
                                else
                                    {
                                $ToPrint.=$assoc['Comments'];
                                }
                                  $ToPrint.=  '</a></td>
                                                <td>'.$User[$assoc['Executor']].'</td>
                                           </tr>';
                            }
                            $ToPrint.="</Table>
                                        <br>";
                            $ToPrint.='Ведущий инженер-электроник <span style="color:white">__________________________________________</span> Жмуров Д.Е.<br>
                                        <br>
                                       Главный метролог <span style="color:white">____________________________________________________</span> Зоткин С.И.';
                            echo $ToPrint;
                            $_SESSION['ToPrint']=$ToPrint;
                            echo '<br> <a href="MakePDF.php" >Скачать в PDF</a> <br>';
                        }
                     else {
                          echo "<br> Не найдено записей за этот месяц <br>";
                     }
                }
        require 'Footer.php';
        ?>
        

    </body>
</HTML>