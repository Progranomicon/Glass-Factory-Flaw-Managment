<html>
<head>
	<LINK rel="icon" href="/../favicon.gif" type="image/x-icon">
	<LINK rel="shortcut icon" href="/../favicon.gif" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<script language="javascript" type="text/javascript" src="jquery.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="js2.js" charset="utf-8"></script>
	<script language="javascript" type="text/javascript" src="../Bottles.js" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="css.css">
</head>
<body>
	<div class="front">
		<input type="button" value="dispose" onclick="bottles.off();">
		<input type="button" value="alive" onclick="bottles.on('i`m alive!!');">
	</div>
	<script type="text/javascript">
		var b = new Bottles();
        $(document).ready(function(){
			b.on();
			var i=0;
			for(v in window){
				if (typeof(window[v])=='Bottles'){
					alert("yes");
				}
				else{
					alert(typeof(window[v]));
				}
				i++;
			}
			alert("Variables: "+i);
		});

	</script>
</body>
</html>