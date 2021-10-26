<?php 
$file = fopen("labelSettings.txt","at");
    if ($file){
		/*While(!feof($file)){
			$string = fgets($file);
			echo $string."<br>";
		}*/
		fwrite($file,"new string\n");
		fclose($file);
	}
?>