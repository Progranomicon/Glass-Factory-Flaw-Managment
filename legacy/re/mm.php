<?php
?>
	<div id="MenuArea" >
		<div class="TopMenuItem TopMenuItemSelected" onclick="mMC(this)" group="iWant">Я хочу</div>
		<div class="TopMenuItem" onclick="mMC(this)" group="orgs">Организации</div>
		<div class="TopMenuItem" onclick="mMC(this)" group="usefInf">Полезная информация</div>
		<div class="TopMenuItem" onclick="mMC(this)" group="building">Строительство</div>
		<div class="TopMenuItem" onclick="mMC(this)" group="search">Поиск</div>
	</div>
	<div id="menu2">
		<div id="iWant"><div class="menuItem" onclick="go(1);">Купить</div><div class="menuItem">Продать</div><div class="menuItem">Снять</div><div class="menuItem">Сдать</div><div class="menuItem">Все объявления</div></div>
		<div id="orgs" style="display:none"><div class="menuItem">РегПалата/БТИ</div><div class="menuItem">Застройщики</div><div class="menuItem">Агенства</div><div class="menuItem">Юр.Фирмы</div><div class="menuItem">Банки</div><div class="menuItem">Оценщики</div><div class="menuItem">Другое</div></div>
		<div id="usefInf" style="display:none"><div class="menuItem">Статьи</div><div class="menuItem">Консультации</div><div class="menuItem">Типовые договоры</div></div>
		<div id="building" style="display:none"><div class="menuItem">Ремонт</div><div class="menuItem">Дизайн</div><div class="menuItem">Уборка</div><div class="menuItem">Грузоперевозки</div></div>
		<div id="search" style="display:none"><div class="menuItem">Поиск будет здесь</div></div>
	</div>
	<script type="text/javascript">
		function mMC(el){ /*Main menu click*/
			cNodes=el.parentNode.childNodes;
			for(i=0;i<cNodes.length;i++){
			cNodes[i].className="TopMenuItem";
			}
			el.className="TopMenuItem TopMenuItemSelected";
			var m2Nodes= ebi('menu2').childNodes;
			for(var i in m2Nodes){
				if (m2Nodes[i].nodeType == 1) m2Nodes[i].style.display="none";
			}
			ebi(el.getAttribute('group')).style.display='block';
		}
	</script>
