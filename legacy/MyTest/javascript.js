function ebi(id){
	return document.getElementById(id);
}
var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}
@end @*/

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}

function getThread(link) {
  
  //link = link|"http://www.address.ru/45443/776666.json";
  var url = "getThread.php?threadLink=" + encodeURIComponent(link);
  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = recievedData;

  // SПередать запрос
  xmlHttp.send(null);
}
function recievedData() {
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    ebi("jastDiv").innerHTML=response;
  }
}