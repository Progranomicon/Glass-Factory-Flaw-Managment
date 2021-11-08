<?php
require("php-barcode.php");

function getvar($name){
    global $_GET, $_POST;
    if (isset($_GET[$name])) return $_GET[$name];
    else if (isset($_POST[$name])) return $_POST[$name];
    else return false;
}

if (false/*get_magic_quotes_gpc()*/){
    $code=stripslashes(getvar('code'));
} else {
    $code=getvar('code');
}
if (!$code) $code='123456789012';

barcode_print($code,getvar('encoding'),getvar('scale'),getvar('mode'));

/*
 * call
 * http://........./barcode.php?code=012345678901
 *   or
 * http://........./barcode.php?code=012345678901&encoding=EAN&scale=4&mode=png
 *
 */

?>
