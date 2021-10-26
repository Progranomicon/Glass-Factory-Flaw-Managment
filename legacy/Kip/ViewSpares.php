<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <style>
            #ourtable {border-collapse: collapse; background: #ccffff; margin-left: 10px; margin-top: 10px; font-family: tahoma; font-size: 12px}
            #ourtable, #ourtable td {border: 1px solid #003366}
            #ourtable td {padding: 2px 5px}
            #ourtable tr.odd {background: #99ccff}
            #ourtable tr.top td {background: #003366; color: white; text-align: center}
        </style>
        <title>Отчеты и настройки</title>
    </head>
    <body>

        <?php
        include "KipHeader.php";
        require 'Menu.php';
        require '/../conn.php';
        if (!isset($_GET['id'])) {
            $q = "SELECT * FROM spares WHERE State='0'";
            echo '
           <h2 style="font-family: Helvetica;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspНеобходимые запчасти</h2>
      <TABLE border="1" width="80%" id="ourtable" >
        <tr class="top">
            <td>Id</td>
            <td>Наименование</td>
            <td>Количество</td>
            <td>Возможные аналоги</td>
            <td>Назначение</td>
            <td>Купить</td>
        </tr>';
            $res = mysql_query($q);
            $i = 1;
            $odd = 1;
            while ($assoc = mysql_fetch_assoc($res)) {

                if ($odd == 1) {
                    echo'<tr class="odd">';
                    $odd = 2;
                } else {
                    echo'<tr>';
                    $odd = 1;
                }

                echo '<td>' . $assoc['Id'] . '</td>
                <td>' . $assoc['SpareName'] . '</td>
                <td>' . $assoc['CountOfSpares'] . '</td>
                <td>' . $assoc['SpareReplace'] . '</td>
                <td>' . $assoc['Destonation'] . '</td>
                <td style="{text-align: center}"><a href="ViewSpares.php?id=' . $assoc['Id'] . '">[+]</a></td>    
            </tr>';
                $i++;
            }
            echo "</Table>";
            echo "&nbsp&nbsp&nbsp Всего позиций: " . ($i-1). ".<br>";
        } else {
            $q = "UPDATE steklo.spares set State='1' WHERE id='" . $_GET['id'] . "'";
            $res = mysql_query($q);
//echo $q.'<br>';
            if ($res == 0) {
                echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span>';
            } Else {
                echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Куплено</span>';
                
            }
            echo '<br> <a href="ViewSpares.php"><-Назад к списку</a><br>';
        }
        require 'Footer.php';
        ?>
        

    </body>
</HTML>