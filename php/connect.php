<?php
$connection = @mysql_connect('localhost', 'lshow','miras')
	or die('Brak polaczenia z serwerem MySQL.<br />Błąd: '.mysql_error());

@mysql_select_db('lshow', $connection)
or die('Nie mogę połączyć się z bazą danych<br />Błąd: '.mysql_error());

?>