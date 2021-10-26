<?php
	session_start();
	error_reporting (0);
	require_once 'tcpdf/tcpdf.php';
	$pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8', false);
	$pdf->setPrintHeader(false);
	$pdf->setPrintFooter(false); 
	$pdf->SetMargins(20, 25, 25); // устанавливаем отступы (20 мм - слева, 25 мм - сверху, 25 мм - справа)
	$pdf->AddPage(); // создаем первую страницу, на которой будет содержимое
	$pdf->SetFont('lucinda', '', 12); // устанавливаем имя шрифта и его размер (12 пунктов)
	$pdf->SetXY(90, 50);
	$tbl=iconv("windows-1251","utf-8", $_SESSION['full_rep_string']);
	$pdf->writeHTML($tbl, true, false, true, false, '');
	$pdf->Output('Report.pdf', 'D');
	//print $_SESSION['full_rep_string'];
	error_reporting (1);
?>