<?php 
session_start();
require "main_header.php";
require 'Menu.php';
echo'<script language="JavaScript">
required = new Array("name", "color", "type", "layers_count", "units_count", "pallet_size_x", "pallet_size_y", "pallet_size_z", "boxing");
required_show = new Array("название формата", "цвет стекла", "тип изделия", "количество слоёв", "количество изделий в паллете", "размер паллета", "размер паллета", "размер паллета", "упаковка");
function SendForm () {
                        var i, j;
                        for(j=0; j<required.length; j++) 
                        {
                            for (i=0; i<document.forms[0].length; i++) 
                            {
                                if (document.forms[0].elements[i].name == required[j] && document.forms[0].elements[i].value == "" ) 
                                {
                                    alert("Следует указать " + required_show[j]);
                                    document.forms[0].elements[i].focus();
                                    return false;
                                }
                            }
                        }
                        var Message="Проверьте введенные данные:\n\n";
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
                        Message+="\n Добавить такой формат?";
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
            <th>Название</th>
            <th>Количество слоев</th>
            <th>Цвет стекла</th>

            <th>Тип</th>
            <th>Количество изделий</th>
            <th>Размеры паллета</th>
            <th>Упаковка</th>
        </tr>
        <tr>
            <td><input name="name" type="text"></td>
            <td><input name="layers_count" type="text" id=line_input></td>
            <td><SELECT name="color">
                <option value=зеленый>зеленый</option>
               <option value=бесцветный>бесцветный</option>
                </SELECT></td>
            
            <td><SELECT name="type" style={width:160px;}>
                <option value="Бутылка стеклянная для пищевых жидкостей">Бутылка стеклянная для пищевых жидкостей</option>
                <option value="Банка стеклянная для пищевых продуктов">Банка стеклянная для пищевых продуктов</option>
                </SELECT></td>
            <td><input name="units_count" type="text" style={width:60px; align:center;}> шт.</td>
            <td><input name="pallet_size_x" type="text" id=line_input >x<input name="pallet_size_y" type="text" id=line_input>x<input name="pallet_size_z" type="text" id=line_input> м.</td>
            <td><SELECT name="boxing" style={width:60px;}>
                <option value="ПКП">ПКП (Пластиковый короб + прокладка)</option>
                <option value="ПП">ПП (Пластиковая прокладка + гофрокороб)</option>
                <option value="ГП">ГП (Гофропрокладка)</option>
                <option value="ГК">ГК (Гофрокороб)</option>
                </SELECT></td><td><input type="submit" value="Добавить"></td>
        </tr> 
    </form>
 </table>
 <br>
 <br>
 <b>&nbsp&nbsp&nbsp&nbsp&nbspУже имеются:</b>
 <table id="table_with_report">
        <tr>
            <th>Название</th>
            <th>Количество <br>слоев</th>
            <th>Цвет стекла</th>

            <th>Тип</th>
            <th>Количество изделий</th>
            <th>Размеры паллета</th>
            <th>Упаковка</th>
        </tr>';
$q="SELECT * FROM production ORDER BY id DESC";
$res=mysql_query($q) or die("Что-то не так с MySQL...");
while($Rows=mysql_fetch_assoc($res))
{
    echo '<tr>
            <td>'.$Rows['format_name'].'</td>
            <td>'.$Rows['number_of_layers'].'</td>
            <td>'.$Rows['glass_color'].'</td>
            <td>'.$Rows['type'].'</td>
            <td>'.$Rows['units_number'].'</td>
            <td><Multicol cols=3>'.$Rows['pallet_size'].' м.</multicol></td>
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
        echo 'Успешно добавлен новый формат: '.$_POST['name'].'.';
    }
        else
    {
        echo "Невозможность добавить формат <br>".$q;
    }
}
include_once "bottom.php";
mysql_close();
?>