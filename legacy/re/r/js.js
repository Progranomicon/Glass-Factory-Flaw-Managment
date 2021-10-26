function step1(item_t){
    var text;
    var elem=document.getElementById('step2');  
    document.getElementById('step3').innerHTML='';
    text='';
    text+='<Select name="goal" onchange="step2(this.options[this.selectedIndex].value, '+item_t+');">\n\
            <option selected value="0">-Ваша цель-</option>';

    text+='<option value="1">Продать</option>';
      
    if (item_t==1 | item_t==2|item_t==5){
         text+=' <option value="2">Сдать посуточно</option>';
    }
    if (item_t==1 | item_t==2 | item_t==4|item_t==5){
         text+=' <option value="3">Сдать долгосрочно</option>';
    }
    
    text+='</select>';
    if (item_t==0){
         text='';
         document.getElementById('step3').innerHTML='';
         document.getElementById('step2').innerHTML='';
    }
    if (item_t!=0){
       elem.innerHTML='<IMG SRC="step2.PNG" style="float:left; z-index: 3;"><br>'+text+'<br><br>'; 
    }
    
}
function step2(item_t /*текущий*/, item_p /*предыдущий*/)
{
    var text;
    var elem=document.getElementById('step3');
    text='';	
	if (item_p==1)
	{
		text+=' <Select name="house_type" > \n\
					<option selected value="0">-Тип дома-</option>\n\
					<option value="1">Монолитный</option> \n\
					<option value="2">Кирпичный</option>\n\
					<option value="3">Панельный</option>\n\
					<option value="4">Блочный</option>\n\
                                        <option value="5">Деревянный</option>\n\
				</select><br><br>';
		text+='<Select name="rooms_count" > \n\
					<option selected value="0">-Сколько комнат-</option>\n\
					<option value="1">1</option> \n\
					<option value="2">2</option>\n\
					<option value="3">3</option>\n\
					<option value="4">4+</option>\n\
				</select><br><br>';
		text+='Общая площадь : <input  type="text" name="S" value="50"> м<sup>2</sup>.<br><br>';
		text+='Жилая площадь: <input  type="text" name="LiveS" value="40"> м<sup>2</sup>.<br><br>';
		text+='Площадь кухни: <input  type="text" name="KitchenS" value="6"> м<sup>2</sup>.<br><br>';
		text+=print_floor_and_number_of_storeys();
				text+=' <label> Новостройка <input name="hands" type="radio" value=1 ></label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp \n\
						<label> Вторичное <input name="hands" type="radio" value=2 checked></label>\n\
					<br><br>';
	}
	if (item_p==2)
    {
        text+=' <Select name="house_type" > \n\
					<option selected value="0">-Материал стен-</option>\n\
					<option value="11">Кирпич</option> \n\
					<option value="12">Дерево</option>\n\
					<option value="13">Другой</option>\n\
				</select><br><br>';
		text+='<Select name="rooms_count" > \n\
					<option selected value="0">-Сколько комнат-</option>\n\
					<option value="1">1</option> \n\
					<option value="2">2</option>\n\
					<option value="3">3</option>\n\
					<option value="4">4+</option>\n\
				</select><br><br>';
		text+='Общая площадь : <input id=Price type="text" name="S" value="100"> м<sup>2</sup>.<br><br>';
		text+='Жилая площадь: <input id=Price type="text" name="LiveS" value="70"> м<sup>2</sup>.<br><br>';
		text+='Площадь кухни: <input id=Price type="text" name="KitchenS" value="10"> м<sup>2</sup>.<br><br>';
		text+='Количество этажей: <Select name="number_of_storeys" > \n\
					<option selected value="0">-этажность-</option>\n\
					<option value="1">1</option>\n\
					<option value="2">2</option>\n\
					<option value="3">3</option>\n\
					<option value="4">4</option>\n\
				</Select> .<br><br>';
    }
	if (item_p==3)
	{
		text+='Общая площадь : <input id=Price type="text" name="S" value="15"> соток.<br><br>';
	}
	if (item_p==4)
	{
		text+=' <Select name="house_type" > \n\
					<option selected value="0">-Тип объекта-</option>\n\
					<option value="1">Офис</option> \n\
					<option value="2">Склад</option>\n\
					<option value="3">Торговые помещения</option>\n\
					<option value="4">Другое</option>\n\
				</select><br><br>';
		text+='Общая площадь : <input id=S type="text" name="S" value="50"> м<sup>2</sup>.<br><br>';
		text+=print_floor_and_number_of_storeys();
	}
        if (item_p==5)
	{
		text+=' Комната в <Select name="hostel_type" > \n\
					<option selected value="0">-Тип объекта-</option>\n\
					<option value="1">Общежитии секционного типа</option> \n\
					<option value="2">Общежитии коридорного типа</option>\n\
					<option value="3">Квартире</option>\n\
				</select><br><br>';
		text+='Общая площадь : <input type="text" name="S" value="50"> м<sup>2</sup>.<br><br>';
		text+=print_floor_and_number_of_storeys();
				text+='<br><br>';
	}
    if (item_t==1)
    {
         text+='Цена: <input id=Price type="text" name="Price" value="0" onInput="document.getElementById('+"'"+'formatedPrice'+"'"+').innerHTML=formatSumm(this.value)"> рублей.<br><br>';
    }
    if (item_t==2)
    {
         text+='Цена: <input id=Price type="text" name="Price" value="0"> рублей за сутки.<br><br>';
    }
    if (item_t==3)
    {
         text+='Цена: <input id=Price type="text" name="Price" value="0"> рублей за месяц.<br><br>';
    }
    text+='<span id="formatedPrice">0</span> Р. <br><br>';
    text+='Дополнительные сведения <br>\
<textarea placeholder="Что на ваш взгляд нам еще важно знать о вашем объекте" cols="58" rows="6" name="comment"></textarea><br><br>';
	text+='Адрес <br>\
<textarea placeholder="Адрес, где находится объект" cols="58" rows="6" name="address"></textarea><br><br>';
	text+='Телефон: <input  type="text" name="phone" value=""><br><br>';
	text+='Альтернативный телефон: <input  type="text" name="phone2" value=""> <br><br>';
	text+='Электропочта: <input  type="text" name="email" value="aaa@bbb.ru"> <br><br>';
	text+='<input  type="submit" value="Отправить"><br></form><br>';
    elem.innerHTML='<IMG SRC="step3.PNG" style="float:left; z-index: 4;"><br>'+text;
    if (item_t==0)
    {
         document.getElementById('step3').innerHTML='';
    }
}

function print_floor_and_number_of_storeys()
{
	return 'Этаж: <Select name="floor" > \n\
					<option selected value="0">-этаж-</option>\n\
					<option value="1">1</option> \n\
					<option value="2">2</option>\n\
					<option value="3">3</option>\n\
					<option value="4">4</option>\n\
					<option value="5">5</option>\n\
					<option value="6">6</option>\n\
					<option value="7">7</option>\n\
					<option value="8">8</option>\n\
					<option value="9">9</option>\n\
					<option value="10">10</option>\n\
					<option value="11">11</option>\n\
					<option value="12">12</option>\n\
					<option value="13">13</option>\n\
					<option value="14">14</option>\n\
					<option value="15">15</option>\n\
					<option value="16">16</option>\n\
					<option value="17">17</option>\n\
					<option value="18">18</option>\n\
					<option value="19">19</option>\n\
					<option value="20">20</option>\n\
					<option value="21">21</option>\n\
					<option value="22">22</option>\n\
				</select> \n\
				в <Select name="number_of_storeys" > \n\
					<option selected value="0">-этажность-</option>\n\
					<option value="1">1-но</option> \n\
					<option value="2">2-ух</option>\n\
					<option value="3">3-х</option>\n\
					<option value="4">4-х</option>\n\
					<option value="5">5-ти</option>\n\
					<option value="6">6-ти</option>\n\
					<option value="7">7-ми</option>\n\
					<option value="8">8-ми</option>\n\
					<option value="9">9-ти</option>\n\
					<option value="10">10-ти</option>\n\
					<option value="11">11-ти</option>\n\
					<option value="12">12-ти</option>\n\
					<option value="13">13-ти</option>\n\
					<option value="14">14-ти</option>\n\
					<option value="15">15-ти</option>\n\
					<option value="16">16-ти</option>\n\
					<option value="17">17-ти</option>\n\
					<option value="18">18-ти</option>\n\
					<option value="19">19-ти</option>\n\
					<option value="20">20-ти</option>\n\
					<option value="21">21-но</option>\n\
					<option value="22">22-ух</option>\n\
				</select> этажном доме<br><br> ';
}function formatSumm (n)
{
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
                //alert(LiteralSum(r));
            return r;
        }
}
function LiteralSum(n){
    var arr={1:{
                1:"один",
                2:"два",
                3:"три",
                4:"четыре",
                5:"пять",
                6:"шесть",
                7:"семь",
                8:"восемь",
                9:"девять"},
             2:{1:"десять",
                11:"одинадцать",
                12:"двенадцать",
                13:"тринадцать",
                14:"четырнадцать",
                15:"пятнадцать",
                16:"шестнадцать",
                17:"семнадцать",
                18:"восемнадцать",
                19:"девятнадцать",
                2:"двадцать",
                3:"тридцать",
                4:"сорок",
                5:"пятьдесят",
                6:"шестьдесят",
                7:"семьдесят",
                8:"восемьдесят",
                9:"девяносто"},
            3:{
                1:"сто",
                2:"двести",
                3:"триста",
                4:"четыреста",
                5:"пятьсот",
                6:"шестьсот",
                7:"семьсот",
                8:"восемьсот",
                9:"девятьсот"},
            4:{
                1000:{1:"тысяча",
                     2:"тысячи",
                     5:"тысяч"},
               1000000:{1:"миллион",
                     2:"миллиона",
                     5:"миллионов"}}};
      var res;
      var strings=n.split(" ");
      var i=strings.length;
      return  res;
}
