<?php
echo '<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<link rel="stylesheet" type="text/css" href="css.css" >
</head>';
include '/../conn.php';
mysql_set_charset("utf8");
$RProduction = mysql_query("SELECT * FROM productionutf8 WHERE id<168");
while ($RetProd = mysql_fetch_assoc($RProduction)) {
	//$LabelHTML="<div id=&quot;LabelDiv&quot;><div id=&quot;LabelDivImg&quot; class=&quot;LabelDivImg&quot;><img src=&quot;/Label/rszAndUmbr.png&quot; style=&quot;padding-left:15px;padding-top:10px;&quot;><img src=&quot;/../barcode.php?print=1&amp;code=11111123334444&amp;scale=2&amp;mode=png&amp;encoding=128&amp;random=50027175&quot; alt=&quot;Barcode-Result&quot; style=&quot;-moz-transform : rotate(-90deg); margin-top:1.8cm; margin-left:-1.2cm;&quot;><img src=&quot;/Label/umbrAndRoof.png&quot; style=&quot;padding-top:60px;padding-left:10px;&quot;></div><div id=&quot;labelVarImg&quot; class=&quot;labelVarImg&quot; style=&quot;float:left;position:relative;width:0px;left:15.5cm;z-index:5;&quot;><img src=&quot;/Label/rst.png&quot; class=&quot;imagAdded&quot; style=&quot;padding:5px;&quot; onclick=&quot;imageClick(this)&quot;></div><div id=&quot;LabelTextDiv&quot;><div class=&quot;rowDiv&quot;><table align=&quot;center&quot;><tbody><tr><th id=&quot;t&quot;><b><i>№ паллета:</i></b></th><th><b><i>Дата производства</i></b></th></tr><tr><td id=&quot;t&quot;><br><font size=&quot;7&quot;><b><span id=&quot;pallet_s&quot;>%N%</span></b></font></td><td><br><font size=&quot;5&quot;><b>%date%</b></font></td></tr></tbody></table></div><div class=&quot;rowDiv&quot;>ЗАО &quot;Рузаевский Cтекольный Завод&quot;</div><div class=&quot;rowDiv&quot;>ГОСТ Р ИСО 9001-2008, ГОСТ Р ИСО 22000-2007, <br>ГОСТ Р ИСО 14001-2007<br> &nbsp; &nbsp; &nbsp; &nbsp; (Сертификат соотвествия №СДС.Э.СМК 000850-12 от 30.11.2012)&quot;</div><div class=&quot;rowDiv&quot;>Республика Мордовия, г. Рузаевка,ул. Станиславского, д. 22<br>Телефон: (83451)9-42-01, E-mail:info@ruzsteklo.ru</div><div class=&quot;rowDiv&quot;><span style=&quot;Font-size:12px;font-weight:bold; font-style:italic; &quot;>%type%</span></div><div class=&quot;rowDiv&quot;>Цвет стекла: <i><b>%color%</b></i></div><div class=&quot;rowDiv&quot;>Условное обозначение продукции<br><span style=&quot;Font-size:22px;&quot;><u>%Name%</u></span></div><div class=&quot;rowDiv&quot;><span style=&quot;Font-size:10px;&quot;>СТО 99982965-001-2008</span></div><div class=&quot;rowDiv&quot;><span style=&quot;Font-size:12px;&quot;>(%boxing%)</span></div><div class=&quot;rowDiv&quot;><span style=&quot;Font-size:20px;&quot;><br></span></div><div class=&quot;rowDiv&quot;><div style=&quot;text-align:left;left:7cm; position:relative;&quot;>Количество изделий:<b>%count%</b> шт.<br><br> Габаритные размеры: <b> </b>%size%м.<br><br>Номер м/линии: <span style=&quot;Font-size:26px;&quot;>%l%</span></div></div></div></div>";
	$LabelHTML=$RetProd['LabelHTML'];
	/*$LabelHTML=str_replace("%type%", $RetProd['type'],$LabelHTML);
	$LabelHTML=str_replace("%color%", $RetProd['glass_color'],$LabelHTML);
	$LabelHTML=str_replace("%Name%", $RetProd['format_name'],$LabelHTML);
	$LabelHTML=str_replace("%size%", $RetProd['pallet_size'],$LabelHTML);
	$LabelHTML=str_replace("%boxing%", $RetProd['boxing'],$LabelHTML);*/
	$LabelHTML=str_replace('<img src=&quot;/Label/cir.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;>', '<img src=&quot;/Label/cir.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;><img src=&quot;/Label/tri.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;>',$LabelHTML);
	$convertRes= mysql_query("UPDATE productionutf8 SET LabelHTML='".$LabelHTML."' WHERE id='".$RetProd['id']."'");
	if($convertRes>0) echo "1 Удачно : ".$RetProd['format_name'].". (".intval($convertRes).")<br>";
	else echo "Не удачно:".$RetProd['format_name'].". Ошибка MySQL.(".$convertRes.")<br>";
}
//<div id=&quot;LabelDiv&quot;><div id=&quot;LabelDivImg&quot; class=&quot;LabelDivImg&quot;><img src=&quot;/Label/rszAndUmbr.png&quot; style=&quot;padding-left:15px;padding-top:10px;&quot;><img src=&quot;/../barcode.php?print=1&amp;code=11111123334444&amp;scale=2&amp;mode=png&amp;encoding=128&amp;random=50027175&quot; alt=&quot;Barcode-Result&quot; style=&quot;-moz-transform : rotate(-90deg); margin-top:1.8cm; margin-left:-1.2cm;&quot;><img src=&quot;/Label/umbrAndRoof.png&quot; style=&quot;padding-top:60px;padding-left:10px;&quot;></div><div id=&quot;labelVarImg&quot; class=&quot;labelVarImg&quot; style=&quot;float:left;position:relative;width:0px;left:15.5cm;z-index:5;&quot;><img src=&quot;/Label/rst.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;><img src=&quot;/Label/EAC.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;><img src=&quot;/Label/tri.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;><img src=&quot;/Label/cir.png&quot; class=&quot;imagAdded&quot; onclick=&quot;imageClick(this)&quot;></div><div id=&quot;LabelTextDiv&quot;><div class=&quot;rowDiv&quot;><table align=&quot;center&quot;><tbody><tr><th id=&quot;t&quot;><b><i>№ паллета:</i></b></th><th><b><i>Дата производства</i></b></th></tr><tr><td id=&quot;t&quot;><br><font size=&quot;7&quot;><b><span id=&quot;pallet_s&quot;>%N%</span></b></font></td><td><br><font size=&quot;5&quot;><b>%date%</b></font></td></tr></tbody></table></div><div class=&quot;rowDiv&quot;>Условное обозначение продукции<br><span style=&quot;Font-size:22px;&quot;><u>КПМ - 22спец - 9- Русские огурцы(тест)</u></span></div><div class=&quot;rowDiv&quot;><div style=&quot;text-align:left;left:7cm; position:relative;&quot;>Количество изделий:<b>3333</b> шт.<br><br> Габаритные размеры: <b> </b>м.<br><br>Номер м/линии: <span style=&quot;Font-size:26px;&quot;>%l%</span></div></div></div></div>
?>
