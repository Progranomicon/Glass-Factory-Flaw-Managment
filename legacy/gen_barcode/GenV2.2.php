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
<script language="javascript" type="text/javascript" src="AjaxGenBarV2.js" charset=windows-1251></script>
<script type="text/javascript" src="/../js/jquery-1.2.1.js"></script>
<title>������ � ���������. ���������.</title>
<link rel="stylesheet" type="text/css" href="Style.css" >
</head>
<body>
<?php 
require("/../my_func.php");
if (!isset($_POST['count_of_labels'])) /* ����� ����� ��� ������ ���������� ��������*/
{   
    print '<script type="text/javascript">
        
            var last_palletes=[];';
    $file = fopen("last_num.ppp","a+");
    if ($file)
    {
        $lines_str_from_file= fread($file,2000); // ������ � ������ ���� ����
        fclose($file);
        $lines_data = explode("#", $lines_str_from_file);// ��������� �� ������ ����� ����������� "#"
        for ($m=0;$m<9;$m++) // ���������� ���� ������ �� ����� ������ ��� ������
        { 
            $single_line = explode(" ", $lines_data[$m]);
            print"last_palletes.push([".($single_line[0]).", ".($single_line[1]).", ".($single_line[2])."]);"; 
        }
    }
    print '</script>';
    print ' <div id="label_div">
                <div id="label_div_left">
                    <img SRC="/img/barcode.png"><br>
                </div>
                <div id="label_div_right"><br>
                    <img SRC="/img/4_logo.png"><br>
                    <img SRC="/img/rst_logo.png"><br>
                </div>
                <div id="label_div_center">
                    <FORM action="GenV2.2.php" METHOD=POST>
                    <table>
                    <tr>
                        <th id=t><b><i>� �������:</i></b></th>
                        <th><b><i>���� ������������</i></b></th>
                    </tr>
                    <tr>
                        <td id=t><br><FONT size=7  ><b><span id="pallet_s">XXX</span>
                        <INPUT TYPE=HIDDEN name="pallet_sh" id="pallet_sh" VALUE=0></b></FONT></td>
                        <td><br><FONT size=5><b>'.(date("d.m.Y")).'</b></FONT></td>
                    </tr>
                 </table><br>
                    <FONT size=2>��� "���������� C��������� �����"</FONT><br>
                    ���� � ��� 9001-2008 <br>
                    (���������� ���� RU.�122.04��/��.���.01036-09 �� 14.12.09)<br>
                    ���� � ��� 22000-2007 <br>
                    (���������� ���� RU.3552.04XA00/SS.SMBPP001 �� 08.12.10)<br>
                    ���������� ��������, �. ��������,��. ��������������, �. 22<br> 
                    �������: (83451)9-42-01, E-mail:info@ruzsteklo.ru<br>
                    <b><i><span id="type_s">XXX</span></i></b><br>
                    ���� ������:&nbsp&nbsp&nbsp&nbsp&nbsp <span id="color_s">XXX</span> <br>
                    �������� ����������� ��������� 
                    <p><FONT size=5 ><b><span id="product_s"><A HREF="javascript:show_input();">������� ���������</A></span></b></FONT></p>
                    (<span id="boxing_s"></span>)<br> 
                    ���-�� �������: <span id="count_s">XXX</span> ��.<br>
                    ���������� �������: <span id="size_s">XXX</span>  �<br>
                    � �/����� <SELECT id="line_input" name="line_number" onChange="get_allert_state();">';
    for($iii=1;$iii<10;$iii++) 
    { 
        print "<option value=".$iii.'>'.$iii.'</option>';                                              
    };
    print           '</SELECT><br>
                    <span id="warning_s">ACHTUNG</span> <br>
                    ���������� ��������&nbsp&nbsp&nbsp<input type="text" id=covers name="count_of_labels" value="3" ><br>
                    <INPUT TYPE=HIDDEN name=id_s id="id_s" VALUE=0>
                    <br>
                    �����������&nbsp&nbsp&nbsp<input type="submit" value="->" ></FORM><div id="popup_list">
                </div>
            </div>';
    
    
}
else 
{/* ��������� ��������*/
      /* ��������� ��������*/
     $que_one_format="SELECT * FROM production WHERE id='".$_POST['id_s']."'";
     require_once '/../conn.php';
     $res1=mysql_query($que_one_format) or die ("����� ���-�� �����. ���, ����������: ".$que_one_format.'<br>');
     $frmt=mysql_fetch_assoc($res1);
     for($iteration=$_POST['pallet_sh'];$iteration<($_POST['pallet_sh']+$_POST['count_of_labels']);$iteration++){
         print ' <div id="label_div">
                 <FORM action="gen_new_bar.php" METHOD=POST>
                 <div id="label_div_left"><br>';
         
        print '<img src="/../barcode.php?print=1&code='.(date("dmy")).($_POST['line_number']).((sprintf ("%03d",$_POST['id_s'])).(sprintf ("%04d",$iteration))).'&scale=2&mode=png&encoding=128&random=50027175" alt="Barcode-Result"/>';        
        print '</div>
                 <div id="label_div_right"><br>
                    <img SRC="/img/4_logo.png"><br>
                    <img SRC="/img/rst_logo.png"><br>
                 </div>
                 <div id="label_div_center" >
                 <table>
                    <tr>
                        <th id=t><b><i>� �������:</i></b></th>
                        <th><b><i>���� ������������</i></b></th>
                    </tr>
                    <tr>
                        <td id=t><br><FONT size=7  ><b>'.$iteration.'</b></FONT></td>
                        <td><br><FONT size=5  ><b>'.(date("d.m.Y")).'</b></FONT></td>
                    </tr>
                 </table>
        <FONT size=3  >��� "���������� C��������� �����"</FONT><br>
        ���� � ��� 9001-2008 <br>(���������� ���� RU.�122.04��/��.���.01036-09 �� 14.12.09)<br>
        ���� � ��� 22000-2007 <br>(���������� ���� RU.3552.04XA00/SS.SMBPP001 �� 08.12.10)<br>
        ���������� ��������, �. ��������,��. ��������������, �. 22<br> 
        �������: (83451)9-42-01, E-mail:info@ruzsteklo.ru<br>
        <b><i>'.$frmt['type'].'</i></b><br>
        ���� ������:&nbsp&nbsp&nbsp&nbsp&nbsp '.$frmt['glass_color'].' <br>

        �������� ����������� ��������� <br>
        <div id=FormatDiv><FONT size=6  ><b><i><u>'.$frmt['format_name'].'</u></i></b></FONT></div><br>
        ('.$frmt['boxing'].')<br>
        <br>
        ���-�� �������: <span id=parametres_of_unit>'.$frmt['units_number'].'</span> ��.<br>
        <br>
        ���������� �������: <span id=parametres_of_unit>'.$frmt['pallet_size'].'</span> �<br>
        <br>    
        � �/����� <b><FONT size=5>'.($_POST['line_number']).'</FONT></b><br>';
         
        print '
    </div>
 </div><br><br>
 ';
         if ((($iteration-$_POST['pallet_sh']+1)/2)==floor(($iteration-$_POST['pallet_sh']+1)/2)){
             print '<span id=NewPage></span>';
         }
         else print '<br><br>';
     }
     
        if (!set_last_pallet($_POST['line_number'], $_POST['pallet_sh']+$_POST['count_of_labels'], $_POST['id_s'])) print "�� ������� ��������!";
}
 ?>      
<script type="text/javascript">
$(document).ready(function(){
document.getElementById("popup_list").style.display = 'none';
});
</script> 
</body>
</HTML>