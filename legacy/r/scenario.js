var realty_objects = [];
var objectsTypes=[];
	objectsTypes[1]="Квартиры";
	objectsTypes[2]="Участки";
	objectsTypes[3]="Нежилая недвижимость";
	objectsTypes[4]="Дома";

var areas=[];
	areas[1]='Центр';
	areas[2]='Ю-з';
	areas[3]='Химмаш';
	areas[4]='Светотехстрой';
	areas[5]='Николаевка, Ялга';
	areas[16]='Чамзенка';
	areas[17]='Краснослободск';
	areas[18]='Березники';
	areas[19]='Лямбирь';
	areas[20]='Хуямбирь';
	areas[21]='Хуемников';
	areas[22]='Усть-Пиздюйск';

function ebi(str){/* ElementById*/
	return document.getElementById(str);
}
function ebn(str){/* ElementsByName*/
	return document.getElementsByName(str);
}
function selectTypeOfObjects(type){
	ebi("first_select_area").style.display = 'none';
	ebn("objects_type")[0].value=type;
	ebi("site").style.marginTop='0%';
	updateView();
}
function updateView(){ /*обновляет список*/
	ebi("objects_type").innerHTML = objectsTypes[ebn("objects_type")[0].value];
	ebi("objects_types_else").innerHTML="а еще есть ";
	for(var eln in objectsTypes){
		if (eln!==ebn("objects_type")[0].value){
			ebi("objects_types_else").innerHTML +='<a class="first_select_link" style="font-size:1em;float:none;font-family:Helvetica;" href="javascript:selectTypeOfObjects('+eln+')">'+objectsTypes[eln]+'</a> ';
		}
	}
	var area='';
	var price=0;
	var addedText='';
	ebi("objects_list").innerHTML="";
	for(var eln in realty_objects){
		if(!realty_objects.hasOwnProperty(eln)) continue;
		area=areas[realty_objects[eln].area];
		price=formatPrice(realty_objects[eln].price);
		if (area==undefined) {area='Ошибка. район: '+realty_objects[eln].area+'.';}
		if (realty_objects[eln].object_type==ebn("objects_type")[0].value){
			addedText +='<div class="list_row" onclick="callObjFullInfo('+realty_objects[eln].id+')">';
			addedText +='<div class="list_element_area">'+area+'</div> <div class="list_element_address">'+realty_objects[eln].address+'</div> <div class="list_element_price">'+price+"<del>P</del>.</div><br>";
			addedText+='</div>';			
		}
	}
	ebi("objects_list").innerHTML +=addedText;
}

function getListSelectionFromArray (ar, name){ /* Возвращает <SELECT> из массива ar c именем name */
	var retVal='<select name="'+name+'">';
	for(var eln in ar){
		if(!ar.hasOwnProperty(eln)) continue;
		retVal+='<option value="'+eln+'">'+ar[eln]+'</option>';
	}
	retVal+='</select>';
	return retVal;
}
function formatPrice (n)
{
n=n.toString();
var i = n.length;
var r="";
if (i==0)
    {
        r="0";
    }
    
    if (isNaN(n))
        {
            return "В поле \"Цена\" не число";
        }
    else 
        {
            n=n*1;
            n=n.toString();
            while(i>0)
                {
                    r=n.substr(i,3)+" "+r;
                    if(i-3<=0)
                        {
                            r=n.substring(0,i)+" "+r;
                        }
                    i-=3;
                }

            return r;
        }
}
function showObjFullInfo(){
	if (xmlHttpTOs.readyState == 4){
			//alert("Тудун!");
			ebi('full_obj_info').style.display='block';
			var response = xmlHttpTOs.responseText;
			ebi('full_obj_info').innerHTML=response;
		}
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
function callObjFullInfo(id){
		var url = "objfullinfo.php?id=" + encodeURIComponent(id);
		xmlHttpTOs.open("GET", url, true);
		xmlHttpTOs.onreadystatechange = showObjFullInfo;
		xmlHttpTOs.send(null);
}
function hideBlock(blockId){
	ebi(blockId).style.display='none';
}