<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="../moment.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../Bottles.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../auth.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../defects_forms.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../calendar.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="js.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="params.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="css.css">
	<link rel="stylesheet" type="text/css" href="toast.css">
</head>
<body>
	<script src="highstock.js"></script>
	<script src="exporting.js"></script>
	
	<div id="workspace">
		<div id="paramsDiv">
			<div id="productionSelector">
			</div>
			<div id="paramsList">
			</div>
		</div>
	</div>
	<div id="paramData">
	</div>
	<div id="popupWindow" style="">
		<b><span id="popupHeader">Заголовок  </span></b> &nbsp <img src="../close2.png" onclick="closePopup()" class="close_img">
		<div id="popupContent"></div>
	</div>
	<div id="log"></div>
	<script type="text/javascript">
		var mode=1;
		<?php 
			if(isset($_GET['prodId'])){if($_GET['prodId']!='') {echo 'var _getProdId='.$_GET['prodId'].';';}}else{}
			if(isset($_GET['mode'])){if($_GET['mode']!='') {echo ' mode='.$_GET['mode'].';';}}else{}
			if(isset($_GET['line'])){if($_GET['line']!='') {echo ' var line='.$_GET['line'].';';}}else{}
			if(isset($_GET['molds'])){if($_GET['molds']!='') {echo ' var molds="'.$_GET['molds'].'";';}}else{}
		?>
		var bottle=new Bottles();
        $(document).ready(function(){
			getProduction();
			productionSelectorField();
		});
	</script>
</body>
</html>