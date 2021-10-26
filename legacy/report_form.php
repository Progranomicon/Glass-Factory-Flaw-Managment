<?php 
/*Выводит форму выбора даты*/
print '<TABLE id="table_with_form_1"><tr><th></th><th>Дата</th><th>Час</th><th>Минута</th></tr><tr><td>C</td><td>';
print '<input name=date1 type=text value="" id="example">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td> ';
print '<td><SELECT name=from_hour>';
For($i=0;$i<=23;$i++)
	{
		if ($i==7){
			print print '<option selected value='.$i.'>'.$i.'</option>';
		}
		else {
			print print '<option value='.$i.'>'.$i.'</option>';
		}
	}
print '</SELECT></td>';
print '<td><SELECT name=from_minute>';
For($i=0;$i<=59;$i++)
	{
		if ($i==30){
			print print '<option selected value='.$i.'>'.$i.'</option>';
		}
		else {
			print print '<option value='.$i.'>'.$i.'</option>';
		}
	}
print '</SELECT></td></tr>';
print '<tr><td>По</td><td>';
print '<input name=date2 type=text value="" id="example2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
print '<td><SELECT name=to_hour>';
For($i=0;$i<=23;$i++)
	{
		if ($i==19){
			print print '<option selected value='.$i.'>'.$i.'</option>';
		}
		else {
			print print '<option value='.$i.'>'.$i.'</option>';
		}
	}
print '</SELECT></td>';
print '<td><SELECT name=to_minute>';
For($i=0;$i<=59;$i++)
	{
		if ($i==30){
			print print '<option selected value='.$i.'>'.$i.'</option>';
		}
		else {
			print '<option value='.$i.'>'.$i.'</option>';
		}
	}
print '</SELECT></td></tr></TABLE>';
?>