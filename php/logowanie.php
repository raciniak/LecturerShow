<?php
	require_once('connect_mysqli.php');
	

			$login = $_POST['login_l'];
			$haslo = $_POST['haslo_l'];
			$zapytanie = "SELECT Login, Haslo, Mail, Imie, Nazwisko FROM users WHERE Login = '".$login."' && Haslo = '".md5($haslo)."'";
			$wynik = $db -> query($zapytanie);
			if (($wynik -> num_rows)>0)
			{
				session_start();
				$row = $wynik -> fetch_row();
				$_SESSION['zalogowany'] = true;
           		$_SESSION['login'] = $_POST['login_l'];
           		$_SESSION['haslo'] = $_POST['haslo_l'];
				$_SESSION['email'] = $row[2];
				$_SESSION['imie'] = $row[3];
				$_SESSION['nazwisko'] = $row[4];
				
				$arr = array ('zalogowany'=>'true','login'=>$login, 'haslo'=>$_SESSION['haslo'], 'email'=>$row[2]);
				echo json_encode($arr);
				header("Refresh: 0; url=../index.html");
         	} 
			else 
			{	 
				echo "Nie ma takiego użytkownika";
			}
	

?>