<?php
/*Php odpowiedzialny za zapisywanie nowych slajdów wyłapywanych przez usera*/
//$namefile = $_POST['namefile'];
//$fp = fopen($namefile, "r");
//$tekst = fread($fp,filesize($namefile));
$filename = $_POST['filename'];
$upload_dir ='../movies/'.$filename.'/images/';
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$numberslide = $_POST['numberSlide'];
$file = $upload_dir.$numberslide.'.png';
$success = file_put_contents($file, $data);
echo "udalo sie";

$fp = fopen('../movies/'.$filename.'/times.txt', "a");
fwrite($fp, "\r\n".$numberslide);
fwrite($fp, "\r\n".'0');
//$tekst = fread($fp,filesize($namefile));
?>