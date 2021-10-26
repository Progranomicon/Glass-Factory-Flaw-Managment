<?php 
require_once("../options.php");
require("../SSCC.php");


$startNum = $_GET['startNum'];
$endNum = $_GET['endNum'];

$sscc = new TheHiddenHaku\SerialShippingContainerCode\SerialShippingContainerCode($OPTIONS['GS1_FACTORY_CODE']);
echo '{"codes":[';
for ($i=$startNum;$i<=$endNum;$i++){
	echo '"00'.$sscc->calculate($i).'"';
	if($i<$endNum) echo ", ";
}
echo "]}";
?>