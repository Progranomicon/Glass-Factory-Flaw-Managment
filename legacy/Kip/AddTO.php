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
            echo '<FORM action="AddTO.php" method=GET>
                <h2>Внесите данные о выполненном ТО</h2>
                <Table id="AddForm">
                <tr>
                        <td>Участок</td>
                        <td colspan="3"><SELECT name="EqArea" id="EqArea" onclick="ViewEq(this.options[this.selectedIndex].value);" onchange="CallTOs();"><option selected value="0"></option>';
            foreach ($Area as $Code => $Eq) 
                    {
                    if ($Eq == $Area[$_GET['EqArea']]) {
                        print '<option selected value=' . $Code . '>' . $Eq . '</option>';
                    } else {
                         echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }

                    }
              echo '</SELECT> #
                  ';
            echo '<SELECT name=EqAreaNum id=EqAreaNum onchange="CallTOs();"><option value="">Нет</option>';
            For ($i = 1; $i <= 9; $i++) {
                if ($i == $_GET['EqAreaNum'])
                    {
                        print '<option selected value=' . $i . '>' . $i . '</option>';
                    }
                    else
                    {
                         print '<option value=' . $i . '>' . $i . '</option>';
                    }
            }
            echo '</SELECT>
                    </tr>
                    <tr>
                        <td>Месяц, год</td>
                        <td colspan="3">';
            echo '<SELECT name=TODateMonth id=TODateMonth onchange="CallTOs();">';
            For ($i = 1; $i <= 12; $i++) {
                if ($i == $_GET['TODateMonth'])
                    {
                        print '<option selected value=' . $i . '>' . $mn[$i] . '</option>';
                    }
                    else
                    {
                         print '<option value=' . $i . '>' . $mn[$i] . '</option>';
                    }
            }
            echo '</SELECT>
                    
                    ';
            echo '<SELECT name="TODateYear" id="TODateYear" onchange="CallTOs();">';
            For ($i = 2012; $i <= 2020; $i++) {
                if ($i == $_GET['TODateYear'])
                    {
                        print '<option selected value=' . $i . '>' . $i . '</option>';
                    }
                    else
                    {
                         print '<option value=' . $i . '>' . $i . '</option>';
                    }
                    
            }
            echo '</SELECT></td>
                    </tr>
                    <tr>
                        <td>Оборудование</td>
                        <td colspan="3" "><span id="EqSelectByArea"><SELECT name=Equipment>';
            foreach ($PPREq as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT></span>
                     № 
                    ';
            echo '<SELECT name="NEq"><option selected value="0">нет</option>';
            For ($i = 1; $i <= 20; $i++) {
                    print '<option value=' . $i . '>' . $i . '</option>';
            }
            echo '</SELECT></td>
                    </tr>
                    <tr>
                        <td>ТО</td>
                        <td><SELECT name="TONum">
                       <option value=1>ТО-1</option>
                       <option value=2>ТО-2</option>
                   </SELECT></td>
                    </tr>
                    <tr>
                        <td>Комментарии</td>
                        <td colspan="3"><textarea placeholder="Оставь пустым, если комментариев нет" cols="58" rows="6" name="Comments"></textarea></td>
                    </tr>
                    <tr>
                        <td>Выполнил</td>
                        <td colspan="3"><SELECT name=User>';
            foreach ($User as $Code => $Eq) 
                    {
                        echo '"<option value=' . $Code . '>' . $Eq . '</option>"';
                    }
              echo '</SELECT>
                     </td>
                    </tr>
                     <tr>
                          <td colspan=4 style="text-align:center"><input id="Submit" type="submit"  value="Добавить"></td>
                     </tr>
                </table>
            </form><br>'; 
        If (isset($_GET['User']))
            {
            require '/../conn.php';
            mysql_set_charset("utf8");
$q="insert into steklo.ppr set CDate=NOW(),
                                      TODate='".$_GET['TODateYear']."-".$_GET['TODateMonth']."-15 12:00:00',
                                      TOArea='".intval($_GET['EqArea'])."',
                                      TOAreaNum='".intval($_GET['EqAreaNum'])."',
                                      Equipment='".$_GET['Equipment']."',
                                      EqNum='".intval($_GET['NEq'])."',
                                      TONum='".$_GET['TONum']."',
                                      Comments='".$_GET['Comments']."',
                                      Executor='".$_GET['User']."'";
$res=mysql_query($q); //or die("Ошибка MySQL: ".mysql_error());
//echo $q.'<br>res='.$res.'<br>';
if($res==0){
    echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>';
}
Else{
    echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Добавлено: </span>TO-'.$_GET['TONum'].' для '.substr($PPREq[$_GET['Equipment']], 45).' за ' .$mn[$_GET['TODateMonth']]. ' '.$_GET['TODateYear'].' года<br>';
}
            }
        echo '</div>';
        require 'Footer.php';
        ?>
        <div id="AlreadyExist" style="display: block; float: right; position: absolute; border: 1px solid gray; left: 800px; top: 160px; width: 400px; height: Auto; padding: 5px;font-size: 0.75em;">
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


