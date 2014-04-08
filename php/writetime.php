<?php
/*Dopisanie nowych danych do pliku z czasami */
$fp = fopen('../movies/'.$filename.'/times.txt', "a");
fwrite($fp, "\r\n".$numberslide);
fwrite($fp, "\r\n".'0');
?>