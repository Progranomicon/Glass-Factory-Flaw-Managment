<?php
	session_start();
        print '<link rel="stylesheet" type="text/css" href="style_1.css" >';
	error_reporting (0);
	require_once 'mpdf53/mpdf.php';
	$mpdf = new mPDF('utf-8', 'A4', '8', '', 10, 10, 7, 7, 10, 10);/*задаем формат, отступы и.т.д.*/
        $mpdf->AddPage('L','', '', '','', 20, 20, 50, 20);
        $mpdf->charset_in = 'cp1251'; /*не забываем про русский*/
        $stylesheet = file_get_contents('style_1.css'); /*подключаем css*/
        $mpdf->WriteHTML($stylesheet, 1);
        $mpdf->list_indent_first_level = 0; 
        $mpdf->WriteHTML($_SESSION['full_rep_string'], 2); /*формируем pdf*/
        $mpdf->Output('Отчет.pdf', 'D');
        //print $_SESSION['full_rep_string'];
	error_reporting (1);//
?>