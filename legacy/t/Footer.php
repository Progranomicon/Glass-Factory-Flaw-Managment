<?php
echo '';
?>
                </div></td>
                <td width="2px"></td>
            </tr>
        </table> 
<div style="text-align: left;background-color:#6699CC; height: 100px; color: #FFFFFF; margin: 7px;">
            Партнеры:<br>
	<a href="http://www.mordovia-sport.ru"><img src="Images/minsport.jpeg" width="200" height="65" alt="Министерство Спорта РМ"></a>&nbsp;
        <a href="http://www.tennis-russia.ru/"><img src="Images/ftr_logo.PNG"  alt="Федерация тенниса РФ"></a>
        <!--LiveInternet counter--><script type="text/javascript"><!--
document.write("<a href='http://www.liveinternet.ru/click' "+
"target=_blank><img src='//counter.yadro.ru/hit?t45.10;r"+
escape(document.referrer)+((typeof(screen)=="undefined")?"":
";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
";"+Math.random()+
"' alt='' title='LiveInternet' "+
"border='0' width='31' height='31'><\/a>")
//--></script><!--/LiveInternet-->
       </div>
        <script type="text/javascript">
    $("#LeftMenu ul").hide();
    $("#LeftMenu ul.active").show();
    $("#LeftMenu li a").click(function(){
        var checkElement = $(this).next();
        if(checkElement.is('ul')) {
            if (!checkElement.is(':visible')) {
                $('#LeftMenu ul:visible').slideUp('fast');
                checkElement.slideDown('fast');
            }else{
                checkElement.slideUp('fast');
            }
            return false;
        }
    });
</script>
    </body>
</html>