<?php
$namefile = $_POST['namefile'];
$fp = fopen($namefile, "r");
$tekst = fread($fp,filesize($namefile));
	echo $tekst;
?>