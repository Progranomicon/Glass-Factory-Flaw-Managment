<?php 
session_start();
include_once "top_of_page_1.php";
print '<div class="menu_div"> [<A HREF="index.php"> � ������ </A>] �����2 �����3 �����4 �����5</div>';
include_once "conn.php";
if (!isset($_POST['name']))
{
echo'
<form id="table_with_form_1" action="line_new_format.php" METHOD=POST>
    <table>
        <tr>
            <th>��������</th>
            <th>���������� �����</th>
            <th>����</th>
            <th>����</th>
            <th>���</th>
            <th>���������� �������</th>
            <th>������� �������</th>
        </tr>
        <tr>
            <td><input name="name" type="text"></td>
            <td><input name="layers_count" type="text"></td>
            <td><input name="color" type="text"></td>
            <td><input name="gost" type="text"></td>
            <td><input name="type" type="text"></td>
            <td><input name="units_count" type="text"></td>
            <td><input name="pallet_size" type="text"></td>
        </tr>
    </table>
        <input type="submit" value="��������">
    </form>';}
 else {
    $q="INSERT INTO production set format_name='".$_POST['name'].
                                            "', number_of_layers='".$_POST['layers_count'].
                                            "', glass_color='".$_POST['color'].
                                            "', gost='".$_POST['gost'].
                                            "', type='".$_POST['type'].
                                            "', units_number='".$_POST['units_count'].
                                            "', pallet_size='".$_POST['pallet_size']."'";
    if (mysql_query($q))
    {
        echo '������� �������� ����� ������: '.$_POST['name'].'.';
    }
        else
    {
        echo "������������� �������� ������ <br>".$q;
    }
}
include_once "bottom.php";
mysql_close();
?>