<?php
	date_default_timezone_set('Europe/Moscow');
	//Считывание настроек из файло в json
	$file = fopen("labelSettings.txt","r+t");
	$json="{";
    if ($file){
		$delim2="";
		while(!feof($file)){
			$row=fgets($file);
			if(strlen($row)>1){
				$rowArray=explode("|",$row);
				$pics=explode(",",$rowArray[1]);
				$json.=$delim2.' "'.$rowArray[0].'":{"code":"'.$rowArray[0].'", "iso":"'.$rowArray[2].'", "pics":[';
				$delim="";
				foreach($pics as $n=>$pic){
					$json.=$delim.' "'.$pic.'"';
					$delim=",";
				}
				$json.="]}";
				$delim2=",";
			}
		}
	$json.="}";
	}
	fclose($file);
	//Считывание продукции из xlsx в json
	include "PHPExcel/IOFactory.php";
	$fileName="n.xlsx";
	$objReader = PHPExcel_IOFactory::createReader('Excel2007');
	$excFile = $objReader->load($fileName);
	$excFile->setActiveSheetIndex(0);
	$jsonXLSX="{";
	$delim="";
	for ($row=2;$row<10000;$row++){
			if($excFile->getActiveSheet()->getCellByColumnAndRow(5,$row)->getCalculatedValue()=="") break;
			$role=$excFile->getActiveSheet()->getCellByColumnAndRow(2,$row)->getCalculatedValue();
			$customer=$excFile->getActiveSheet()->getCellByColumnAndRow(3,$row)->getCalculatedValue();
			$fullName=$excFile->getActiveSheet()->getCellByColumnAndRow(4,$row)->getCalculatedValue();
			$form=$excFile->getActiveSheet()->getCellByColumnAndRow(5,$row)->getCalculatedValue();
			$code=$excFile->getActiveSheet()->getCellByColumnAndRow(6,$row)->getCalculatedValue();
			$shortName=$excFile->getActiveSheet()->getCellByColumnAndRow(8,$row)->getCalculatedValue();
			$color=$excFile->getActiveSheet()->getCellByColumnAndRow(12,$row)->getCalculatedValue();
			$totalUnits=$excFile->getActiveSheet()->getCellByColumnAndRow(14,$row)->getCalculatedValue();
			$boxing=$excFile->getActiveSheet()->getCellByColumnAndRow(15,$row)->getCalculatedValue();
			$layers=$excFile->getActiveSheet()->getCellByColumnAndRow(16,$row)->getCalculatedValue();
			$h=$excFile->getActiveSheet()->getCellByColumnAndRow(17,$row)->getCalculatedValue();
		$jsonXLSX.=$delim.' "'.$code.'":{"role":"'.$role.'", "customer":"'.$customer.'", "fullName":"'.$fullName.'", "form":"'.$form.'", "code":"'.$code.'", "shortName":"'.$shortName.'", "color":"'.$color.'", "totalUnits":"'.$totalUnits.'", "boxing":"'.$boxing.'", "layers":"'.$layers.'", "h":"'.$h.'"}';
			$delim=",";
	}
	$jsonXLSX.="}";
	//echo $json."<br>";
?>
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="moment.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="langs.min.js" charset=utf-8></script>
<script language="javascript" type="text/javascript" src="label2.js" charset=utf-8></script>
<script language="javascript" type="text/javascript">
	<?php
		echo 'var assets=eval("'.$json.'");';
		echo 'var production=eval("'.$jsonXLSX.'");';
	?>
</script>
<title>Этикетки</title>
<link rel="stylesheet" type="text/css" href="css2.css" > 
</head>
<body>
<div class="label">
	<div class="labelTop">
		<div class="labelTopProductNum">
			<span style="font-size:72px">12345678</span><br>
			<span>номер продукта</span>
		</div>
		<div class="labelTopForm">
			<span style="font-size:56px">123456</span><br>
			<span>номер формы</span>
		</div>	
	</div>	
	<div class="labelBottomLeft">
		<img style="-moz-transform : rotate(-90deg); margin-top:1.8cm; margin-left:-1.2cm;" alt="Barcode-Result" src="/../barcode.php?print=1&code=11111123334444&scale=2&mode=png&encoding=128&random=50027175"></img><br>
		<img style="margin-top:1.5cm;margin-left:-1cm;" alt="3 icons" src="3icon.jpg"></img>
	</div>	
	<div class="labelBottomCenter">
		<div class="labelProductName">
			<span  style="font-size:64px">Кротк. Имя</span><br>
			<span  style="font-size:20px">Полное-Длинное-Имя-500-5-6</span>
		</div>
		<div class="labelProductDetails">
			Бутылка-хуилка для тратата<br>
			СТО 99982965-001-2008<br>
			Цвет стекла: <b>Кокоричнывый</b><br>
			Количество<br>
			В паллете<br>
			Номер м/линии<br>
			Тип упаковки:<span style="font-size:1.5em"><b>Вообще(i) охуеть 8</b></span><br>
			Габаритные размеры:<span style="font-size:1.1em"><b>1000х1200х1706</b></span>
		</div>	
		<div class="labelPalletDate">
			<span style="font-size:36px">04.07.2014</span><br>
			<span>дата</span><br>
			<span style="font-size:56px">002</span><br>
			<span>номер паллета</span>
		</div>
		<hr>
		<div class="address">
			ЗАО "Рузаевский Стекольный Завод"<br>
			Республика Мордовия, г. Рузаевка,<br>
			ул. Станиславского, д. 22<br>
			Телефон: (83451) 9-42-01<br>
			E-mail: info@ruzsteklo.ru
		</div>
		<img style="display:inline-block;padding-left:0.5cm;padding-right:0.5cm" alt="" src="rsz.png"></img>
		<div class="iso">
			ГОСТ Р ИСО 9001-2008, ГОСТ Р ИСО 22000-2007,<br>
			ГОСТ Р ИСО 14001-2007<br>
			Сертификат соответствия <br>№СДС.Э.СМК 000850-12 от 30.11.2012"<br><br>
		</div>
	</div>
	<div class="labelBottomRight">
		<img style="" alt="var img" src="tri71.png"></img><br>
	</div>
</div>
</body>
</html>