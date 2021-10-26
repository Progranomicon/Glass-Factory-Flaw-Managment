/* Создание нового объекта XMLHttpRequest для общения с Web-сервером */
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
  // Создать URL для подключения
  var url = "ajax_test.php?format_name=" + encodeURIComponent(prod);

  // Открыть соединение с сервером
  xmlHttp.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttp.onreadystatechange = updatePage;

  // SПередать запрос
  xmlHttp.send(null);
}
function updatePage() {
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    document.getElementById("zipCode").innerHTML=response;
  }
}
