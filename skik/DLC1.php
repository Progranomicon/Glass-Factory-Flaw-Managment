<? 
	session_start();
	date_default_timezone_set('Europe/Moscow');
	include '../conn.php';
	include '../tools.php';
	include 'roughMolds.php';
	$messages = array();
	$lineState = array();
	$lineState = getLineState();
	
	if(isset($_GET['task'])){
		if($_GET['task']=='mountRoughMold'){
			mountRoughMold($_GET['mold'],$_GET['section'],$_GET['position']);
		}
	}
	
	
?>