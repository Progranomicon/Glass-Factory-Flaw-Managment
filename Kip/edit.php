<HTML>
    <head>
        <LINK rel="icon" href="favicon.gif" type="image/x-icon">
        <LINK rel="shortcut icon" href="favicon.gif" type="image/x-icon">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>Отчеты ППР. Редактирование.</title>
    </head>
    <body>
<?php ?>	
<?php
	include "KipHeader.php";
	require 'Menu.php';
	require '/../conn.php';
	require 'Events.php';
	if(isset($_GET['edit']))
	{
		$q="SELECT * FROM steklo.ppr WHERE id='".$_GET['edit']."'";
		$res = mysql_query($q);
		if(mysql_num_rows($res)>0){
			$assoc = mysql_fetch_assoc($res);
		} else echo'ОШИБКА. Нет записи с id='.$_GET['edit'];
	
?>
    <FORM action="edit.php" method="GET">
            <h2>Редактирование</h2>
        <Table id="AddForm">
             <tr>
                 <td>Участок</td>
                 <td colspan="3"><?php echo substr($PPREq[$assoc['Equipment']],45) ?><input type="hidden" name="id" value="<?php echo $assoc['id']?>"></td>
			</tr>
			<tr>
                 <td>Исполнитель</td>
                 <td colspan="3"><?php echo $User[$assoc['Executor']] ?><input type="hidden" name="id" value="<?php echo $assoc['id']?>"></td>
			</tr>
             <tr>
                 <td>Месяц, год</td>
                 <td colspan="3"><?php 
				$d=explode("-",$assoc['TODate']);
				echo $mn[intval($d[1])].', '.$d[0];
				 ?></td>
             </tr>
			<tr>
				<td>Комментарий</td>
				<td colspan="3"><textAREA cols="60" rows="10" name="comment"><?php echo $assoc['Comments']?></textAREA></td>
             </tr>
             <tr>
                 <td colspan="4" style="text-align:center"><input id="Submit" type="submit"  value="Записать"></td>
             </tr>
        </TABLE>
    </form>
<?php
	}
    if (isset($_GET['comment'])){
		$q="UPDATE steklo.ppr SET Comments='".$_GET['comment']."' WHERE id='".$_GET['id']."'";
		$res=mysql_query($q) or die("Ошибка MySQL: ".mysql_error());
		if($res==0){
			echo '<span style="font-size: 24px; color: #990000;font-weight: bold">Ошибка</span><br>';
		}
		Else{
			echo '<span style="font-size: 24px; color: #009933;font-weight: bold">Изменено.</span><br>';
		}
		echo '<br><a href="/kip/ViewTO.php">←Вернуться к отчетам</a>';
		//echo 'Записан коментарий: '.$_GET['comment'];
	}
    require 'Footer.php';
?>
</body>
</HTML>