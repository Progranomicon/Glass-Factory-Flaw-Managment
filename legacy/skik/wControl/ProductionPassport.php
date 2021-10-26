<?php
	session_start();
?>
<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../../Bottle.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../auth.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="js.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="params.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../moment.min.js" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="css.css">
	<link rel="stylesheet" type="text/css" href="toast.css">
</head>
<body>
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
	<div id="log"></div>
	<script type="text/javascript">
        $(document).ready(function(){
			getProduction();
			productionSelectorField();
		});
	</script>
</body>
</html>