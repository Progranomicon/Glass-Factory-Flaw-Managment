<?php
session_start();
echo '<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    </head>
    <body style="text-align: center; font-family:  Helvetika;">';

if($_SESSION['auth']!=true)
    {
         echo '<span style="font-size: 1.5em; color:  deepblue; font: bold;">Введите код</span><a href="adminimum.php"> здесь</a><br>';
         echo '</body>
        </html>';
         return ;
    }
    else
    {
?>
        <br>
        <br><br><br>
        <span style="font-size: 2em; color: darkgreen; font: bold; text-transform: uppercase; font-family:sans-serif;">Добавить видео</span><br>
        <form action="sql_works.php" method="POST">
            <br>
            <table align="center">
                <tr>
                    <td style="text-align: right;">
                        Название/заголовок видео 
                    </td>
                    <td>
                        <input type="hidden" name="video">
                        <input type="text" name="title" style="width: 380px;"><br>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;">
                        Ссылка с YouTube 
                    </td>
                    <td>
                        <input type="text" name="youtube_link" style="width: 380px;"><br>
                    </td>
                </tr>
                <tr>
                    <td>
                        Сопроводительный текст (можно не вводить) 
                    </td>
                    <td>
                        <textarea placeholder="Комментарий для отображения под видео" cols="58" rows="8" name="comment"></textarea><br>
                    </td>
                </tr>
            </table>
        <input type="submit" value="Добавить"><br>
        <span style="font-size: 10px; color:  #666; font: bold;">Kron © 2012</span>
        </form>
<?php
    }
echo '</body>
</html>';
?>
