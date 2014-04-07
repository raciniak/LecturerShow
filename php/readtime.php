<?php
/*Php odpowiedzialny za czytanie czasow i numerow slajdow z pliku*/
$namefile = $_POST['namefile'];
$fp = fopen($namefile, "r");
$tekst = fread($fp,filesize($namefile));
	echo $tekst;
?>