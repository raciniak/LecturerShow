<?php
require_once('connect.php');
/*mysql_connect("localhost","root");
mysql_select_db("aus"); */
//$db = new mysqli('localhost','root','','aus');

if (isset($_POST['zmien_dane']))
{
	$login = $_POST['login'];
	$haslo1 = $_POST['haslo1'];
	$haslo2 = $_POST['haslo2'];
	$email = $_POST['email1'];
	$email2 = $_POST['email2'];



		if ($haslo1 == $haslo2 && $email == $email2) // sprawdzamy czy hasła takie same
		{
			mysql_query("UPDATE uzytkownicy SET haslo='".md5($haslo1)."', email='".$email."' WHERE login='".$login."';");
			/*mysql_query("INSERT INTO `uzytkownicy`(`login`, `haslo`, `email`, `rejestracja`, `logowanie`, `ip`)
				VALUES ('".$login."', '".md5($haslo1)."', '".$email."', '".time()."', '".time()."', '".$ip."');"); */
			echo "Dane zostały zmienione";
			header("Refresh: 0; url=../konto.php");
		}
		else
		{
			echo "Dane są niepoprawne";
			echo $haslo1;
			echo $haslo2;
			
		}
	
}
mysql_close($connection);
?>