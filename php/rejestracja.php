<?php
require_once('connect.php');
/*mysql_connect("localhost","root");
mysql_select_db("aus"); */

if (isset($_POST['rejestruj']))
{
	$login = $_POST['login'];
	$haslo1 = $_POST['haslo1'];
	$haslo2 = $_POST['haslo2'];
	$email = $_POST['email1'];
	$imie = $_POST['imie'];
	$nazwisko = $_POST['nazwisko'];


	// sprawdzamy czy login nie jest już w bazie
	if (mysql_num_rows(mysql_query("SELECT Login FROM users WHERE Login = '".$login."';")) == 0)
	{
		if ($haslo1 == $haslo2) // sprawdzamy czy hasła takie same
		{
			mysql_query("INSERT INTO `users`(`Login`, `Haslo`, `Mail`, `Imie`, `Nazwisko`)
				VALUES ('".$login."', '".md5($haslo1)."', '".$email."', '".$imie."', '".$nazwisko."');");

			echo "Konto zostało utworzone!";
			header("Refresh: 0; url=../zarejestrowany.html");

		}
		else echo "Hasła nie są takie same";
	}
	else echo "Podany login jest już zajęty.";
}
mysql_close($connection);
?>