<?php 
	session_start();
	require_once "/../conn.php";
	if(isset($_SESSION['user_id'])){
		if (isset($_GET['set_production'])){
			$set_production_query = "INSERT INTO production_on_lines SET server_date_time=NOW(), date_time=NOW(), kis='".$_GET['kis']."', line_number='".$_GET['line']."', production_id='".$_GET['set_production']."', user_id='".$_SESSION['user_id']."', forms='".$_GET['forms']."'";
			$res=mysql_query($set_production_query);
			if (mysql_affected_rows()==1){
				echo '{"result":{"status":"ok"}}';
			}else{
				echo '{"result":{"status":"fail", "message": "MySQL Error"}}';
			}
			return;
		}
		if (isset($_GET['finishProduction'])){
			$set_production_query = "update production_on_lines SET end_date=NOW() WHERE `id`='".$_SESSION['curProdId']."'";
			$res=mysql_query($set_production_query);
			if (mysql_affected_rows()==1){
				echo '{"result":{"status":"ok"}}';
			}else{
				echo '{"result":{"status":"fail", "message": "MySQL Error"}}';
			}
			return;
		}
	}
	
	else{
		//echo '{"result":"fail", "message": "Пройдите авторизацию. Введите пароль"}';
	}
		if (isset($_GET['get_production_list'])){
			$get_production_query="SELECT id, format_name, glass_color, units_number, boxing FROM productionutf8 WHERE isDeleted='0' ORDER BY id DESC";
			$res=mysql_query($get_production_query);
			if (mysql_num_rows($res)>=0){
				echo '{';
				while($row=mysql_fetch_assoc($res)){
					echo '"'.$row['id'].'":{"id":"'.$row['id'].'", "color":"'.$row['glass_color'].'", "boxing":"'.$row['boxing'].'", "count":"'.$row['units_number'].'", "format_name":"'.$row['format_name'].'"}, ';
				}
				echo '"result":{"status":"ok"}}';
			}
			else echo '{"result":{"status":"fail", "message":"MySQL Error"}}';
			return;
		}
		if (isset($_GET['get_production'])){
			$get_production_query="SELECT id, format_name, glass_color, units_number, boxing FROM productionutf8 WHERE id=(SELECT production_id FROM production_on_lines WHERE line_number='".$_GET['line']."' ORDER BY id DESC LIMIT 0,1);";
			$res=mysql_query($get_production_query);
			if (mysql_num_rows($res)>0){
				echo '{';
				while($row=mysql_fetch_assoc($res)){
					echo '"production":{"id":"'.$row['id'].'", "color":"'.$row['glass_color'].'", "boxing":"'.$row['boxing'].'", "count":"'.$row['units_number'].'", "format_name":"'.$row['format_name'].'"}, ';
				}
				echo '"result":{"status":"ok"}}';
			}
		else {
			echo '"result":{"status":"fail", "message":"MySQL Error"}}';
			return;
			}
		}
?>