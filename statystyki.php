<?php
$db = new mysqli('localhost', 'root', '', 'aus');  
$zapytanie_u = "SELECT * FROM uzytkownicy";
$zapytanie_v = "SELECT * FROM suggest";
$zapytanie_w = "SELECT SUM(id) FROM suggest";
$wynik_u = $db->query($zapytanie_u);
$wynik_v = $db->query($zapytanie_v);
$wynik_w = $db->query($zapytanie_w);
$ile_znalezionych_u = $wynik_u->num_rows;
$ile_znalezionych_v = $wynik_v->num_rows;
$row = $wynik_w->fetch_row();
$wyswietlenia = $row[0];
?>                          