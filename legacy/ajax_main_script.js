/* �������� ������ ������� XMLHttpRequest ��� ������� � Web-�������� */
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

function callServer() {
  
  var prod = document.getElementById("selectedProduction").value;
  // ������� URL ��� �����������
  var url = "ajax_test.php?format_name=" + encodeURIComponent(prod);

  // ������� ���������� � ��������
  xmlHttp.open("GET", url, true);

  // ���������� ������� ��� �������, ������� ���������� ����� ��� ������
  xmlHttp.onreadystatechange = updatePage;

  // S�������� ������
  xmlHttp.send(null);
}
function updatePage() {
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    document.getElementById("zipCode").innerHTML=response;
  }
}
