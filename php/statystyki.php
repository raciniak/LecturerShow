<?php
	require_once("connect_mysqli.php");
	$zapytanie_u = "SELECT * FROM users";
	$zapytanie_v = "SELECT * FROM movies";
	$zapytanie_w = "SELECT SUM(Wyswietlenia) FROM movies";
	$wynik_u = $db -> query($zapytanie_u);
	$wynik_v = $db -> query($zapytanie_v);
	$wynik_w = $db -> query($zapytanie_w);
	$ile_znalezionych_u = $wynik_u->num_rows;
	$ile_znalezionych_v = $wynik_v->num_rows;
	$row = $wynik_w->fetch_row();
	$wyswietlenia = $row[0];
	$err = array('liczba_uzytkownikow'=>$ile_znalezionych_u, 'liczba_filmow'=>$ile_znalezionych_v, 'liczba_wyswietlen'=>$wyswietlenia);
	echo json_encode($err);
?>                          