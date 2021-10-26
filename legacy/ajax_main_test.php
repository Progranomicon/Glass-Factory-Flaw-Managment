<?php
date_default_timezone_set('Europe/Moscow');
session_start();
require_once 'conn.php';
require_once 'my_func.php';
?>
<html>
    <head>
        <script language="javascript" type="text/javascript" src="ajax_main_script.js" charset=windows-1251></script>
    </head>
    <body>
        <SELECT name=product_subtype onChange="callServer();" id="selectedProduction">
<?php
$formats_list=get_prod_list();
$_SESSION['formats_list']=$formats_list;
foreach ($formats_list as $key =>$value) {
    print '<option value="'.$value.'">'.$value.'</option>';
}
?>
</SELECT>
        <span id="zipCode">“утЌичего нет</span>
</body>
</html>