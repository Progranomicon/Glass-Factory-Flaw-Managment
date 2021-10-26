<?php
session_start();
if (isset($_GET['logoff'])) if ($_GET['logoff']==1) unset ($_SESSION['auth']);
echo '<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    </head>
    <body style="text-align: center; font-family: sans-serif;">
        <img src="Images/apo.JPG" style="margin-top: 150px;"><br>';

if(!isset($_POST['key'])) $_SESSION['auth']=false;
    else
           if ($_POST['key']=='Kuhelbekker3')$_SESSION['auth']=true;
           else  echo '<span style="font-size: 1.5em; color:  red; font: bold;">Неверный ключ</span><br>';
if ($_SESSION['auth']==true)
    {
        echo '<span style="font-size: 1.5em; color:  green; font: bold;">вход выполнен</span><br> (<a href="adminimum.php?logoff=1">выйти</a>)<br>';
        echo '<a href="add_video.php">Добавить видео</a>';
    }
    else
    {
?>
        <form action="adminimum.php" method="POST">
            <br>
        <input type="text" name="key" style="width: 80px;"><br>
        <input type="submit"><br>
        <span style="font-size: 10px; color:  #666; font: bold;">Kron © 2012</span>
        </form>
<?php
    }
echo '</body>
</html>';
?>