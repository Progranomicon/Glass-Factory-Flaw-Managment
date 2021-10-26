 function callPopupList() {
 var str=document.getElementById("product_ss").value;
 var vhojd=0;
  document.getElementById("popup_list").style.display = 'block';
    document.getElementById("popup_list").style.visibility = 'visible';
    var PopupHTML="";
    for (var i = 0, length = Production.length; i < length; i++) {
    if (i in Production) {
		
        if(Production[i][3].toLowerCase().indexOf( str.toLowerCase(), 0)>=0)
            {
                PopupHTML+='<a href="javascript:apply_specs(\''+ Production[i][0].toString()+"', '" + Production[i][1] + '\', \''+ Production[i][2]+'\', \''+ Production[i][3]+'\', \''+ Production[i][4]+'\', \''+ Production[i][5]+'\', \''+ Production[i][6]+'\', \''+ Production[i][7]+'\');">'+ get_podsvet(Production[i][3], str)+' ('+Production[i][4]+' шт., '+Production[i][6]+' )</a><br>';
                vhojd++;
            }
    }
    }
    if (vhojd==0) PopupHTML+='Нет фосматов с "'+str+'"';
    document.getElementById("popup_list").innerHTML=PopupHTML;
}

function apply_specs (id_s,  type_s, color_s, product_s, count_s, size_s, boxing_s, MorePics){
    document.getElementById("id_s").value=id_s;
    document.getElementById("type_s").innerHTML=type_s;
    document.getElementById("color_s").innerHTML=color_s;
    document.getElementById("product_s").innerHTML='<A HREF="javascript:show_input();">'+product_s+'</A>';
    document.getElementById("count_s").innerHTML=count_s;
    document.getElementById("size_s").innerHTML=size_s;
    document.getElementById("boxing_s").innerHTML=boxing_s;
    if (MorePics==1) document.getElementById("MorePics").innerHTML='<img SRC="/img/MorePics.png"><br>';
    else document.getElementById("MorePics").innerHTML='';
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
    var prod;
    if (last_palletes[line_num-1][2]!=document.getElementById("id_s").value)
    {
        for (var i = 0, length = Production.length; i < length; i++) {
        if (i in Production) {
            if(Production[i][0]==last_palletes[line_num-1][2])
            {
               prod=Production[i][3];
            }
		}
    }
        document.getElementById("warning_s").innerHTML="<FONT color=red Size=4 >Внимание! Нумерация начнется с единицы.<br> Формат для <b>линии №"+document.getElementById("line_input").value+" </b>был изменен! Сейчас там <b>\""+prod+"\"</b></font>";
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
function get_podsvet(where, what)
	{
	var pos, how_many;
	var podsvet='No insertions. Нет вхождений';
		if (what=="") return where;
		if(where.toLowerCase().indexOf( what.toLowerCase(), 0)>=0)
		{
			pos=where.toLowerCase().indexOf( what.toLowerCase(), 0)
			how_many=what.length;
			podsvet=where.substr(0,pos)+'<span style="color: white; background-color:blue;">'+where.substr(pos,how_many)+'</span>'+where.substr(pos+how_many,where.length);
		}
		return podsvet;
	}