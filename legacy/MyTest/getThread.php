<?php 
	function getThread(){ 
		$link = "http://108.162.204.67/gd/res/51612.json";
		$fd = fopen($link, "r"); 
		$text=""; 
		if (!$fd) echo "Запрашиваемая страница не найдена"; 
		else 
		{ 
			while (!feof ($fd)) $text .= fgets($fd, 4096); 
		} 
		fclose ($fd); 
		return $text; 
	}
	echo getThread();
	/*
	if (copy($_GET['threadLink'], "/j/")){
		echo $_GET['threadLink']." is Ok!";
	}
	else echo $_GET['threadLink']." is ERROR!";*/
?>