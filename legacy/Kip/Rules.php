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
        echo '<script type="text/javascript">
       
            var PPREq=[];';
            foreach ($PPREq as $Code => $Eq) {
                echo 'PPREq.push([' . $Code . ',"' . $Eq . '"]);';
            }
            
            echo '</script>';
        echo '<div id=MainBlock>';
       If (!isset($_GET['RuleIs']))
           {        
            echo '<FORM action="Rules.php" method=GET>
                <h2>Регламентные работы по ТО</h2>
                <Table id="AddForm">
                <tr>
                        <td>Участок</td>
                        <td colspan="3"><SELECT name=EqArea onclick="ViewEqRules(this.options[this.selectedIndex].value);"><option selected value="10"></option>';
            foreach ($Area as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT>
                  ';
            echo '
                    </tr>
                    <tr>
                        <td>Оборудование</td>
                        <td colspan="3" id="EqSelectByArea"><Select></select>
                    </tr>
                </table>
                <div id="AddFormDiv">
                <a href="javascript:ShowAddForm()">Добавить</a>
                </div>
            </form><hr><div id="RulesList"></div>'; 
        }
        else
        {
            require '/../conn.php';
            mysql_set_charset("utf8");
$q="insert into steklo.rules set EqNum='".$_GET['Equipment']."',
                                      TONum='".$_GET['TONum']."',
                                      Rule='".$_GET['RuleIs']."'";
$res=mysql_query($q); //or die("Ошибка MySQL: ".mysql_error());
//echo $q.'<br>res='.$res.'<br>';

if($res==0){
    echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>';
}
Else{
    echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Добавлено:</span> ТО-'.$_GET['TONum'].' для '.substr($PPREq[$_GET['Equipment']], 45).'<br>
            <a href="Rules.php">← Назад</a>';
}
            }
        echo '</div>';
        require 'Footer.php';
        ?>
    <script>
        //ViewEq(0);
    </script>
    </body>
</HTML>
<?php
/*<SELECT name=Equipment onchange="CallRules(this.options[this.selectedIndex].value);">';
            foreach ($PPREq as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT>*/
?>

