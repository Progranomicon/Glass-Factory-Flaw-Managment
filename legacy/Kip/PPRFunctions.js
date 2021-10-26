//Kudashkin Nikita. 2012. Qdashkin(at)pochta.ru
function ViewEq(ListIndex){
   var text="";
   text+='<SELECT name="Equipment">';
   for (var i = 0, length = PPREq.length; i < length; i++) {
       
        if((PPREq[i][0]*1)>=(ListIndex*100) &  (PPREq[i][0]*1)<((ListIndex*1+1)*100))
                {
                     //alert(ListIndex+1);
                   text+='<option value="'+PPREq[i][0]+'">'+PPREq[i][1]+'</option>';
                }
    }  
     text+='</SELECT>';
   document.getElementById('EqSelectByArea').innerHTML=text;

}

var xmlHttpTOs = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttpTOs = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttpTOs = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttpTOs = false;
  }
}
@end @*/
if (!xmlHttpTOs && typeof XMLHttpRequest != 'undefined') {
  xmlHttpTOs = new XMLHttpRequest();
}

function CallTOs() 
{
  // Создать URL для подключения
  var Area = document.getElementById("EqArea");
  var Date = document.getElementById("TODateYear")[document.getElementById("TODateYear").selectedIndex].value ;
  var url = "AJAXGetTOs.php?Area=" + encodeURIComponent(Area.value)+'&DateY='+encodeURIComponent(Date)+'&DateM='+document.getElementById("TODateMonth").value+'&AreaNum='+document.getElementById("EqAreaNum").value;
    // Открыть соединение с сервером
  xmlHttpTOs.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttpTOs.onreadystatechange = ShowTOs;

  // SПередать запрос
  xmlHttpTOs.send(null);
}
function ShowTOs()
{
  if (xmlHttpTOs.readyState == 4) {
    var response = xmlHttpTOs.responseText;
    document.getElementById("AlreadyExist").innerHTML=response;
  }
}

/* Ниже следуют функции для регламента  ----------------------------------------*/


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

function CallRules(EqNum) 
{
  // Создать URL для подключения
  var url = "AJAXGetRules.php?EqNum=" + encodeURIComponent(EqNum);
    // Открыть соединение с сервером
  xmlHttp.open("GET", url, true);

  // Установить функцию для сервера, которая выполнится после его ответа
  xmlHttp.onreadystatechange = ShowRules;

  // SПередать запрос
  xmlHttp.send(null);
}
function ShowRules()
{
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    document.getElementById("RulesList").innerHTML=response;
  }
}
function ViewEqRules(ListIndex){
   var text="";
   text+='<SELECT name="Equipment" onchange="CallRules(this.options[this.selectedIndex].value);">';
   for (var i = 0, length = PPREq.length; i < length; i++) {
       
        if((PPREq[i][0]*1)>=(ListIndex*100) &  (PPREq[i][0]*1)<((ListIndex*1+1)*100))
                {
                     //alert(ListIndex+1);
                   text+='<option value="'+PPREq[i][0]+'">'+PPREq[i][1]+'</option>';
                }
    }  
     text+='</SELECT>';
   document.getElementById('EqSelectByArea').innerHTML=text;

}
function ShowAddForm(){
    document.getElementById('AddFormDiv').innerHTML=' <a href="javascript:ClearF()">Скрыть</a><br>\n\
ТО : \n\
                        <SELECT name="TONum">\n\
                        <option selected value=1>ТО-1</option>\n\
                        <option value=2>ТО-2</option>\n\
                        </SELECT><br>\n\
                        Описание работы: <textarea placeholder="Суть задачи" cols="58" rows="6" name="RuleIs"></textarea>\n\
                        <input id="Submit" type="submit"  value="Добавить">';
}

function ClearF(){
   document.getElementById('AddFormDiv').innerHTML='<a href="javascript:ShowAddForm()">Добавить</a>';
}