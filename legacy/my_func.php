<?php 
function get_last_pallet($line_num){
    $file = fopen("last_num.ppp","a+");
    if ($file)
    {
        $lines_str_from_file= fread($file,2000); // читаем в строку весь файл
        fclose($file);
        $lines_data = explode("#", $lines_str_from_file);// разбиваем на массив строк разделенный "#"
        for ($m=0;$m<9;$m++) // перебираем весь массив на поиск нужной нам строки
        { 
            $single_line = explode(" ", $lines_data[$m]);
            if ($single_line[0]==$line_num) return $single_line; // если нашли возвращаем как массив [номер линии][номер последней этикетки][номер формата]
        }
    }
    else return false;// если не нашли  возвращаем ложь
}
function set_last_pallet($line_num, $val_to_write, $format_to_write){ //лини€ - номер палета - формат
    $file = fopen("last_num.ppp","r+");
    if (!$file) return false;
    $lines_str_from_file= fread($file,2000); // читаем в строку весь файл
    $lines_data = explode("#", $lines_str_from_file);// разбиваем на массив строк разделенный "#"
    $file_str ="";
    for ($m=0;$m<9;$m++) // перебираем весь массив на поиск нужной нам строки
    { 
        $single_line = explode(" ", $lines_data[$m]);
        if ($single_line[0]==$line_num) 
        {
            $lines_data[$m]=$single_line[0].' '.$val_to_write.' '.$format_to_write;
        }
        $file_str.=$lines_data[$m]."#";
    }
    fseek($file, 0);
    fwrite($file, $file_str);
    return true;
}


function get_format_by_id ($id){
    require_once  'conn.php';
    $que='SELECT * FROM production WHERE id="'.$id.'" ';
	//print $que;
    $res=mysql_query($que) or die ("Ќеудалось узнать формат по id. «апрос: ".$que.'<br>');
    $res_to_return = mysql_fetch_assoc($res);
    return $res_to_return;
}
function get_formats_list($line){
    include_once "conn.php";
    $que='SELECT DISTINCT format, id FROM formats WHERE line="'.$line.'" ORDER BY date_time DESC';
	//print $que;
    $res=mysql_query($que) or die ("Ќеудалось узнать последний формат. «апрос: ".$que.'<br>');
    while($row=mysql_fetch_array($res)) 
    {
	$func_return[$row['id']]=$row['format'];
    }
    mysql_close();
    return $func_return;
}
function get_prod_list(){
    require_once "conn.php";
    $que='SELECT format_name, id FROM production';
	//print $que;
    $res=mysql_query($que) or die ("Ќеудалось узнать Ќичего. «апрос: ".$que.'<br>');
    while($row=mysql_fetch_array($res)) 
    {
	$func_return[$row['id']]=$row['format_name'];
    }
    mysql_close();
    return $func_return;
}
function set_start_bold($str, $n_symbols){ 
}
?>