<?php
	error_reporting (1);
	require_once '/../../mpdf53/mpdf.php';
	$mpdf = new mPDF('utf-8', 'A4', '10', '', 5, 5, 7, 7, 10, 10);/*задаем формат, отступы и.т.д.*/
        $mpdf->AddPage('P','', '', '','', 20, 20, 20, 20);
        $mpdf->charset_in = 'utf-8'; /*не забываем про русский*/
        $stylesheet = file_get_contents('css.css'); /*подключаем css*/
        $mpdf->WriteHTML($stylesheet, 1);
        $mpdf->list_indent_first_level = 0;
	$i=1;	
	require "connect.php";
	$q='SELECT *, (lastValidation + INTERVAL frValidation MONTH) AS lastVal FROM metrology WHERE isDeleted!=1 ORDER BY validationOrg';
	$r=mysql_query($q);
	$pdfT='<div style="text-align:center;"><h3>Список средств измерений подлежащих поверке</h3><h5>на '.date("d.m.y").' г.</h5></div><br><Table class="rep" style="border:1px solid black;"><tr><th>N п/п</th><th>Наименование</th><th>Серийный номер</th><th>Тип</th><th>Класс точности</th><th>Диапазон измерений</th><th>Межпов. инт.</th><th>Дата последней поверки</th><th>Дата сл. поверки</th><th>Место нахождения</th></tr>';
	
	while ($row=mysql_fetch_assoc($r)){
		$pdfT.=' <tr><td style="">'.$i++.'</td><td>'.$row['toolName'].'</td><td>'.$row['sn'].'</td><td>'.$row['toolType'].'</td><td>'.$row['accClass'].'</td><td>'.$row['mRange'].'</td><td>'.$row['frValidation'].'</td><td>'.$row['lastValidation'].'</td><td>'.$row['lastVal'].'</td><td>'.$row['validationOrg'].'</td></tr>';
		
	}
	$pdfT.='</table><br>Главный метролог ____________________________ Зоткин С. И.';
	$mpdf->WriteHTML($pdfT, 2);
    $mpdf->Output('Список СИ.pdf', 'D');
	//echo $pdfT;
	error_reporting (1);//
?>