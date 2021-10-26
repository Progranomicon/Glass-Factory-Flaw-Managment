<?php
require_once '/../conn.php';
mysql_set_charset("utf8");
echo 'Продукция:<br>';
//require("/../my_func.php");
$user_input= $_GET['user_input'];
$ajax_que= "SELECT * FROM productionutf8 WHERE (locate(lower('".$user_input."'),lower(format_name))>0) ORDER BY units_number";
$ajax_res=mysql_query($ajax_que) or die("Нет такого формата или еще что... Ошибка MYSQL.");
$to_print="Нет соответствий в базе: <br>".$user_input;
while($assoc_rows=mysql_fetch_assoc($ajax_res)) 
{   
    if($user_input!='')
    {   
        if (strpos(strtolower($assoc_rows['format_name']),strtolower($user_input))!==FALSE)
        {
        echo '<A HREF="javascript:apply_specs('."'".($assoc_rows['id'])."',
                                                                          "."'".($assoc_rows['boxing'])."',
                                                                          "."'".($assoc_rows['type'])."',
                                                                          "."'".($assoc_rows['glass_color'])."',
                                                                          "."'".($assoc_rows['format_name'])."',
                                                                          "."'".($assoc_rows['units_number'])."',
                                                                          "."'".($assoc_rows['pallet_size'])."'".')">';
		$format_1251=iconv('UTF-8', 'windows-1251',$assoc_rows['format_name']);
		$user_input_1251 = iconv('UTF-8', 'windows-1251',$user_input);
		
        echo  iconv('windows-1251','UTF-8', substr_replace($format_1251, 															//рецепиент
							("<span style=color:white;background-color:darkblue;>".substr($format_1251,//донор
																						strpos(strtolower($format_1251),strtolower($user_input_1251)),
																									strlen($user_input_1251))."</span>"), 
							strpos(strtolower($format_1251), strtolower($user_input_1251)),				//где
							strlen($user_input_1251)))																	//сколько символов
							.'('.($assoc_rows['units_number']).'шт., '.($assoc_rows['boxing']).')</A><BR>'; 		//штуки, упаковка 
		echo strpos(strtolower($format_1251), strtolower($user_input_1251)).iconv('windows-1251','UTF-8', ' '.strtolower($format_1251).', '.strtolower($user_input_1251).'<br>');
        }
    }
    else
    {   
        echo  '<A HREF="javascript:apply_specs('."'".($assoc_rows['id'])."',
                                                                          "."'".($assoc_rows['boxing'])."',
                                                                          "."'".($assoc_rows['type'])."',
                                                                          "."'".($assoc_rows['glass_color'])."',
                                                                          "."'".($assoc_rows['format_name'])."',
                                                                          "."'".($assoc_rows['units_number'])."',
                                                                          "."'".($assoc_rows['pallet_size'])."'".')">';
        echo  $assoc_rows['format_name'].'('.($assoc_rows['units_number']).'шт., '.($assoc_rows['boxing']).')</A><BR>';
    }
    $to_print="";
}
print $to_print;
mysql_close();
?>
