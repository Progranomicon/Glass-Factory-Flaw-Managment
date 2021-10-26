/* Создание нового объекта XMLHttpRequest для общения с Web-сервером */
var xmlHttp = false;
var xmlHttp_popup = false;
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
if (!xmlHttp_popup && typeof XMLHttpRequest != 'undefined') {
  xmlHttp_popup = new XMLHttpRequest();
}
function callPopupList() {
  document.getElementById("popup_list").style.display = 'block';
  document.getElementById("popup_list").style.visibility ='visible';
  //alert('Vazza');
  var user_input = document.getElementById("product_ss").value;
  // Создать URL для подключения
  var url = "AjaxPopupResponseV2.php?user_input=" + encodeURIComponent(user_input);
    // Открыть соединение с сервером
  xmlHttp_popup.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttp_popup.onreadystatechange = updatePopup;

  // SПередать запрос
  xmlHttp_popup.send(null);
}
function updatePopup() {
  if (xmlHttp_popup.readyState == 4) {
    var response = xmlHttp_popup.responseText;
    document.getElementById("popup_list").innerHTML=response;
  }
}
function set_selected_format(a){
    document.getElementById("selectedProduction").value=a;
    document.getElementById("popup_list").style.display = 'none';
    var c = callServer();
};
function apply_specs (id_s, boxing_s, type_s, color_s, product_s, count_s, size_s){
    document.getElementById("id_s").value=id_s;
    document.getElementById("type_s").innerHTML=type_s;
    document.getElementById("color_s").innerHTML=color_s;
    document.getElementById("product_s").innerHTML='<A HREF="javascript:show_input();">'+product_s+'</A>';
    document.getElementById("count_s").innerHTML=count_s;
    document.getElementById("size_s").innerHTML=size_s;
    document.getElementById("boxing_s").innerHTML=boxing_s;
    document.getElementById("popup_list").style.display = 'none';
    get_allert_state();
};
function show_input(){
    document.getElementById("product_s").innerHTML='<input name="product_s" type="text" id="product_ss" style={width:150px;} onKeyUp="callPopupList();">';
    document.forms[0].product_s.focus();
    callPopupList();
};
function get_allert_state (){
    var line_num = document.getElementById("line_input").value;
    if (last_palletes[line_num-1][2]!=document.getElementById("id_s").value)
    {
        document.getElementById("warning_s").innerHTML="<FONT color=red Size=4 >Внимание! Нумерация начнется с единицы.<br> Формат для <b>линии №"+document.getElementById("line_input").value+" </b>был изменен!</font>";//+document.getElementById("id_s").value+" != "+last_palletes[line_num][2];
        document.getElementById("pallet_s").innerHTML="1";
        document.getElementById("pallet_sh").value="1";
    }
    else 
    {
        document.getElementById("warning_s").innerHTML="";
        document.getElementById("pallet_s").innerHTML=last_palletes[line_num-1][1];
        document.getElementById("pallet_sh").value=last_palletes[line_num-1][1];
    }
};