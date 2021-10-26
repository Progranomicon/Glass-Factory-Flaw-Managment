<?php 
	$date1 = $_GET['date1'];
	$date2 = $_GET['date2'];
	$statData['cutted'] = array();
	$statData['ejected'] = array();
	if ($connect = odbc_connect("MSSQL", "USR_SPV400GUEST", "SPV400GUEST")){
		$query = "SELECT * FROM SPV400.dbo.CounterValues WHERE Date BETWEEN '".$date1."' AND  '".$date2."'";
		$result = odbc_exec($connect, $query);
		while(odbc_fetch_array($result)){
			$date = odbc_result($result, "Date");
			$hour = odbc_result($result, "Hour");
			$section = odbc_result($result, "Section");
			$cuttedGobs = (int)odbc_result($result, "CuttedGobs");
			$ejectedGobs = (int)odbc_result($result, "EjectedGobs");
			if((int)$hour<24){
				if(!isset($statData['cutted'][(int)$section])){
					$statData['cutted'][(int)$section] = array();
					$statData['cutted'][(int)$section]['name'] = $section;
					$statData['cutted'][(int)$section]['data'] = array();
					
					$statData['ejected'][(int)$section] = array();
					$statData['ejected'][(int)$section]['name'] = $section;
					$statData['ejected'][(int)$section]['data'] = array();
				}
				
				$statData['cutted'][(int)$section]['data'][] = $cuttedGobs;
				$statData['ejected'][(int)$section]['data'][] = $ejectedGobs;
			}
		}
		print(json_encode($statData));
		odbc_close($connect);
	}
?>