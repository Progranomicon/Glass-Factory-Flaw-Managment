<?php
require_once 'conn.php';
require_once 'my_func.php';
$f_n=iconv('UTF-8', 'windows-1251', $_GET['format_name']);
$ajax_que= "SELECT * FROM production WHERE format_name='".$f_n."'";
$ajax_res=mysql_query($ajax_que) or die("������ �� �����. ������ MYSQL.");
$r_set=mysql_fetch_assoc($ajax_res);
if(mysql_num_rows($ajax_res)==0)
{
    print iconv('windows-1251', 'UTF-8',"��� ������ ������� � ������ ��������");
}
else 
{
    print iconv('windows-1251', 'UTF-8','� �������: '.(get_last_pallet()).'<br>
        ��� "���������� C��������� �����"<br>
        ���������� ��������, �. ��������,<br> ��. ��������������, �. 22<br> 
        �������: (83451)9-42-01<br>
        E-mail:info@ruzsteklo.ru<br>
        '.$r_set['type'].'
        <br>
        ���� ������: '.$r_set['glass_color'].'<br>
        �������� ����������� ��������� <p><SELECT name=product_subtype id=selectedProduction onChange="callServer()";>');
$formats_list=get_prod_list();
$_SESSION['formats_list']=$formats_list;
foreach ($formats_list as $key =>$value) {
    if ($value!=$f_n) print iconv('windows-1251', 'UTF-8', '<option value="'.$value.'">'.$value.'</option>');
    else              print iconv('windows-1251', 'UTF-8', '<option selected value="'.$value.'">'.$value.'</option>');
    
}
print iconv('windows-1251', 'UTF-8', ' 
        </SELECT></p>
            '.$r_set['gost'].'
        <br>
        ��� 99982.965-002-2009<br>
        ���-�� �������:'.$r_set['units_number'].'.<br>
        ���������� �������: '.$r_set['pallet_size'].' �<br>
        ���� ������������ <FONT size=5  >"<u>'.(date("d.m.Y")).'</u>"</FONT><br>
        <p>
            � ����� &nbsp&nbsp&nbsp&nbsp&nbsp � �/����� <input id=line_input name="line_number" type="text"></p>        
        <!-- </p><img SRC="/img/barcode.png"><br> -->
        <br>
        <br>
        <br>
        <br>
        <br>���������� ��������&nbsp&nbsp&nbsp<input type="text" name="count_of_labels" value="50" ><br>
        <br>�����������&nbsp&nbsp&nbsp<input type="submit" value="->" ></FORM>');
} 
?>
