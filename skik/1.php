<?php include '../conn.php';
function getW(){
		$r = '"weights":"error"';
		$res = mysql_query("SELECT weight FROM factory.weights ORDER BY `date` DESC LIMIT 0,4");
				if($res){
					
						$row = mysql_fetch_assoc($res);
						$delim ="";
						$r = '"weights":"';
						while($row = mysql_fetch_assoc($res)){
							$r .= $row['weight'].$delim;
							$delim = " g. &nbsp &nbsp &nbsp";
						}
						$r .= '"';
				}else echo $res;
		echo $r;
	}
	getW();
?>