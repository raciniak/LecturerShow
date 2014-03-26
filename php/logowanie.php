<?php
	session_start();
	require_once('connect_mysqli.php');
	
	if(isset($_SESSION['zalogowany'])) 
	{
		header("Refresh: 0; url=../index.php"); 
	}
	else
	{
		if(isset($_POST['loguj']))
		{
			$login = $_POST['login1'];
			$haslo = $_POST['haslo'];
			$zapytanie = "SELECT Login, Haslo, Mail, Imie, Nazwisko FROM users WHERE Login = '".$login."' && Haslo = '".md5($haslo)."'";
			$wynik = $db -> query($zapytanie);
			if (($wynik -> num_rows)>0)
			{
				$row = $wynik -> fetch_row();
				$_SESSION['zalogowany'] = true;
           		$_SESSION['login'] = $_POST['login1'];
           		$_SESSION['haslo'] = $_POST['haslo'];
				$_SESSION['email'] = $row[2];
				$_SESSION['imie'] = $row[3];
				$_SESSION['nazwisko'] = $row[4];
				header("Refresh: 0; url=../index.php");
         	} 
			else 
			{	 
				echo "Nie ma takiego użytkownika";
			}
		}
	}
?>