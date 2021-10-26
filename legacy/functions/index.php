<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="jquery.carouFredSel.js"></script>
		<script type="text/javascript" src="scenario.js"></script>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="css.css" />
	</head>
	<body>
		<div id="site">
		<div id="LogoArea">
			<img src="Logo.jpg" alt="Logo">
			The site of realty
		</div>
		<?php include "mm.php";?>
		<div id="adArea">
			<img src="slide1.jpg" alt="Advertise">
			<img src="slide2.jpg" alt="Advertise">
			<img src="slide3.jpg" alt="Advertise">
		</div>
		<div id="pagin" class="pagination">
		</div>
		<div id="newsArea">
			<img src="1rowNews.jpg" alt="News">
		</div>
		</div>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#adArea").carouFredSel({
				items				: 1,
				witdh				: "100%",
				circular			: true,
				direction			: "left",
				scroll : {
					items			: 1,
					easing			: "swing",
					duration		: 1000,							
					pauseOnHover	: false
				},
				auto   : {
					play			: true,
					timeoutDuration		: 3000
				},
				pagination  : "#pagin"
			});	
		});
	</script>
	</body>
</html>