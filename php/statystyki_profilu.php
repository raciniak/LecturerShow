<?php
	require_once("connect_mysqli.php");
	
	$zapytanie_ilosc_filmow = "SELECT * FROM movies WHERE Autor='".$_SESSION['login']."'";
	$zapytanie_srednia_ocen = "SELECT AVG(Ocena) FROM movies WHERE Autor='".$_SESSION['login']."'"; 
	$zapytanie_ilosc_wyswietlen = "SELECT SUM(Wyswietlenia) FROM movies WHERE Autor='".$_SESSION['login']."'";
	$wynik_ilosc_filmow = $db -> query($zapytanie_ilosc_filmow);
	$wynik_srednia_ocen = $db -> query($zapytanie_srednia_ocen);
	$wynik_ilosc_wyswietlen = $db -> query($zapytanie_ilosc_wyswietlen);
	$ilosc_filmow = $wynik_ilosc_filmow -> num_rows;
	$row1 = $wynik_srednia_ocen->fetch_row();
	$srednia_ocen = round($row1[0],2);
	$row = $wynik_ilosc_wyswietlen->fetch_row();
	$wyswietlenia = round($row[0]);
	$err = array('ilosc_filmow'=>$ilosc_filmow,'ilosc_wyswietlen'=>$wyswietlenia, 'srednia_ocen'=>$srednia_ocen);
	echo json_encode($err);
?>    