<?php 
	session_start();
	date_default_timezone_set('Europe/Moscow');
	require_once "/../conn.php";
	if(isset($_SESSION['user_id'])){
		if (isset($_GET['set_defect'])){
			$molds = explode(',',$_GET['form']);
			if(isset($_GET['param_value']) AND $_GET['param_value']!='')	$param_value=$_GET['param_value'];
			else  $param_value="NULL";
			if(isset($_GET['comment']) AND $_GET['comment']!='') $comment=$_GET['comment'];
			else $comment="NULL";
			$megaQuery="INSERT INTO forms_defects(`server_date_time`, `date_time_start`,  `form_number`, `line`, `defect`, `flaw_part`, `corrective_action`, `user_id`, `param_value`, `comment`) VALUES ";
			foreach($molds as $key=>$mold ){
				$megaQuery.="(NOW(), NOW(), ".$mold.", ".$_GET['line'].", ".$_GET['defect'].", ".$_GET['flaw_part'].", ".$_GET['corrective_action'].", ".$_SESSION['user_id'].", ".$param_value.", '".$comment."'), ";
			}
			$megaQuery = substr($megaQuery,0,strlen($megaQuery)-2);
			$res=mysql_query($megaQuery);
			if (mysql_affected_rows()>0){
				echo '{"result":{"status":"ok", "message": "Установлено '.mysql_affected_rows().' дефектов", "defectsNum":"'.mysql_affected_rows().'"}}';
			}else{
				echo '{"result":{"status":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$megaQuery.'", "mysql_error":"'.mysql_error().'"}}';
			}
			return;
		}
		if (isset($_GET['remove_defect'])){
			$remove_defect_query="UPDATE forms_defects SET date_time_end=NOW() WHERE id='".$_GET['id']."'";
			$res=mysql_query($remove_defect_query);
			if (mysql_affected_rows()==1){
				echo '{"result":"ok", "message": "Удачно."}';
			}else{
				echo '{"result":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$remove_defect_query.'", "mysql_error":"'.mysql_error().'"}';
			}
			return;
		}
		if (isset($_GET['remove_all_defects'])){
			$affectedRows=0;
			$selectAllDefectsQuery = "SELECT * FROM forms_defects WHERE date_time_start>=(SELECT date_time FROM production_on_lines WHERE line_number='".$_GET['line']."' ORDER BY date_time DESC LIMIT 0,1) AND date_time_end IS NULL AND line='".$_GET['line']."'";
			$res=mysql_query($selectAllDefectsQuery);
			if(mysql_num_rows($res)>0){
				while($row=mysql_fetch_assoc($res)){
						$remove_defect_query="UPDATE forms_defects SET date_time_end=NOW() WHERE id='".$row['id']."'";
						$res2=mysql_query($remove_defect_query);
						if ($res2){
							$affectedRows++;
						}
				}
				$message = "Снято ".$affectedRows." дефектов.";
			}
			else{
				$message = "Не снять не один дефект.";
			}
			echo '{"result":"ok", "message": "'.$message.'"}';
			return;
		}
		if (isset($_GET['set_form'])){
			$set_form_query = "INSERT INTO forms_moves SET server_date_time=NOW(), line='".$_GET['line']."', date_time=NOW(), form_number='".$_GET['form']."', section='".$_GET['section']."', position='".$_GET['position']."'";
			$res=mysql_query($set_form_query);
			if (mysql_affected_rows()==1){
				echo '{"result":"ok", "message": "Удачно."}';
			}else{
				echo '{"result":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$set_form_query.'", "mysql_error":"'.mysql_error().'"}';
			}
			return;
		}
		if(isset($_GET['unmountAllMolds'])){
			$query = "INSERT INTO forms_moves(`server_date_time`, `date_time`,  `form_number`, `line`, `section`, `position`) VALUES ";
			for($sec=1; $sec<11;$sec++){
				for($pos=1; $pos<4;$pos++){
					$query.="(NOW(), NOW(), '0', '".$_GET['line']."', '".$sec."', '".$pos."'), ";
				}	
			}
			$query = substr($query,0,strlen($query)-2);
			$res=mysql_query($query);
			if (mysql_affected_rows()>0){
				echo '{"result":{"status":"ok", "message": "Формы сняты"}}';
			}else{
				echo '{"result":{"status":"fail", "message": "Неудачно. MySQL Error.", "mysql_query":"'.$query.'", "mysql_error":"'.mysql_error().'"}}';
			}
			return;
		}
	}else{
		if (isset($_GET['set_defect']) || isset($_GET['remove_defect']) || isset($_GET['remove_all_defects']) || isset($_GET['set_form'])){
			echo '{"result":{"status":"fail", "message":"Пройдите авторизацию. Введите пароль"}}';
		}
	}
	if (isset($_GET['get_state'])){
			$resTime = mysql_query("SELECT NOW()");
			$time= mysql_fetch_array($resTime);
			$forms_moves_query="SELECT * FROM forms_moves WHERE date_time>(SELECT date_time FROM production_on_lines WHERE line_number='".$_GET['line']."' ORDER BY date_time DESC LIMIT 0,1) AND line='".$_GET['line']."'";
			echo '{ "moves":{';
			$res=mysql_query($forms_moves_query);
			if (mysql_num_rows($res)>0){
				while($row=mysql_fetch_assoc($res)){
					echo '"'.$row['id'].'":{"id":"'.$row['id'].'", "date_time":"'.$row['date_time'].'", "section":"'.$row['section'].'", "position":"'.$row['position'].'", "form_number":"'.$row['form_number'].'"}, ';
				}
				echo '"result":{"status":"ok", "serverDate":"'.$time[0]/*date("Y-m-d H:i")*/.'"}}, ';
				//echo '}';
			}else{
				echo '"result":{"status":"fail", "message": "MySQL Error", "mysql_query":"'.$forms_moves_query.'", "mysql_error":"'.mysql_error().'"}}, ';
			}
			$forms_defects_query = "SELECT * FROM forms_defects WHERE date_time_start>=(SELECT date_time FROM production_on_lines WHERE line_number='".$_GET['line']."' ORDER BY date_time DESC LIMIT 0,1) AND date_time_end IS NULL AND line='".$_GET['line']."'";
			echo ' "defects":{';
			$res=mysql_query($forms_defects_query);
			if (mysql_num_rows($res)>0){
				while($row=mysql_fetch_assoc($res)){
					echo '"'.$row['id'].'":{"id":"'.$row['id'].'", "date_time_start":"'.$row['date_time_start'].'", "defect":"'.$row['defect'].'", "form_number":"'.$row['form_number'].'", "flaw_part":"'.$row['flaw_part'].'", "corrective_action":"'.$row['corrective_action'].'", "param_value":"'.$row['param_value'].'", "comment":"'.$row['comment'].'"}, ';
				}
				echo '"result":{"status":"ok"}}, ';
			}else{
				echo '"result":{"status":"fail", "message": "MySQL Error", "mysql_query":"'.$forms_defects_query.'", "mysql_error":"'.mysql_error().'"}}, ';
			}
			echo ' "result":{"status":"ok"}}';
			return;
		}
	/*function updateStateFile($line){
		$postanovkaId = '0';
		$get_production_query="SELECT * FROM production_on_lines WHERE line_number='".$line."' ORDER BY id DESC LIMIT 0,1";
		$res=mysql_query($get_production_query);
		if (mysql_num_rows($res)>0){
			while($row=mysql_fetch_assoc($res)){
				$postanovkaId = $row['id'];
			}
		}
		
		
	}*/
?>