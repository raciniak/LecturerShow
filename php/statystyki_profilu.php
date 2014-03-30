<?php
	require_once("connect_mysqli.php");
	
	$zapytanie_ilosc_filmow = "SELECT * FROM movies WHERE Autor='".$SESSION['login']."'";
	$zapytanie_v = "SELECT * FROM movies";
	$zapytanie_ilosc_wyswietlen = "SELECT SUM(Wyswietlenia) FROM movies WHERE Autor='".$SESSION['login']."'";
	$wynik_ilosc_filmow = $db -> query($zapytanie_ilosc_filmow);
	$wynik_v = $db -> query($zapytanie_v);
	$wynik_ilosc_wyswietlen = $db -> query($zapytanie_ilosc_wyswietlen);
	$ilosc_filmow = $wynik_ilosc_filmow->num_rows;
	$ile_znalezionych_v = $wynik_v->num_rows;
	$row = $wynik_ilosc_wyswietlen->fetch_row();
	$wyswietlenia = $row[0];
	$err = array('ilosc_filmow'=>$ilosc_filmow,'ilosc_wyswietlen'=>$wyswietlenia);
	echo json_encode($err);
?>    