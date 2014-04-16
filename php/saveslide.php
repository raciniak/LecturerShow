<?php
/*Php odpowiedzialny za zapisywanie nowych slajdów wyłapywanych przez usera*/
$filename = $_POST['filename'];
$upload_dir ='../movies/'.$filename.'/';
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$numberslide = $_POST['numberSlide'];
$path = $_POST['path'];
$file = $upload_dir.$path.'.png';
$success = file_put_contents($file, $data);

/*Dopisanie nowych danych do pliku z czasami */
$fp = fopen('../movies/'.$filename.'/times.txt', "r+");
//$tekst = file('../movies/'.$filename.'/times.txt')
$tekst = file('../movies/'.$filename.'/times.txt');
$tekst[0]= $numberslide;
$tekst[2*$numberslide-1]=$path;
$tekst[2*$numberslide]='0';
$string = '';
for($i=0;$i<count($tekst);$i++)
{
   $string = $string.trim($tekst[$i])."\r\n";
}
fputs($fp, $string);
fclose($fp);
echo "ok";
?>