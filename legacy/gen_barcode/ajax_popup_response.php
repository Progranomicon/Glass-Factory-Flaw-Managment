<?php
require_once '/../conn.php';
//require("/../my_func.php");
$user_input=iconv('UTF-8', 'windows-1251', $_GET['user_input']);
$ajax_que= "SELECT * FROM production WHERE (locate(lower('".$user_input."'),lower(format_name))>0) ORDER BY units_number";
$ajax_res=mysql_query($ajax_que) or die("Нет такого формата или еще что... Ошибка MYSQL.");
//print iconv('windows-1251', 'UTF-8', ' Gav-GAV: '.$user_input.'. Строк ['.  mysql_num_rows($ajax_res).']');
$to_print=iconv('windows-1251', 'UTF-8', "Нет соответствий в базе: $user_input.");
while($assoc_rows=mysql_fetch_assoc($ajax_res)) 
{   
    if(isset($user_input)){
    if(strpos(strtolower($assoc_rows['format_name']),strtolower($user_input))===0){
    print iconv('windows-1251', 'UTF-8', '<A HREF="javascript:apply_specs('."'".($assoc_rows['id'])."',
                                                                          "."'".($assoc_rows['boxing'])."',
                                                                          "."'".($assoc_rows['type'])."',
                                                                          "."'".($assoc_rows['glass_color'])."',
                                                                          "."'".($assoc_rows['format_name'])."',
                                                                          "."'".($assoc_rows['units_number'])."',
                                                                          "."'".($assoc_rows['pallet_size'])."'".')">'.substr_replace($assoc_rows['format_name'], ("<b>".$user_input."</b>"), 0, strlen($user_input)).'('.($assoc_rows['units_number']).'шт., '.($assoc_rows['boxing']).')</A><BR>'/*.strpos($assoc_rows['format_name'],$user_input).", ".strlen($assoc_rows['format_name'])."<br>"*/);
    $to_print="";
    }
   } else  $to_print=iconv('windows-1251', 'UTF-8', "Необходимо что-либо ввести.");
}
print $to_print;
//if(mysql_num_rows($ajax_res)==0)print iconv('windows-1251', 'UTF-8', "Нет соответствий в базе: $user_input.");
mysql_close();
?>
