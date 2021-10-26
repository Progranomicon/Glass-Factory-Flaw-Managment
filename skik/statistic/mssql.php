<?php 
	$date1 = $_GET['date1'];
	$date2 = $_GET['date2'];
	$statData['cutted'] = array();
	$statData['ejected'] = array();
	$statData['idle'] = array();
	$statData['ejectedWare'] = array();
	$statData['sum'] = array();
	$statData['summary'] = array();
	
	$statData['sum']['cutted'] = 0;
	$statData['sum']['ejected'] = 0;
	$statData['sum']['idle'] = 0;
	$statData['sum']['ejectedWare'] = 0;
	
	$totalStat = array();
	$totalTempStat = array();
		
	$statTempData['cutted'] = array();
	$statTempData['ejected'] = array();
	$statTempData['idle'] = array();
	$statTempData['ejectedWare'] = array();
	
	$statData['categories'] = array();
	$curProduct = array('1'=>0, '2'=>0, '3'=>0, '4'=>0, '5'=>0, '6'=>0, '7'=>0, '8'=>0, '9'=>0, '10'=>0);
	$prodChanges = array();
	$rowCounter = 0;
	
	if ($connect = odbc_connect("MSSQL", "USR_SPV400GUEST", "SPV400GUEST")){
		$query = "SELECT * FROM SPV400.dbo.CounterValues join dbo.CounterPdf on (idPdf = id) WHERE Date BETWEEN '".$date1."' AND  '".$date2."' ORDER BY Date, Hour";
		$result = odbc_exec($connect, $query);
		while(odbc_fetch_array($result)){
			$prod = odbc_result($result, "IdPdf");
			$prodStr = odbc_result($result, "Name");
			$date = odbc_result($result, "Date");
			$hour = odbc_result($result, "Hour");
			$section = odbc_result($result, "Section");
			$cuttedGobs = (int)odbc_result($result, "CuttedGobs");
			$ejectedGobs = (int)odbc_result($result, "EjectedGobs");
			$ejectedWare = (int)odbc_result($result, "EjectedWareSection");
			$idle = (int)odbc_result($result, "CycleStop");
			
			if((int)$hour<24){
				if($curProduct[1] != $prod){
					$prodChanges[] = array('date' => $date, 'hour' => (int)$hour, 'prod' => iconv('windows-1251', 'utf-8', $prodStr).' ('.$prod.')');
				}
				if($hour == 0 || $curProduct[$section] == $prod){
					if(!isset($statTempData['cutted'][$section])){
						$statTempData['cutted'][$section] = array();
						$statTempData['cutted'][$section]['name'] = "Секция ".$section;
						$statTempData['cutted'][$section]['data'] = array();
						
						$statTempData['ejected'][$section] = array();
						$statTempData['ejected'][$section]['name'] = "Секция " . $section;
						$statTempData['ejected'][$section]['data'] = array();
						
						$statTempData['idle'][$section] = array();
						$statTempData['idle'][$section]['name'] = "Секция " . $section;
						$statTempData['idle'][$section]['data'] = array();
						
						$statTempData['ejectedWare'][$section] = array();
						$statTempData['ejectedWare'][$section]['name'] = "Секция " . $section;
						$statTempData['ejectedWare'][$section]['data'] = array();
					}
					if(!isset($totalStat[$section])){
						$totalStat[$section] = array();
						$totalStat[$section]['cutted'] = 0;
						$totalStat[$section]['ejected'] = 0;
						$totalStat[$section]['ejectedWare'] = 0;
						$totalStat[$section]['idle'] = 0;
					}
					
					$totalStat[$section]['cutted'] += $cuttedGobs;
					$totalStat[$section]['ejected'] += $ejectedGobs;
					$totalStat[$section]['ejectedWare'] += $ejectedWare;
					$totalStat[$section]['idle'] += $idle;
					
					$statData['sum']['cutted'] += $cuttedGobs;
					$statData['sum']['ejected'] += $ejectedGobs;
					$statData['sum']['idle'] += $idle;
					$statData['sum']['ejectedWare'] += $ejectedWare;
					
					$statTempData['cutted'][$section]['data'][] = $cuttedGobs;
					$statTempData['ejected'][$section]['data'][] = $ejectedGobs;
					$statTempData['idle'][$section]['data'][] = $idle;
					$statTempData['ejectedWare'][$section]['data'][] = $ejectedWare;
				}else{
					$curProduct[$section] = $prod;
				}
				if($hour == 0) $curProduct[$section] = $prod;
				$rowCounter ++;
			}
		}
		
		foreach($statTempData['cutted'] as $k=>$v){
			$statData['cutted'][] = $v;
		}
		foreach($statTempData['ejected'] as $k=>$v){
			$statData['ejected'][] = $v;
		}
		foreach($statTempData['idle'] as $k=>$v){
			$statData['idle'][] = $v;
		}
		foreach($statTempData['ejectedWare'] as $k=>$v){
			$statData['ejectedWare'][] = $v;
		}
		foreach($totalStat as $k=>$v){
			$statData['categories'][] = "Секция ".$k;			
			$totalTempStat['Отрезано'][] = $v['cutted'];
			$totalTempStat['Сброшено'][] = $v['ejected'];
			$totalTempStat['Сдуто'][] = $v['ejectedWare'];
			$totalTempStat['Простой(циклов)'][] = $v['idle'];
		}
		foreach($totalTempStat as $k=>$v){
			$statData['summary'][] = array('name' => $k, 'data' => $v);
		}
		$statData['changes'] = $prodChanges;
		//echo(json_encode($totalTempStat));
		print(json_encode($statData));
		odbc_close($connect);
		//echo "Запрос >".$query."<";
	}
?>