<?php
	session_start();
	error_reporting (0);
	require_once 'tcpdf/tcpdf.php';
	$pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8', false);
	$pdf->setPrintHeader(false);
	$pdf->setPrintFooter(false); 
	$pdf->SetMargins(20, 25, 25); // ������������� ������� (20 �� - �����, 25 �� - ������, 25 �� - ������)
	$pdf->AddPage(); // ������� ������ ��������, �� ������� ����� ����������
	$pdf->SetFont('lucinda', '', 12); // ������������� ��� ������ � ��� ������ (12 �������)
	$pdf->SetXY(90, 50);
	$tbl=iconv("windows-1251","utf-8", $_SESSION['full_rep_string']);
	$pdf->writeHTML($tbl, true, false, true, false, '');
	$pdf->Output('Report.pdf', 'D');
	//print $_SESSION['full_rep_string'];
	error_reporting (1);
?>