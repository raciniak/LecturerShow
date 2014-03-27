<?php
	session_start();
	require_once('connect_mysqli.php');
	
	/*if(isset($_SESSION['zalogowany'])) 
	{
		header("Refresh: 0; url=../index.php"); 
	}
	else
	{*/
			$login = $_POST['login_l'];
			$haslo = $_POST['haslo_l'];
			$zapytanie = "SELECT Login, Haslo, Mail, Imie, Nazwisko FROM users WHERE Login = '".$login."' && Haslo = '".md5($haslo)."'";
			$wynik = $db -> query($zapytanie);
			if (($wynik -> num_rows)>0)
			{
				$row = $wynik -> fetch_row();
				echo $_SESSION['zalogowany'] = true;
           		echo $_SESSION['login'] = $_POST['login1'];
           		echo $_SESSION['haslo'] = $_POST['haslo'];
				echo $_SESSION['email'] = $row[2];
				echo $_SESSION['imie'] = $row[3];
				echo $_SESSION['nazwisko'] = $row[4];
				echo("zalogowano");
				header("Refresh: 0; url=../index.php");
				
         	} 
			else 
			{	 
				echo "Nie ma takiego użytkownika";
			}
	
//	} 

?>