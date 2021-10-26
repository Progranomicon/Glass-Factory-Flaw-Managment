<?php
date_default_timezone_set('Europe/Moscow');
session_start();
require("php-barcode.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head>
<LINK rel="icon" href="favicon.gif" type="image/x-icon">
<LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<script language="javascript" type="text/javascript" src="ajax_functions.js" charset=utf-8></script>
<script type="text/javascript" src="/../js/jquery-1.2.1.js"></script>
<title>Отчеты и настройки. Штрихкоды.</title>
<link rel="stylesheet" type="text/css" href="Style.css" >
</head>
<body>
<?php 
require("/../my_func.php");

if (!isset($_POST['count_of_labels'])) /* показ формы для выбора параметров этикетки*/
{   
//кэшируем всю продукцию в массив
	include '/../conn.php';
	mysql_set_charset("utf8");
    print '<script type="text/javascript">';
			echo ' var Production=[];
		'; 
        $RProduction = mysql_query("SELECT * FROM productionutf8");
            while ($RetProd = mysql_fetch_assoc($RProduction)) {
                echo 'Production.push([' . $RetProd['id'] . ', "' . $RetProd['type'] . '", "' .$RetProd['glass_color']. '", "' . $RetProd['format_name'] . '", "'.$RetProd['units_number'].'", "' . $RetProd['pallet_size'] . '", "' . $RetProd['boxing'] . '"]);';
                $Production[$RetProd['id']] = array($RetProd['format_name'], $RetProd['units_number'], $RetProd['boxing'], 0);
            }
            mysql_free_result($RProduction);
//кэшируем сведения о текущих форматах на линиях			
            echo 'var last_palletes=[];
			';
    $file = fopen("last_num.ppp","a+");
    if ($file)
    {
        $lines_str_from_file= fread($file,2000); // читаем в строку весь файл
        fclose($file);
        $lines_data = explode("#", $lines_str_from_file);// разбиваем на массив строк разделенный "#"
        for ($m=0;$m<9;$m++) // перебираем весь массив на поиск нужной нам строки
        { 
            $single_line = explode(" ", $lines_data[$m]);
            print "last_palletes.push([".($single_line[0]).", ".($single_line[1]).", ".($single_line[2])."]);
			"; 
        }
    }
// вывод макета этикетки
    print '</script>';
    print ' <div id="label_div1">
                <div id="label_div_left1">
                    <img SRC="/img/rst_logo2.png"><br>
                </div>
                <div id="label_div_right1"><br>
                    <img SRC="/img/4_logo2.png"><br>
                    <br>
                </div>
                <div id="label_div_center1">
                    <FORM action="index.php" METHOD=POST>
                    <table>
                    <tr>
                        <th id=t><b><i>№ паллета:</i></b></th>
                        <th><b><i>Дата производства</i></b></th>
                    </tr>
                    <tr>
                        <td id=t><br><FONT size=7  ><b><span id="pallet_s">XXX</span>
                        <INPUT TYPE=HIDDEN name="pallet_sh" id="pallet_sh" VALUE=0></b></FONT></td>
                        <td><br><FONT size=5><b>'.(date("d.m.Y")).'</b></FONT></td>
                    </tr>
                 </table><br>
                    <FONT size=2>ЗАО "Рузаевский Cтекольный Завод"</FONT><br>
                    ГОСТ Р ИСО 9001-2008 <br>
                    (Сертификат РОСС RU.И122.04ЕР/ОС.СМК.01036-09 от 14.12.09)<br>
                    ГОСТ Р ИСО 22000-2007 <br>
                    (Сертификат РОСС RU.3552.04XA00/SS.SMBPP001 от 08.12.10)<br>
                    Республика Мордовия, г. Рузаевка,ул. Станиславского, д. 22<br> 
                    Телефон: (83451)9-42-01, E-mail:info@ruzsteklo.ru<br>
                    <b><i><span id="type_s">XXX</span></i></b><br>
                    Цвет стекла:&nbsp&nbsp&nbsp&nbsp&nbsp <span id="color_s">XXX</span> <br>
                    Условное обозначение продукции 
                    <p><FONT size=5 ><b><span id="product_s"><A HREF="javascript:show_input();">Выбрать продукцию</A></span></b></FONT></p>
                    (<span id="boxing_s"></span>)<br> 
                    <img src="/../barcode.php?print=1&code=BarCodeHere&scale=2&mode=png&encoding=128&random=50027175" alt="Barcode-Result"/>
                    <div style="text-align:left;text-indent:0px;margin-right:-100px;">
                    Кол-во изделий: <span id="count_s">XXX</span> шт.<br>
                    Габаритные размеры: <span id="size_s">XXX</span>  м<br>
                    № м/линии <SELECT id="line_input" name="line_number" onChange="get_allert_state();">';
    for($iii=1;$iii<10;$iii++) 
    { 
        print "<option value=".$iii.'>'.$iii.'</option>';                                              
    };
    print           '</SELECT></div><br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <span id="warning_s">ACHTUNG</span> <br>
                    Количество этикеток&nbsp&nbsp&nbsp<input type="text" id=covers name="count_of_labels" value="3" ><br>
                    <INPUT TYPE=HIDDEN name=id_s id="id_s" VALUE=0>
                    <br>
                    Подготовить&nbsp&nbsp&nbsp<input type="submit" value="->" ></FORM><div id="popup_list">
                </div>
            </div>';
    
    
}
else 
{/* генерация этикеток*/
     
     $que_one_format="SELECT * FROM productionutf8 WHERE id='".$_POST['id_s']."'";
     require_once '/../conn.php';
	 mysql_set_charset("utf8");
     $res1=mysql_query($que_one_format) or die ("Здесь что-то нетак. Вот, посмотрите: ".$que_one_format.'<br>');
     $frmt=mysql_fetch_assoc($res1);
     for($iteration=$_POST['pallet_sh'];$iteration<($_POST['pallet_sh']+$_POST['count_of_labels']);$iteration++){
         print ' <div id="label_div1">
                 <FORM action="gen_new_bar.php" METHOD=POST>
                 <div id="label_div_left1"><br>';
         
        print '<img SRC="/img/rst_logo2.png">';        
        print '</div>
                 <div id="label_div_right1"><br>
                    <img SRC="/img/4_logo2.png"><br>
                    <br>
                 </div>
                 <div id="label_div_center1" >
                 <table>
                    <tr>
                        <th id=t><b><i>№ паллета:</i></b></th>
                        <th><b><i>Дата производства</i></b></th>
                    </tr>
                    <tr>
                        <td id=t><br><FONT size=7  ><b>'.$iteration.'</b></FONT></td>
                        <td><br><FONT size=5  ><b>'.(date("d.m.Y")).'</b></FONT></td>
                    </tr>
                 </table>
        <FONT size=3  >ЗАО "Рузаевский Cтекольный Завод"</FONT><br>
        ГОСТ Р ИСО 9001-2008 <br>(Сертификат РОСС RU.И122.04ЕР/ОС.СМК.01036-09 от 14.12.09)<br>
        ГОСТ Р ИСО 22000-2007 <br>(Сертификат РОСС RU.3552.04XA00/SS.SMBPP001 от 08.12.10)<br>
        Республика Мордовия, г. Рузаевка,ул. Станиславского, д. 22<br> 
        Телефон: (83451)9-42-01, E-mail:info@ruzsteklo.ru<br>
        <b><i>'.$frmt['type'].'</i></b><br>
        Цвет стекла:&nbsp&nbsp&nbsp&nbsp&nbsp '.$frmt['glass_color'].' <br>

        Условное обозначение продукции <br>
        <div id=FormatDiv><FONT size="';
        if (strlen($frmt['format_name'])>30) echo '5';
        else echo '6';
        echo '"  ><b><i><u>'.$frmt['format_name'].'</u></i></b></FONT></div><br>
        ('.$frmt['boxing'].')<br>
            <img src="/../barcode.php?print=1&code='.(date("dmy")).($_POST['line_number']).((sprintf ("%03d",$_POST['id_s'])).(sprintf ("%04d",$iteration))).'&scale=2&mode=png&encoding=128&random=50027175" alt="Barcode-Result"/>
        <div style="text-align:left;text-indent:0px;margin-right:-100px;">
        Кол-во изделий: <span id=parametres_of_unit>'.$frmt['units_number'].'</span> шт.<br>
        <br>
        Габаритные размеры: <span id=parametres_of_unit>'.$frmt['pallet_size'].'</span> м<br>
        <br>    
        № м/линии <b><FONT size=5>'.($_POST['line_number']).'</FONT></b><br>
        </div>';
         
        print '
    </div>
 </div><br>
 ';
         if ((($iteration-$_POST['pallet_sh']+1)/2)==floor(($iteration-$_POST['pallet_sh']+1)/2)){
             print '<span id=NewPage></span>';
         }
         else print '<br><br>';
     }
     
        if (!set_last_pallet($_POST['line_number'], $_POST['pallet_sh']+$_POST['count_of_labels'], $_POST['id_s'])) print "Не удалось записать!";
}
 ?>      
<script type="text/javascript">
$(document).ready(function(){
document.getElementById("popup_list").style.display = 'none';
});
</script> 
</body>
</HTML>
