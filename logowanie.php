<?php
session_start();
//session_register();
$db = new mysqli("localhost","root","","aus");

if(isset($_SESSION['zalogowany'])) 
{
	header("Refresh: 0; url=index.php"); 
}
else
{
	if(isset($_POST['loguj'])) {
	$login = $_POST['login'];
	$haslo = $_POST['haslo'];
		$zapytanie = "SELECT login, haslo, email FROM uzytkownicy WHERE login = '".$login."' && haslo = '".md5($haslo)."'";
		$wynik = $db -> query($zapytanie);
		
		if (($wynik -> num_rows)>0)
		{
			$row = $wynik -> fetch_row();
			$_SESSION['zalogowany'] = true;
           	$_SESSION['login'] = $_POST['login'];
           	$_SESSION['haslo'] = $_POST['haslo'];
			$_SESSION['email'] = $row[2];
			header("Refresh: 0; url=index.php");
         
			
		} 
		else 
		{ 
			echo "Nie ma takiego użytkownika";
		}
	}
}
?>