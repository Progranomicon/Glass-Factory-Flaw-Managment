<?php
session_start();
Echo '<HTML><HEAD></HEAD><BODY>';
require "/../main_header.php";
require '/../Menu.php';
echo '<FORM action="ScanerUsers.php" METHOD=GET>
      <TABLE>
        <tr>
            <th>���</th>
            <th>FIO</th>
            <th>��������</th>
        </tr>
        <tr>
            <td><input type="text" name="Code"></td>
            <td><input type="text" name="FIO"></td>
            <td><input type="text" name="Permissions"></td>
            <td><input type="submit" Value="��������"></td>
        </tr></TABLE>';
if(isset($_GET['Code']))
    { 
        require '../conn.php';
        $q="INSERT INTO steklo.scaner_users SET FIO='".$_GET['FIO']."', pass='".$_GET['Code']."', access='".$_GET['Permissions']."'" ;
        $res=mysql_query($q);
        if ($res) echo $_GET['FIO'].' y������ ��������<br>';
        else echo '������ ��� ���������� '.$_GET['FIO'].'<br>';
    }
echo '</BODY></HTML>';
?>
