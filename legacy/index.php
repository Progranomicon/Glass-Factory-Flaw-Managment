<?php
session_start();
if (Isset($_GET['Exit'])) {
    $_SESSION['Permissions'] = array();
    unset($_SESSION['UserName']);
}
$AuthForm = '<div class="main_div"><FORM action="index.php" method=POST><TABLE ALIGN=center>
                                                <tr>
                                                    <th>Авторизация.<br>Введите свой пароль</th>
                                                </tr>
                                                <tr>
                                                    <td><input type="password" name="Pass" value=""></td>
                                                </tr>
                                                <tr>
                                                    <th><input type="submit" value="Авторизоваться"></th>
                                                </tr>
            </TABLE></FORM>';
if (isset($_POST['Pass'])) {
    include 'conn.php';
    $res = mysql_query("SELECT * FROM steklo.SystemUsers WHERE pass='" . $_POST['Pass'] . "'");
    while ($row = mysql_fetch_assoc($res)) {
        $_SESSION['Permissions'] = array_flip(explode(',', $row['access']));
        $_SESSION['UserName'] = $row['FIO'];
    }
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
    <head>
		<LINK rel="icon" href="favicon.gif" type="image/x-icon">
		<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
		<link rel="stylesheet" type="text/css" href="st.css" >
        <title>Отчеты и настройки</title>
    </head>
    <body>
        <?php
        include "main_header.php";
        include "my_func.php";
        require 'Menu.php';
        echo '<div class="main_div">';
        
        if (isset($_POST['Pass'])  ) 
        {
            if (mysql_affected_rows() > 0) 
                {
                echo 'Вы авторизовались как ' . $_SESSION['UserName'] . '.<br>';
                echo '<A HREF="http://192.168.113.112/index.php?Exit=1"> Выйти </A>';
                } 
            else 
                {
                print "Нет таких, попробуйте другой код.";
                if (!isset($_SESSION['UserName']))
                    {
                    echo $AuthForm;
                    }
                }
        } 
        else 
        {
           if (!isset($_SESSION['UserName']))
                {
                echo $AuthForm;
                }
           else
                {
                echo 'Вы авторизовались как ' . $_SESSION['UserName'] . '.<br>';
                echo '<A HREF="http://192.168.113.112/index.php?Exit=1"> Выйти </A>';
                }
        }
        if (isset($res))
            mysql_free_result($res);
        echo '</div><br>';
        ?>
        <div class="footer_div">ОГМетр. 2013 год.<A HREF="report_first.php" style="text-decoration:none;color:#FFFFFF;padding-left:3px;">[+]</A>
        </div>
    </body>
</HTML>