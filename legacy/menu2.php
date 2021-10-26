<?php
$Adress='http://192.168.113.112';
Echo '<div class="menu"> <A HREF="'.$Adress.'/index2.php"> В начало </A>';
   /* if(isset($_SESSION['Permissions'][0])) echo '[<A HREF="'.$Adress.'/line_new_format.php"> Добавить формат</A>]';*/
	if(isset($_SESSION['Permissions'][0])) echo '<li><A HREF="'.$Adress.'/add_format.php">Форматы</A></li>';
	if(isset($_SESSION['Permissions'][6])) echo '<li><A HREF="'.$Adress.'/label/labelWizard.php">Форматы1</A></li>';
	if(isset($_SESSION['Permissions'][1])) echo '<li><A HREF="'.$Adress.'/gen_barcode/">Ярлык</A></li>';
	if(isset($_SESSION['Permissions'][7])) echo '<li><A HREF="'.$Adress.'/label/makeLabel2.php">Ярлык1</A></li>';
        if(isset($_SESSION['Permissions'][2])) echo '<li><A HREF="'.$Adress.'/store_report/GetReportV2.php">Паллеты</A></li>';
        if(isset($_SESSION['Permissions'][3])) echo '<li><A HREF="'.$Adress.'/ScanerUsers/ScanerUsers.php">Пользователи сканеров</A></li>';
        if(isset($_SESSION['Permissions'][4])) echo '<li><A HREF="'.$Adress.'/Shipment/index.php">Отгрузка</A></li>';
        if(isset($_SESSION['Permissions'][5])) echo '<li><A HREF="'.$Adress.'/VikoReport/index.php">Производственный отчет</A></li>';
        if(isset($_SESSION['UserName'])) echo '<li><A HREF="'.$Adress.'/index2.php?Exit=1">Выйти из аккаунта '.$_SESSION['UserName'].'</A></li>';
    echo '</div>';
?>
