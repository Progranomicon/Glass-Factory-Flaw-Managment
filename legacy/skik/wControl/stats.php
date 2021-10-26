<?php 
	session_start();
	
	if(isset($_GET['getStatistic'])){
		$query = "SELECT * FROM format_passport_params WHERE"; // write ohuenni zapros for get whole statistic
	}
?>