<?php
	session_start();
?>
<html>
<head>
	<title>РСЗ. Контроль качества</title>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="moment-with-locales.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="readable-range.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="langs.min.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="UserData.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="defects.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="params.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../tools.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../customWindow.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../MiniMessage.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="report_code.js" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="report.css">
</head>
<body>
	<div id="workspace">
		
	</div>
	<div id="log"></div>
	</div> 
	<div id="messageDivWraper" style="z-index:100;position:absolute;top:0px;right:0px;display:block;text-align:right;width:auto;"></div>
	</div>
	<script type="text/javascript">
		moment.lang("ru");
        $(document).ready(function(){
			getDataByPeriodId('123');
			
		});
			<?php //if(isset($_GET['line'])){if($_GET['line']!='') {echo 'currentLine='.$_GET['line'].';';}}else{};
				if(isset($_GET['periodId'])){if($_GET['periodId']!='') {echo 'periodId='.$_GET['periodId'].';';}}else{};
				if(isset($_GET['deltaDay'])){if($_GET['deltaDay']!='') {echo 'deltaDay='.$_GET['deltaDay'].';';}}else{};
				
				//if(isset($_GET['userType'])){if($_GET['userType']!='') {echo 'userType="'.$_GET['userType'].'";';}}else{}?> /* OTK или SFM */
	</script>
</body>
</html>