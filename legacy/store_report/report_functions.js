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
function callHistory(SN, ClickId) 
{
  ClickXY = GetElementPosition(ClickId);
    var left = ClickXY.left;
    var top = ClickXY.top;
    var width = ClickXY.width;
  document.getElementById("popup_list").style.left=left+width+22;
  document.getElementById("popup_list").style.top=top+9;
  document.getElementById("popup_list").style.display = 'block';
  document.getElementById("popup_list").style.visibility ='visible';
  // Создать URL для подключения
  var url = "AjaxPalletHistory.php?SN=" + encodeURIComponent(SN);
    // Открыть соединение с сервером
  xmlHttp_popup.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttp_popup.onreadystatechange = UpdateAndShowHistory;

  // SПередать запрос
  xmlHttp_popup.send(null);
}
function UpdateAndShowHistory()
{
  if (xmlHttp_popup.readyState == 4) {
    
    var response = xmlHttp_popup.responseText;
    document.getElementById("popup_list").innerHTML=response;
    document.getElementById("popup_list").style.visibility='visible';

  }
}
/*==========================================================Всплыв Исполнителей========================================================*/
function PopupExecutors()
{ 
    var str=document.getElementById("Executor").value;
    document.getElementById("popup_list").style.left = 570;
    document.getElementById("popup_list").style.top = 200;
    document.getElementById("popup_list").style.display = 'block';
    document.getElementById("popup_list").style.visibility = 'visible';
    var PopupHTML="";
    PopupHTML+='<a href="javascript:SelectExecutor(\'По всем\',\'\')";>По всем</a><hr>';
    for (var i = 0, length = executors.length; i < length; i++) {
    if (i in executors) {
        if(executors[i][1].toLowerCase().indexOf( str.toString().toLowerCase(), 0)==0)
            {
                PopupHTML+='<a href="javascript:SelectExecutor(\''+ executors[i][1]+"'," + executors[i][0] + ');">'+ executors[i][1]+'</a><br>';
            }
    }
    }
    document.getElementById("popup_list").innerHTML=PopupHTML;
}
function SelectExecutor(m,n)
{
    document.getElementById("Executor").value = m.toString();
    document.getElementById("HExecutor").value = n;
    document.getElementById("popup_list").style.display = 'none';
    
}
/*=========================================================Всплыв форматов продукции=============================================*/
function PopupProduction()
{
    var str=document.getElementById("ProductCode").value;
    document.getElementById("popup_list").innerHTML='';
    document.getElementById("popup_list").style.left = 370;
    document.getElementById("popup_list").style.top = 200;
    document.getElementById("popup_list").style.display = 'block';
    document.getElementById("popup_list").style.visibility = 'visible';
    var PopupHTML="";
    PopupHTML+='<a href="javascript:SelectProduction(\'По всей \',\'\')";>По всей</a><hr>';
    for (var i = 0, length = Production.length; i < length; i++) {
    if (i in Production) {
        if(Production[i][1].indexOf( str, 0)==0)
            {
                PopupHTML+='<a href="javascript:SelectProduction(\''+ Production[i][1]+"'," + Production[i][0] + ');">'+ Production[i][1]+' ('+Production[i][3]+' шт., '+Production[i][2]+' )</a><br>';
            }
    }
    }
    document.getElementById("popup_list").innerHTML=PopupHTML;
}
function SelectProduction(m,n)
{
    document.getElementById("ProductCode").value = m.toString();
    document.getElementById("HProduct").value = n.toString();
    document.getElementById("popup_list").style.display = 'none';
    
}
function ClearF(n)
{
    if (n==1) 
        {document.getElementById("Executor").value='';
        PopupExecutors();    
        }
    if (n==2) 
        {document.getElementById("ProductCode").value='';
        PopupProduction();
        }
}
function HideHistory()
{
    document.getElementById('popup_list').style.visibility = 'hidden';
    document.getElementById('popup_list').innerHTML='';
}
function GetElementPosition(elemId)
{
    var elem = document.getElementById(elemId);
	
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
	
    var l = 0;
    var t = 0;
	
    while (elem)
    {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return {"left":l, "top":t, "width": w, "height":h};
}
function StoreClick(){
    if ( document.getElementById('StoreOnly').checked){
        document.forms[0].elements[11].disabled = true ;
    }
    else{
        document.forms[0].elements[11].disabled = false;
    }
}