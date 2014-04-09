<?php
/*Dopisanie nowych danych do pliku z czasami */
$id = $_POST['id'];
$time = $_POST['time'];
$numberSlides = $_POST['numberSlides'];
$filename = $_POST['filename'];
$string = $numberSlides."\r\n";
for($i=0;$i<$numberSlides;$i++)
{
   $string = $string.$id[$i]."\r\n".$time[$i]."\r\n";
}
$fp = fopen('../movies/'.$filename.'/times.txt', "w+");
fputs($fp, $string);
fclose($fp);
echo "powiodlo sie";
?>