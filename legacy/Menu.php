<?php
$Adress='http://192.168.113.112';
Echo '<div class="menu_div"> [<A HREF="'.$Adress.'/index.php"> В начало </A>]';
   /* if(isset($_SESSION['Permissions'][0])) echo '[<A HREF="'.$Adress.'/line_new_format.php"> Добавить формат</A>]';*/
	//if(isset($_SESSION['Permissions'][0])) echo '[<A HREF="'.$Adress.'/add_format.php">Форматы</A>]';
	if(isset($_SESSION['Permissions'][6])) echo '[<A HREF="'.$Adress.'/label/labelWizard.php">Форматы1</A>]';
	if(isset($_SESSION['Permissions'][1])) echo '[<A HREF="'.$Adress.'/gen_barcode/"> Ярлык</A>] ';
	if(isset($_SESSION['Permissions'][7])) echo '[<A HREF="'.$Adress.'/label/makeLabel2.php"> Ярлык1</A>] ';
	if(isset($_SESSION['Permissions'][7])) echo '[<A HREF="'.$Adress.'/labels/index.php"> Ярлык по номерам продуктов</A>] ';
        if(isset($_SESSION['Permissions'][2])) echo '[<A HREF="'.$Adress.'/store_report/GetReportV2.php"> Паллеты </A>]';
        if(isset($_SESSION['Permissions'][3])) echo '[<A HREF="'.$Adress.'/ScanerUsers/ScanerUsers.php"> Пользователи сканеров </A>]';
        if(isset($_SESSION['Permissions'][4])) echo '[<A HREF="'.$Adress.'/Shipment/index.php"> Отгрузка </A>]';
        if(isset($_SESSION['Permissions'][5])) echo '[<A HREF="'.$Adress.'/VikoReport/index.php"> Производственный отчет</A>]';
        if(isset($_SESSION['UserName'])) echo '[<A HREF="'.$Adress.'/index.php?Exit=1"> Выйти из аккаунта '.$_SESSION['UserName'].'</A>]';
    echo '</div>';
?>
