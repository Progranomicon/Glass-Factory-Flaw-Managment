<?php 
session_start();
require "main_header.php";
require 'Menu.php';
echo'<script language="JavaScript">
required = new Array("name", "color", "type", "layers_count", "units_count", "pallet_size_x", "pallet_size_y", "pallet_size_z", "boxing");
required_show = new Array("�������� �������", "���� ������", "��� �������", "���������� ����", "���������� ������� � �������", "������ �������", "������ �������", "������ �������", "��������");
function SendForm () {
                        var i, j;
                        for(j=0; j<required.length; j++) 
                        {
                            for (i=0; i<document.forms[0].length; i++) 
                            {
                                if (document.forms[0].elements[i].name == required[j] && document.forms[0].elements[i].value == "" ) 
                                {
                                    alert("������� ������� " + required_show[j]);
                                    document.forms[0].elements[i].focus();
                                    return false;
                                }
                            }
                        }
                        var Message="��������� ��������� ������:\n\n";
                        for(j=0; j<required.length; j++) 
                        {
                            for (i=0; i<document.forms[0].length; i++) 
                            {
                                if (document.forms[0].elements[i].name == required[j]) 
                                {
                                    Message+=required_show[j]+": "+document.forms[0].elements[i].value + "\n";
                                }
                            }
                        }
                        Message+="\n �������� ����� ������?";
                        if (confirm(Message)) 
                        {
                            return true;
                        } 
                        else 
                        {
                            return false;
                        } 
                    }
</script>';
include_once "conn.php";
if (!isset($_POST['name']))
{
echo'
<form  action="line_new_format.php" METHOD=POST onsubmit="return SendForm();">
    <table id="table_with_report1">
        <tr>
            <th>��������</th>
            <th>���������� �����</th>
            <th>���� ������</th>

            <th>���</th>
            <th>���������� �������</th>
            <th>������� �������</th>
            <th>��������</th>
        </tr>
        <tr>
            <td><input name="name" type="text"></td>
            <td><input name="layers_count" type="text" id=line_input></td>
            <td><SELECT name="color">
                <option value=�������>�������</option>
               <option value=����������>����������</option>
                </SELECT></td>
            
            <td><SELECT name="type" style={width:160px;}>
                <option value="������� ���������� ��� ������� ���������">������� ���������� ��� ������� ���������</option>
                <option value="����� ���������� ��� ������� ���������">����� ���������� ��� ������� ���������</option>
                </SELECT></td>
            <td><input name="units_count" type="text" style={width:60px; align:center;}> ��.</td>
            <td><input name="pallet_size_x" type="text" id=line_input >x<input name="pallet_size_y" type="text" id=line_input>x<input name="pallet_size_z" type="text" id=line_input> �.</td>
            <td><SELECT name="boxing" style={width:60px;}>
                <option value="���">��� (����������� ����� + ���������)</option>
                <option value="��">�� (����������� ��������� + ����������)</option>
                <option value="��">�� (��������������)</option>
                <option value="��">�� (����������)</option>
                </SELECT></td><td><input type="submit" value="��������"></td>
        </tr> 
    </form>
 </table>
 <br>
 <br>
 <b>&nbsp&nbsp&nbsp&nbsp&nbsp��� �������:</b>
 <table id="table_with_report">
        <tr>
            <th>��������</th>
            <th>���������� <br>�����</th>
            <th>���� ������</th>

            <th>���</th>
            <th>���������� �������</th>
            <th>������� �������</th>
            <th>��������</th>
        </tr>';
$q="SELECT * FROM production ORDER BY id DESC";
$res=mysql_query($q) or die("���-�� �� ��� � MySQL...");
while($Rows=mysql_fetch_assoc($res))
{
    echo '<tr>
            <td>'.$Rows['format_name'].'</td>
            <td>'.$Rows['number_of_layers'].'</td>
            <td>'.$Rows['glass_color'].'</td>
            <td>'.$Rows['type'].'</td>
            <td>'.$Rows['units_number'].'</td>
            <td><Multicol cols=3>'.$Rows['pallet_size'].' �.</multicol></td>
            <td>'.$Rows['boxing'].'</td>
        </tr>';
}
echo '</table>';
}
 else {
    $q="INSERT INTO production set format_name='".$_POST['name'].
                                            "', number_of_layers='".$_POST['layers_count'].
                                            "', glass_color='".$_POST['color'].
                                            "', type='".$_POST['type'].
                                            "', units_number='".$_POST['units_count'].
                                            "', boxing='".$_POST['boxing'].
                                            "', pallet_size='".$_POST['pallet_size_x'].'x'.$_POST['pallet_size_y'].'x'.$_POST['pallet_size_z']."'";
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