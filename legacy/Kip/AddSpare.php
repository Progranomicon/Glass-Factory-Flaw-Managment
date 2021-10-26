<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        
        <title>Отчеты и настройки</title>
    </head>
    <body>
<?php
        require 'Events.php';
        include "KipHeader.php";
        require 'Menu.php';
        echo '<div id=MainBlock>';
       If (!isset($_GET['Count']))
           {        
            echo '<FORM action="AddSpare.php" method=GET>
			<H2>Добавление запчасти.<H2>
                <Table id="AddForm">
                    <tr>
                        <td>Наименование</td>
                        <td colspan="3"><textarea placeholder="Нименование" cols="58" rows="6" name="Name"></textarea></td>
                    </tr>
                    <tr>
                        <td>Количество</td>
                        <td><input id="EventDate" type="text" name="Count" value="1"></td>
                    </tr>
                    <tr>
                        <td>Возможные аналоги</td>
                        <td colspan="3"><textarea placeholder="Аналоги" cols="58" rows="6" name="Replace"></textarea></td>
                    </tr>
                    <tr>
                        <td>Назначение</td>
                        <td colspan="3"><textarea placeholder="Назначение" cols="58" rows="6" name="Destonation"></textarea></td>
                     </tr>
                     <tr>
                          <td colspan=4 style="text-align:center"><input id="Submit" type="submit"  value="Добавить"></td>
                      </tr>
                </table>
            </form>'; 
        }
        else
            {
            require '/../conn.php';
            mysql_set_charset("utf8");
$q="insert into steklo.spares set StartDate=NOW(),
                                      SpareName='".$_GET['Name']."',
                                      CountOfSpares='".$_GET['Count']."',
                                      SpareReplace='".$_GET['Replace']."',
                                      Destonation='".$_GET['Destonation']."',
                                      State='0';";
$res=mysql_query($q);
//echo $q.'<br>';
if($res==0){
    echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>';
}
Else{
    echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Добавлено</span><br>';
}
            }
        echo '</div>';
        require 'Footer.php';
        ?>
    </body>
</HTML>


