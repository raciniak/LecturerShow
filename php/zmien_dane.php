<?php
	require_once('connect.php');
	if (isset($_POST['zmien_dane']))
	{
		$login = $_POST['login'];
		$haslo1 = $_POST['haslo1'];
		$haslo2 = $_POST['haslo2'];
		$email = $_POST['email1'];
		$email2 = $_POST['email2'];
		$imie = $_POST['imie'];
		$nazwisko = $_POST['nazwisko'];
		if ($haslo1 == $haslo2 && $email == $email2) // sprawdzamy czy hasła takie same
		{
			mysql_query("UPDATE users SET Haslo='".md5($haslo1)."', Mail='".$email."', Imie='".$imie."', Nazwisko='".$nazwisko."' WHERE Login='".$login."';");
			echo "Dane zostały zmienione";
			header("Refresh: 0; url=../konto.php");
		}
		else
		{
			echo "Dane są niepoprawne";
		}
	
	}
	mysql_close($connection);
?>