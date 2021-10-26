<html>
	<head>
		<script type="text/javascript" src="jquery.js"></script>
		<link type="text/css" rel="stylesheet" href="css.css" />
		<script type="text/javascript" src="scenario.js"></script>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	</head>
	<body>
		<div id="site">
			<div id="LogoArea">
				<img src="Logo.jpg" alt="Logo">
				The site of realty
			</div>
				<?php include "mm.php";?>
			<div id="MenuArea">
				<div class="TopMenu">
					<div id="leftMenu" style="float:left;">
						<div class="miniMenuItem miniMenuItemSelected" onclick="miniMenuClick(this,0);">Квартира</div>
						<div class="miniMenuItem" onclick="miniMenuClick(this,1);">Участок</div>
						<div class="miniMenuItem" onclick="miniMenuClick(this,2);">Дом</div>
						<div class="miniMenuItem" onclick="miniMenuClick(this,3);">Нежилая недвижимость</div>
						<div class="miniMenuItem" onclick="miniMenuClick(this,4);">Все объекты</div>
						
					</div>
					<div id="rightMenu" style="float:right;">
						<div class="miniMenuItem miniMenuItemSelected" onclick="miniMenuClick(this,0);">Купить</div>
						<div class="miniMenuItem " onclick="miniMenuClick(this,1);" >Снять</div>
						
					</div>
				</div>
				<div id="secondMenu">
					<div id="areaMenu">
					</div>
					<div id="roomsMenu">
					</div>
					<div id="sqMenu">
					</div>
				</div>
				<div style="display:none;">
					<input type="text" id="topLeftMenuSelectedItem" value="0">
					<input type="text" id="topRightMenuSelectedItem" value="0">
					<input type="text" id="Area" value="0">
					<input type="text" id="rooms" value="1">
					<input type="text" id="sq" value="0">
				</div>
			</div>
			<div class="PopUpSel" id="SelectArea">
				<div style="float:left;">
				Саранск
					<ul id="sar">
					</ul>
				</div>
				<div style="float:left;">
				Республика
					<ul id="Resp">
					</ul>
				</div>
			</div>
			<div class="PopUpSel" id="SelectQ">
			Площадь:
				<ul id="sqList">
				</ul>
			</div>
			<div id="adverts">
			</div>
		</div>
		<script type="text/javascript">
			initInit();
		</script>
	</body>
</html>