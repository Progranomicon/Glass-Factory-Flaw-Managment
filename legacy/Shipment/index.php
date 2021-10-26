<?php /* кешируем форматы*/
	require_once "/../conn.php";
	date_default_timezone_set("Europe/Moscow");
	$q="SELECT id, format_name, units_number, glass_color, gost FROM productionutf8";
	$res=mysql_query($q);
	while($row=mysql_fetch_assoc($res)){
		$format[$row['id']]['name']=$row['format_name'];
		$format[$row['id']]['count']=$row['units_number'];
		$format[$row['id']]['color']=$row['glass_color'];
		$format[$row['id']]['gost']=$row['gost'];
	}
?>
<html>
	<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<link type="text/css" rel="stylesheet" href="css.css" />
	</head>
	<body>
	<?php if (!isset($_GET['shsess']))
		echo '<div style="font-family:Helvetica;font-weight:lighter;font-size:4em;margin-top:1em;margin-left:2em;">Отгрузка</div>';
	?>
		<div id="<?php if (!isset($_GET['shsess'])) echo "content" ?>">
		<?php 
			
			if (isset($_GET['shsess'])){
				/*отчет по отгрузке*/
				
				$q="UPDATE pallets SET DriverFIO='".$_GET['DriverFIO']."', AutoRegStr='".$_GET['autoRegStr']."',  Storekeeper='".$_GET['storekeeper']."', ShippingTarget='".$LabelText=str_replace('"', '&quot;', $_GET['shippingTarget'])."' WHERE ScanSession='".$_GET['shsess']."' ";
					$res=mysql_query($q);
					//echo ">".$q."<";
				?>
				<b><u>ПАМЯТКА при отгрузке:</u></b>
				<ol>
				<li> Допускаются к загрузке <b>две последовательные даты производства</b> (третья должна быть согласована с покупателем).</li>
				<li> Подпись водителя погрузчика должна быть оригинальной</li>
				<li> В "ИТОГО" указать колличество паллет по производственным партиям</li>
				<li> Недопускается к отгрузке паллеты с нарушенной упаковкой и упаковкой, не соответствующей требованиям покупателя (двойная, грязная)</li>
				<li> Данный <b>ОТЧЕТ</b> должен соответствовать данным <b>ПАСПОРТА КАЧЕСТВА</b></li>
				<li> В графе грузополучатель указать площадку компании ОП "Хейнекен"</li>
				</ol>
				<table class="tableReport" style="font-size:1.3em;">
					<tr>
						<th colspan=4>ОТЧЕТ по отгрузке ГП для грузополучателя "Хейнекен"</th>
					</tr>
					<tr>
						<th>Дата отгрузки</th><th>ФИО кладовщика, смена</th><th>Марка и номер транспортного средства</th><th>ФИО водителя (фамилия полностью), подпись</th>
					</tr>
					<tr>
						<th><?php echo date("d.m.y");?></th><th><?php echo $_GET['storekeeper'];?></th><th><?php echo $_GET['autoRegStr'];?></th><th><?php echo $_GET['DriverFIO'];?></th>
					</tr>
				</table>
				<b>Грузополучатель <u><?php echo $_GET['shippingTarget'];?></u><br>
				Продукция выпущена по ГОСТ Р 53921-2010, СТО 99982965-001-2008 <br>
				Условия хранения</b> - в закрытых отапливаемых или неотапливаемых помещениях, под навесом.<br> 
				<b>Наименование продукции и цвет стекла:<span style="font-size:1.3em;"> <?php echo $format[intval($_GET['frmt'])]['name'].", ".$format[intval($_GET['frmt'])]['color'];?></span><br>
				<?php echo $format[intval($_GET['frmt'])]['gost']?></b>
				<table class="tableReport">
				<tr><th>N п/п</th><th>N паллета</th><th>Дата изготовления</th><th>N производственной партии</th><th>Дата истечения срока годности</th><th>Количество бутылок в паллете</th></tr>
				<?php 
					$totalPerPart=0;
					$i=1;
					$q="SELECT * FROM pallets WHERE ScanSession='".$_GET['shsess']."' ORDER BY eventDateTime";
					$res=mysql_query($q);
					while($row=mysql_fetch_assoc($res)){
						$part=substr($row['sn'],0,6);
						echo "<tr><th>".($i++)."</th><td>".substr($row['sn'],11,3)."</td><td>".substr($row['sn'],0,2)."/".substr($row['sn'],2,2)."/20".substr($row['sn'],4,2)."</td><td>".$part."</td><td>".substr($row['sn'],0,2)."/".substr($row['sn'],2,2)."/20".(intval(substr($row['sn'],4,2))+1)."</td><td>".$format[intval(substr($row['sn'],7,3))]['count']."</td></tr>";
						if (isset($ar[$part]['count'])){
							$ar[$part]['count']+=intval($format[intval(substr($row['sn'],7,3))]['count']);
							$ar[$part]['pallets']+=1;
						}
						else{
							$ar[$part]['count']=intval($format[intval(substr($row['sn'],7,3))]['count']);
							$ar[$part]['pallets']=1;
						}
						$totalPerPart+=intval($format[intval(substr($row['sn'],7,3))]['count']);
					}
					
				?>
				<tr><td style="text-align:right;" colspan="6"><?php echo "ИТОГО: ".$totalPerPart.". "; ?></td></tr>
				</table>
				<br>
				ИТОГО:<ul>
				<?php
				foreach ($ar as $key=>$value){
					echo "<li>Пр. партия: ".$key." - ".$value['pallets']."</li>";
				}
				?></ul><br>
				<br>
				Данные по отгрузке проверил. Наменование продукции, количество и даты соответствуют указанным в отчете. Целостность упаковки не нарушена. Груз закреплен согласно требованиям завода изготовителя.<br>
				Кладовщик СГП_____________________________________________________________<br>
				Водитель автопогрузчика _____________________________________________________
				<?php
			} /*сессия*/
			else
			if (isset($_GET['scansess'])){
				$q="SELECT * FROM pallets WHERE ScanSession='".$_GET['scansess']."' ORDER BY eventDateTime";
				$res=mysql_query($q);
				echo "Список паллетов в сессии:<br><br>";
				while($row=mysql_fetch_assoc($res)){
					echo $row['sn'].", время ".$row['eventDateTime'].', название: '.$format[intval(substr($row['sn'],7,3))]['name']."<br>";
					$frmt=substr($row['sn'],7,3);
					$a=$row['AutoRegStr'];
					$d=$row['DriverFio'];
					$st=$row['Storekeeper'];
					$sh=$row['ShippingTarget'];
				}
				?> 
				<form action="<?php echo 'index.php?shsess='.$_GET['scansess'].'&frmt='.$frmt ?>"><br>
				<input type="hidden" name="shsess" value="<?php echo $_GET['scansess'];?>">
				<input type="hidden" name="frmt" value="<?php echo $frmt ?>">
				 Марка и номер ТС <br>
				<input type="text" name="autoRegStr" value="<?php echo  $a;?>"><br>
				ФИО водителя<br>
				<input type="text" name="DriverFIO" value="<?php echo $d; ?>"><br>
				ФИО кладовщика<br>
				<input type="text" name="storekeeper" value="<?php echo $st; ?>"><br>
				Грузополучатель <br>
				<select name="shippingTarget">
					<option value="<?php echo $sh; ?>"><?php echo $sh; ?></option>
					<?php 
					$q="SELECT * FROM consumers WHERE deleted!='1' ORDER BY consumerName";
					$res=mysql_query($q);
					while($row=mysql_fetch_assoc($res)){
						echo '<option value="'.$row['consumerName'].'">'.$row['consumerName'].'</option>';
					}?>
				</select>
				<br>
				<br>
				<input type="submit" Value="Отчет + Записать">
				</form>
				<a href="index.php">← Назад к списку сессий</a>
				<?php
				
			}
			else{ /*заглавие*/
				echo "Отгрузочные сессии:<br><br>";
				$q=" SELECT * FROM pallets WHERE SyncDateTime > DATE_SUB(NOW(),INTERVAL 3 DAY) ORDER BY ScanSession DESC";
				$res=mysql_query($q);
				$sessions=array();
				while($row=mysql_fetch_assoc($res)){
					if (isset($sessions[$row['ScanSession']][substr($row['sn'],7,3)])){
						$sessions[$row['ScanSession']][substr($row['sn'],7,3)]+=1;
					}
					else{
						$sste[$row['ScanSession']]['shippingTimeEnd']=$row['SyncDateTime'];
						$sste[$row['ScanSession']]['car']=$row['AutoRegStr'];
						$sste[$row['ScanSession']]['driver']=$row['DriverFio'];
						$sste[$row['ScanSession']]['storekeeper']=$row['Storekeeper'];
						$sessions[$row['ScanSession']][substr($row['sn'],7,3)]=1;
					}	
				}
				$sessionsCount=0;
				foreach ($sessions as $key=>$value){
					$sessionsCount++;
					echo '<a href="index.php?scansess='.$key.'"> Сессия: '.$key.', погрузка окончена: '.$sste[$key]['shippingTimeEnd'].' <span style="font-size:0.7em;">';
					foreach ($sessions[$key] as $key=>$value){
						echo "<li>".$value." паллет - ".$format[intval($key)]['name'].", ".$format[intval($key)]['count']." шт.</li>";
					}
					/*echo 'Машина: '; 
						if ($sste[$key]['car']!='') 
							echo $sste[$key]['car']."<br>";
						else 
							echo '-<br>"';*/
					echo '</span></a><br><br>';
				}
				if ($sessionsCount==0) echo "Нет ни одной сессии";
				
			}
		?>
		</div>
	</body>
</html>