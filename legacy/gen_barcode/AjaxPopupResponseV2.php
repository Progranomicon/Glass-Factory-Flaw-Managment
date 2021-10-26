<?php
require_once '/../conn.php';
echo iconv('windows-1251', 'UTF-8', 'Продукция:<br>');
//require("/../my_func.php");
$user_input=iconv('UTF-8', 'windows-1251', $_GET['user_input']);
$ajax_que= "SELECT * FROM production WHERE (locate(lower('".$user_input."'),lower(format_name))>0) ORDER BY units_number";
$ajax_res=mysql_query($ajax_que) or die("Нет такого формата или еще что... Ошибка MYSQL.");
$to_print=iconv('windows-1251', 'UTF-8', "Нет соответствий в базе: $user_input.");
while($assoc_rows=mysql_fetch_assoc($ajax_res)) 
{   
    if($user_input!='')
    {   
        if (strpos(strtolower($assoc_rows['format_name']),strtolower($user_input))!==FALSE)
        {
        echo iconv('windows-1251', 'UTF-8', '<A HREF="javascript:apply_specs('."'".($assoc_rows['id'])."',
                                                                          "."'".($assoc_rows['boxing'])."',
                                                                          "."'".($assoc_rows['type'])."',
                                                                          "."'".($assoc_rows['glass_color'])."',
                                                                          "."'".($assoc_rows['format_name'])."',
                                                                          "."'".($assoc_rows['units_number'])."',
                                                                          "."'".($assoc_rows['pallet_size'])."'".')">');
        echo iconv('windows-1251', 'UTF-8', substr_replace($assoc_rows['format_name'], ("<span style=color:white;background-color:darkblue;font-size:1.2em;>".substr($assoc_rows['format_name'], strpos(strtolower($assoc_rows['format_name']), strtolower($user_input)),strlen($user_input))."</span>"), strpos(strtolower($assoc_rows['format_name']), strtolower($user_input)), strlen($user_input)).'('.($assoc_rows['units_number']).'шт., '.($assoc_rows['boxing']).')</A><BR>');
        }
    }
    else
    {   
        echo iconv('windows-1251', 'UTF-8', '<A HREF="javascript:apply_specs('."'".($assoc_rows['id'])."',
                                                                          "."'".($assoc_rows['boxing'])."',
                                                                          "."'".($assoc_rows['type'])."',
                                                                          "."'".($assoc_rows['glass_color'])."',
                                                                          "."'".($assoc_rows['format_name'])."',
                                                                          "."'".($assoc_rows['units_number'])."',
                                                                          "."'".($assoc_rows['pallet_size'])."'".')">');
        echo iconv('windows-1251', 'UTF-8', $assoc_rows['format_name'].'('.($assoc_rows['units_number']).'шт., '.($assoc_rows['boxing']).')</A><BR>');
    }
    $to_print="";
    
}
print $to_print;
mysql_close();
?>
