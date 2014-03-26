<?php
require_once('connect.php');
/*mysql_connect("localhost","root");
mysql_select_db("aus"); */

function filtruj($zmienna)
{
    if(get_magic_quotes_gpc())
        $zmienna = stripslashes($zmienna); // usuwamy slashe

	// usuwamy spacje, tagi html oraz niebezpieczne znaki
    return mysql_real_escape_string(htmlspecialchars(trim($zmienna)));
}

if (isset($_POST['rejestruj']))
{
	$login = filtruj($_POST['login']);
	$haslo1 = filtruj($_POST['haslo1']);
	$haslo2 = filtruj($_POST['haslo2']);
	$email = filtruj($_POST['email1']);
	$ip = filtruj($_SERVER['REMOTE_ADDR']);

	// sprawdzamy czy login nie jest już w bazie
	if (mysql_num_rows(mysql_query("SELECT login FROM uzytkownicy WHERE login = '".$login."';")) == 0)
	{
		if ($haslo1 == $haslo2) // sprawdzamy czy hasła takie same
		{
			mysql_query("INSERT INTO `uzytkownicy`(`login`, `haslo`, `email`, `rejestracja`, `logowanie`, `ip`)
				VALUES ('".$login."', '".md5($haslo1)."', '".$email."', '".time()."', '".time()."', '".$ip."');");

			echo "Konto zostało utworzone!";
			header("Refresh: 0; url=../zarejestrowany.html");

		}
		else echo "Hasła nie są takie same";
	}
	else echo "Podany login jest już zajęty.";
}
mysql_close($connection);
?>