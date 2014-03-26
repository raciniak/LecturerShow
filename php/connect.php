<?php
$connection = @mysql_connect('localhost', 'root')
	or die('Brak polaczenia z serwerem MySQL.<br />Błąd: '.mysql_error());
@mysql_select_db('aus', $connection)
or die('Nie mogę połączyć się z bazą danych<br />Błąd: '.mysql_error());

?>