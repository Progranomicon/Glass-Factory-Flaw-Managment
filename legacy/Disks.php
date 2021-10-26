<?php
    $i = 'a';
for($n=0; $n<25; $n++)
{
    ++$i;
    //$drive = $i.":/";
    if(@scandir($i.":/")) echo $i.":\<br><br>";
}
?> 