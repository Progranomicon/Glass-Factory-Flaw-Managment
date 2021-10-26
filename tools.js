function exist(a){
	if(typeof(a)=='undefined'){
		return false;
	}else{
		return true;
	}
	
}

function log(text){
	var date = new Date();
	el('log').innerHTML=date + '>'+text+'<<br><br>'+el('log').innerHTML;
}
function highlight(where, what){
	var pos, how_many;
	var podsvet='No insertions. Нет вхождений';
		if (what=="") return where;
		if(where.toLowerCase().indexOf( what.toLowerCase(), 0)>=0){
			pos=where.toLowerCase().indexOf( what.toLowerCase(), 0)
			how_many=what.length;
			podsvet=where.substr(0,pos)+'<span style="background-color:lightblue; color:black;">'+where.substr(pos,how_many)+'</span>'+where.substr(pos+how_many,where.length);
		}
	return podsvet;
}
function el(id){
	return document.getElementById(id);
}
function jstr(obj){
	return JSON.stringify(obj);
}
function validateFloatInput(str){
	var pos;
	var result=str;
		if(str.indexOf(',', 0)>=0){
			pos=str.indexOf(',', 0);
			result=str.substr(0,pos)+'.'+str.substr(pos+1,str.length+1);
		}
	return result;
}
function normF(f, n){
    var power = Math.pow(10, n || 2);
    return String(Math.round(f * power) / power);
}
function makeDiv(cls, id){
	var div = document.createElement('DIV');
	var cls = cls || '';
	var id = id || '';
		if(id!=''){
			div.id = id;
		}
		div.classname = cls;
		return div;
}
function objSize(obj){
	return Object.keys(obj).length;
}
function machineIterator(f, machine){
	for(var sec=1; sec<11; sec++){
		for(var pos=1; pos<11; pos++){
			if (machine[sec])
				if(machine[sec][pos])
					f.call(machine[sec][pos]);
		}
	}
}
function momentToDate(mom){ // utc format
	return Date.UTC(mom.years(), mom.months(), mom.dates(), mom.hours(), mom.minutes());
}
function in_array(value, array) {
    for(var i = 0; i < array.length; i++) 
    {
        if(array[i] == value) return true;
    }
    return false;
}