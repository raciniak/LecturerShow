<?php
	require_once('connect.php');
	session_start();
	$sql= "SELECT Login, Imie, Nazwisko, Mail FROM users WHERE Login LIKE '".$_SESSION['nick']."'";
	$sql_user_videos = "SELECT Tytul, Opis, Wyswietlenia, Ocena, Sciezka FROM movies WHERE Autor LIKE '".$_SESSION['nick']."'";
	$query = mysql_query($sql);
	$count = mysql_num_rows($query);
	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$imie = $row["Imie"];
			$nazwisko = $row["Nazwisko"];
			$email = $row["Mail"];
			$login = $row["Login"];
			$info_user = array('login'=>$login, 'imie'=>$imie, 'nazwisko'=>$nazwisko, 'email'=>$email);
			echo json_encode($info_user);
		}
	}
	
	else 
	{
			echo "ERROR";
	} 
?>