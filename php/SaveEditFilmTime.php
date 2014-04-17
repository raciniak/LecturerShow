<?php
/*Dopisanie nowych danych do pliku z czasami odtwarzania filmu*/
$time = $_POST['time'];
$filename = $_POST['filename'];
$string='';
for($i=0;$i<2;$i++)
{
   $string = $string.$time[$i]."\r\n";
}
$fp = fopen('../res/'.$filename.'/timesMovie.txt', "w+");
fputs($fp, $string);
fclose($fp);
echo "powiodlo sie";
?>