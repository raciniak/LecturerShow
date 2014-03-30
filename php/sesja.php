<?php
session_start();
	if(isset($_SESSION['login']))
		{
			$arr = array ('login'=>$_SESSION['login'], 'haslo'=>$_SESSION['haslo'], 'email'=>$_SESSION['email'], 'imie'=>$_SESSION['imie'], 'nazwisko'=>$_SESSION['nazwisko']);
			echo json_encode($arr);
		}
	else
	{
		echo "nieznany";
	}	
?>