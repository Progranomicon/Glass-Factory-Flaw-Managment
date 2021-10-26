<?php
$Adress='http://192.168.113.112/kip';
echo '<div id=Menu>
    [<A HREF="'.$Adress.'/AddEvent.php"> Добавить событие</A>]
    [<A HREF="'.$Adress.'/GetReport.php"> Посмотреть журнал</A>]
     <b>Запчасти:</b>   
    [<A HREF="'.$Adress.'/AddSpare.php"> Добавить запчасти </A>]
    [<A HREF="'.$Adress.'/ViewSpares.php"> Посмотреть запчасти </A>] 
        <b>Журнал ППР:</b>
        [<A HREF="'.$Adress.'/NewTO.php"> Добавить ТО </A>]
        [<A HREF="'.$Adress.'/ViewTO.php"> Получить отчет </A>]
        [<A HREF="'.$Adress.'/Rules.php"> Регламентные работы</A>]
		[<A HREF="'.$Adress.'/metrology/"> Метрология</A>]
    </div>
';
?>
