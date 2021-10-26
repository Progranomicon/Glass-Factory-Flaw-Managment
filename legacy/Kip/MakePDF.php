<?php
        session_start();
        print '<link rel="stylesheet" type="text/css" href="Style.css" >';
	error_reporting (0);
	require_once '/../mpdf53/mpdf.php';
	$mpdf = new mPDF('utf-8', 'A4', '10', '', 5, 5, 7, 7, 10, 10);/*задаем формат, отступы и.т.д.*/
        $mpdf->AddPage('P','', '', '','', 20, 20, 20, 20);
        $mpdf->charset_in = 'utf-8'; /*не забываем про русский*/
        $stylesheet = file_get_contents('Style.css'); /*подключаем css*/
        $mpdf->WriteHTML($stylesheet, 1);
        $mpdf->list_indent_first_level = 0; 
        $mpdf->WriteHTML($_SESSION['ToPrint'], 2); /*формируем pdf*/
        $mpdf->Output('Отчет.pdf', 'D');
        //print $_SESSION['full_rep_string'];
	error_reporting (1);//
?>