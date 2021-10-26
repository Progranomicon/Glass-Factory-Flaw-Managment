<?php
session_start();
Echo '<HTML><HEAD></HEAD><BODY>';
require "/../main_header.php";
require '/../Menu.php';
echo '<FORM action="ScanerUsers.php" METHOD=GET>
      <TABLE>
        <tr>
            <th>Код</th>
            <th>FIO</th>
            <th>Операции</th>
        </tr>
        <tr>
            <td><input type="text" name="Code"></td>
            <td><input type="text" name="FIO"></td>
            <td><input type="text" name="Permissions"></td>
            <td><input type="submit" Value="Добавить"></td>
        </tr></TABLE>';
if(isset($_GET['Code']))
    { 
        require '../conn.php';
        $q="INSERT INTO steklo.scaner_users SET FIO='".$_GET['FIO']."', pass='".$_GET['Code']."', access='".$_GET['Permissions']."'" ;
        $res=mysql_query($q);
        if ($res) echo $_GET['FIO'].' yспешно добавлен<br>';
        else echo 'Ошибка при добавлении '.$_GET['FIO'].'<br>';
    }
echo '</BODY></HTML>';
?>
