function calendar(_date, left, top, callback){
		var tempDate = _date.clone();
		var left = left||100;
		var top = top||100;
		var calendarHtml = '<div id="calendar"><div id="calendarHeader">Выбор даты</div> <div style="height:300px;"> <div id="daysBlock" class="floatLeft" style="width:250px;"> </div> <div id="monthsBlock" class="floatLeft" style="width:150px;"> </div> <div id="yearsBlock" class="floatLeft" style="width:140px;"> </div>  </div> <hr>Время<br><div> <select id="hourSelector"> </select> : <select id="minuteSelector"> </select> </div> <div>Выбираемая дата:<div id="dateToApply"> </div> <input id="okButton" type="button" value="Ок"> <input id="closeButton" type="button" value="Отменить"></div> </div>';
		var calendarCSS='.floatLeft{ float:left; } #calendarHeader{font-size:24px; color:white;} .dateSelectorElem{ padding:5px; border:1px dotted gray; margin:5px; border-radius: 3px; color:#fff; background-color:#336699 ;box-shadow: 3px 3px 1px 0px #000000;  border-color:white; } .dateSelectorElem:hover{margin:8px 2px 2px 8px; padding:5px; box-shadow: 1px 1px 0px 0px #000000; cursor:pointer; } .dateSelectorElemSelected{ box-shadow: -7px -7px 0px 0px #000000; background-color:#ff3333; margin:8px 2px 2px 8px; box-shadow:none; } .dateElemDay{ width: 20px; } .dateElemMonth{ width: 30px; } .dateElemYear{ width: 35px; } #dateToApply{ font-size:1.5em; font-family:\'Helvetica\'; } .calendarDiv{ text-align:left; position:absolute; z-index:20; padding:10px; background-color:white; border: 1px solid black; border-radius: 5px; box-shadow:5px 5px 10px 3px #999; background-color:#3399cc; }';
		var months={};
		var calendarDiv;
		months[1]={"name":"янв","days":31};
		months[2]={"name":"фев","days":29};
		months[3]={"name":"мар","days":31};
		months[4]={"name":"апр","days":30};
		months[5]={"name":"май","days":31};
		months[6]={"name":"июн","days":30};
		months[7]={"name":"июл","days":31};
		months[8]={"name":"авг","days":31};
		months[9]={"name":"сен","days":30};
		months[10]={"name":"окт","days":31};
		months[11]={"name":"ноя","days":30};
		months[12]={"name":"дек","days":31};
		
		this.show=function(){
			calendarDiv = document.createElement('DIV');
			calendarDiv.style.left = left;
			calendarDiv.style.top = top;
			calendarDiv.innerHTML='<style type="text/css">'+calendarCSS+'</style>';
			calendarDiv.innerHTML+=calendarHtml;
			calendarDiv.className = 'calendarDiv';
			document.body.appendChild(calendarDiv);
			el('okButton').onclick = function(){
						return ok();
					}
			el('closeButton').onclick = function(){
						return destroy();
			}
			this.update();
		}
		this.update=function(){
			var nextElem;
			var tempHTML="";
			var elemClass="";
			var hourSelector=el('hourSelector');
			var minuteSelector=el('minuteSelector');
			el('daysBlock').innerHTML = '';
			for(var i=1;i<=months[tempDate.month()+1].days;i++){
				nextElem=document.createElement('DIV');
				if (i==tempDate.date()) elemClass="dateSelectorElem dateSelectorElemSelected";
				else elemClass="dateSelectorElem";
				nextElem.className ="floatLeft dateElemDay " + elemClass;
				nextElem.innerHTML = i;
				nextElem.onclick=function(x, tDate){
									return function(){
									tDate.date(x);
									update();
								}}(i, tempDate);
				el('daysBlock').appendChild(nextElem);
			}
			el('monthsBlock').innerHTML = "";
			for(var i=1;i<=12;i++){
				nextElem=document.createElement('DIV');
				if (i==tempDate.month()+1) elemClass="dateSelectorElem dateSelectorElemSelected";
				else elemClass="dateSelectorElem";
				nextElem.className ="floatLeft dateElemMonth " + elemClass;
				nextElem.innerHTML = months[i].name;
				nextElem.onclick=function(x, tDate){
									return function(){
									tDate.month(x-1);
									update();
								}}(i, tempDate);
				el('monthsBlock').appendChild(nextElem);
			}	
			el('yearsBlock').innerHTML = "";
			for(i=2021;i<=2030;i++){
				nextElem=document.createElement('DIV');
				if (i==tempDate.year()) elemClass="dateSelectorElem dateSelectorElemSelected";
				else elemClass="dateSelectorElem";
				nextElem.className ="floatLeft dateElemYear " + elemClass;
				nextElem.innerHTML = i;
				nextElem.onclick=function(x, tDate){
									return function(){
									tDate.year(x);
									update();
								}}(i, tempDate);
				el('yearsBlock').appendChild(nextElem);
			}				
			hourSelector.innerHTML="";
			minuteSelector.innerHTML="";
			/*hourSelector.onchange = function(x, tDate){
									return function(){
									tDate.hours(x);
									update();
								}}(hourSelector.value, tempDate);*/
			for(i=0;i<60;i++){
				if(i<24)
					if (i==tempDate.hours()) hourSelector.options[i]= new Option(i.toString(),i.toString(), false, true);
					else hourSelector.options[i]= new Option(i.toString(),i.toString(), false, false);
				if (i==tempDate.minutes()) minuteSelector.options[i]= new Option(i.toString(),i.toString(), false, true);
				else minuteSelector.options[i]= new Option(i.toString(),i.toString(), false, false);
			}

			el('dateToApply').innerHTML=tempDate.format('D MMM YYYY');
		}
		this.ok=function(){
			_date.year(tempDate.year());
			_date.month(tempDate.month());
			_date.date(tempDate.date());
			_date.minutes(el('minuteSelector').value);
			_date.hours(el('hourSelector').value);
			callback.call();
			this.destroy();
		}
		this.destroy=function(){
			document.body.removeChild(calendarDiv);
		}
		show();
	}