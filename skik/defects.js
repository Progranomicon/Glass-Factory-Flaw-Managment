var defects={};
//Класс А - Критические дефекты
defects[1]={"title":"Прилип стекла", "level":"5",};
defects[2]={"title":"Стеклянная нить", "level":"5"};
//defects[3]={"title":"Пузыри, открытые на внутреннюю поверхность", "level":"3"};


//Класс Б - Опасные дефекты
defects[30]={"title":"Бой на Лере", "level":"4"};
defects[31]={"title":"Скол", "level":"4"};
defects[33]={"title":"Торцевая посечка", "level":"4"};
defects[34]={"title":"Сквозная посечка по венчику", "level":"4"};
defects[35]={"title":"Сквозная посечка под венчиком", "level":"4"};
defects[36]={"title":"Сквозная посечка по корпусу", "level":"4"};
defects[37]={"title":"Сквозная посечка по плечу", "level":"4"};
defects[38]={"title":"Сквозная посечка по дну", "level":"4"};
defects[39]={"title":"Трещина", "level":"4"};
defects[40]={"title":"Подпрессовка", "level":"4"};
defects[41]={"title":"Острый шов", "level":"4"};
defects[42]={"title":"Инородные включения с  посечками", "level":"4"};
defects[43]={"title":"Внутреннее гидростатическое давление", "level":"4"};
defects[44]={"title":"Осевая нагрузка", "level":"4"};
defects[45]={"title":"Термостойкость", "level":"4"};
defects[46]={"title":"Ударная нагрузка", "level":"4"};
defects[47]={"title":"Отжиг", "level":"4"};

//Класс В - Значительные дефекты
defects[110]={"title":"Вместимость", "level":"3"};
defects[111]={"title":"Заусенец", "level":"3"};
defects[112]={"title":"Толщина стенки", "level":"3"};
defects[113]={"title":"Толщина дна", "level":"3"};
defects[114]={"title":"Деформация венчика", "level":"3"};
defects[115]={"title":"LOF", "level":"3"};
defects[116]={"title":"Высота", "level":"3", "count":"yes"};
defects[117]={"title":"Диаметр резьбы/укупорочного кольца", "level":"3", "count":"yes"};
defects[118]={"title":"Диаметр укрепляющего кольца", "level":"3"};
defects[119]={"title":"Диаметр дублирующего кольца", "level":"3"};
defects[120]={"title":"Диаметр внутренний на х глубине", "level":"3"};
defects[121]={"title":"Диаметр внутренний минимальный в остальной части горловины", "level":"3"};
defects[122]={"title":"Диаметр/размер корпуса", "level":"3"};
defects[123]={"title":"Вогнутость", "level":"3"};
defects[124]={"title":"Выпуклость", "level":"3"};
defects[125]={"title":"Овал", "level":"3"};
defects[126]={"title":"Занижение под этикетку", "level":"3"};
defects[127]={"title":"Недопрессовка", "level":"3"};
defects[128]={"title":"Деформация корпуса", "level":"3"};
defects[129]={"title":"Деформация горла", "level":"3"};
defects[130]={"title":"Деформация дна", "level":"3"};
defects[131]={"title":"Сдвиг венчика", "level":"3", "count":"yes"};
defects[132]={"title":"Отклонение от параллельности торца венчика", "level":"3"};
defects[133]={"title":"Отклонение от перпендикулярности вертикальной оси", "level":"3"};

//Класс Г - Менее опасные дефекты
defects[200]={"title":"Пузыри закрытые", "level":"2"};
defects[201]={"title":"Пузыри открытые", "level":"2"};
defects[202]={"title":"Поверхностные посечки", "level":"2"};
defects[203]={"title":"Свиль", "level":"2", "count":"yes"};
defects[204]={"title":"Инородные включения", "level":"2", "count":"yes"};
defects[205]={"title":"Мошка", "level":"2"};
defects[206]={"title":"Грубый шов", "level":"2"};
defects[207]={"title":"Забитый шов", "level":"2"};
defects[208]={"title":"Смещение полуформ", "level":"2"};
defects[209]={"title":"Грубое сопряжение", "level":"2"};
defects[210]={"title":"Уголок", "level":"2"};
defects[211]={"title":"След от плунжера", "level":"2"};
defects[212]={"title":"Острое горло", "level":"2"};
defects[213]={"title":"Залив горла", "level":"2"};

//Класс Д - Неопасные дефекты
defects[301]={"title":"Складка", "level":"1"};
defects[302]={"title":"Морщины", "level":"1"};
defects[303]={"title":"След отреза ножниц", "level":"1"};
defects[304]={"title":"Кованность", "level":"1"};
defects[305]={"title":"Шероховатость", "level":"1"};
defects[306]={"title":"Забой по форме", "level":"1"};
defects[307]={"title":"След смазки", "level":"1"};
defects[308]={"title":"Двойной шов", "level":"1"};
defects[309]={"title":"Потертость", "level":"1"};
defects[310]={"title":"Загрязнения", "level":"1"};
defects[311]={"title":"Царапина", "level":"1"};
defects[312]={"title":"Непропечатка рисунка", "level":"1"};
defects[313]={"title":"Непропечатка маркировки", "level":"1"};
defects[314]={"title":"Неравномерный залив дна", "level":"1"};
defects[315]={"title":"Горячее напыление", "level":"1"};
defects[316]={"title":"Холодное напыление", "level":"1"};
//defects[317]={"title":"Простой", "level":"1"};

defects[666]={"title":"ERROR", "level":"1"};



var corrective_actions={}
corrective_actions[0]={title:"Норма", color:"#6f9", lvl:0, cellClass:"norma"};
corrective_actions[1]={title:"Предупреждение", color:"#999999", lvl:1, cellClass:"grey"};
corrective_actions[2]={title:"Сброс ИО и Визуал", color:"yellow", lvl:2, cellClass:"yellow"};
corrective_actions[3]={title:"MNR", color:"red", lvl:3, cellClass:"red"};

var months={}
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

var inspType = [];
inspType[1] = "Check+ #1";
inspType[2] = "Check+ #2";
inspType[3] = "MCAL";
inspType[4] = "Multi";

var SFM_actions = [];
SFM_actions[1] = "Замена черновой формы";
SFM_actions[2] = "Замена горлового кольца";
SFM_actions[3] = "Замена чистовой формы";
SFM_actions[4] = "Замена чернового затвора";
SFM_actions[5] = "Замена плунжера";
SFM_actions[6] = "Замена воронки";
SFM_actions[7] = "Замена хватков";
SFM_actions[8] = "Замена лопатки переставителя";
SFM_actions[9] = "Корректировка циклограммы";
SFM_actions[10] = "Замена дутьевой головки";
SFM_actions[11] = "Корректировка температуры капли";
SFM_actions[12] = "Замена лотка";
SFM_actions[13] = "Замена дефлектора";
SFM_actions[14] = "Замена лезвий";
SFM_actions[15] = "Корректировка скорости машины";
SFM_actions[16] = "Корректировка загрузки капли";
SFM_actions[17] = "Ручная регулировка механизмов";
SFM_actions[18] = "Изменение цикла смазки";

var dReasons = [];
dReasons[1] = "Замена керамической чаши";
dReasons[2] = "Замена керамического бушинга";
dReasons[3] = "Замена керамического плунжера";
dReasons[4] = "Замена керамического очка";
dReasons[5] = "Ремонт механизма бушинга";
dReasons[6] = "Ремонт механизма плунжера";
dReasons[7] = "Ремонт механизма отреза капли";
dReasons[8] = "Ремонт каплераспределителя";
dReasons[9] = "Ремонт каплепроводящей системы";
dReasons[10] = "Ремонт главного конвейера";
dReasons[11] = "Ремонт углового переставителя";
dReasons[12] = "Ремонт поперечного конвейера";
dReasons[13] = "Ремонт стакера";
dReasons[14] = "Ремонт системы автоматического сдува форм с СФМ";
dReasons[15] = "Отсутствие подачи сжатого воздуха на СФМ";
dReasons[16] = "Отсутствие подачи питающего напряжения на СФМ";
dReasons[17] = "Отсутствие подачи газа на обогрев канала питателя";
dReasons[18] = "Отсутствие подачи воздуха высокого давления на охлаждение форм";
dReasons[19] = "Плановые профилактические работы на СФМ";
dReasons[20] = "Авария на стекловаренной печи";
