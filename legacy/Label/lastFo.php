<?php //14200422|tri,tri2|TCO 3030303-283238-29329
    $file = fopen("lp.lp","r+");
    if (!$file) return false;
    $lines_str_from_file= fread($file,2000); // читаем в строку весь файл
    $lines_data = explode("#", $lines_str_from_file);// разбиваем на массив строк разделенный "#"
    $file_str ="";
    for ($m=0;$m<10;$m++){ // перебираем весь массив на поиск нужной нам строки
	 
        $single_line = explode(" ", $lines_data[$m]);
        if ($single_line[0]==$_GET['line']) 
        {
            $lines_data[$m]=$single_line[0].' '.$_GET['count'].' '.$_GET['format'];
        }
        $file_str.=$lines_data[$m]."#";
	}
	fseek($file, 0);
	fwrite($file, "                                                                                                                                                       ");
	fseek($file, 0);
	fwrite($file, $file_str);
	echo "Ок".$_GET['count'];
?>