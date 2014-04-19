<?php 
	require_once('connect.php');
	session_start();
	$sqlCommand = "SELECT Tytul, Ocena, Wyswietlenia, Autor, Sciezka, Opis FROM movies WHERE Autor='".$_SESSION['login']."'";
	$query = mysql_query($sqlCommand) or die(mysql_error());
	$count = mysql_num_rows($query);
	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$wyswietenia = $row["Wyswietlenia"];
			$tytul = $row["Tytul"];
			$ocena = $row["Ocena"];
			$autor = $row["Autor"];
			$opis = $row["Opis"];
			$sciezka = $row["Sciezka"];
			
			$info_video = array('tytul'=>$tytul, 'opis'=>$opis, 'autor'=>$autor, 'wyswietlenia'=>$wyswietenia, 'ocena'=>$ocena, 'sciezka'=>$sciezka);
			echo json_encode($info_video);
		}
		
	}
	
	else 
	{
			echo 'BRAK';
	}
?>

