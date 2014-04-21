<?php 
	require_once('connect.php');
	session_start();
	$sqlCommand = "SELECT Tytul, Ocena, Suma_Ocen, Liczba_Ocen, Wyswietlenia, Autor, Sciezka, Opis FROM movies WHERE Sciezka='".$_SESSION['sciezka']."'";
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
			$liczba_ocen = $row["Liczba_Ocen"];
			$suma_ocen = $row["Suma_Ocen"];
			$info_video = array('tytul'=>$tytul, 'opis'=>$opis, 'autor'=>$autor, 'wyswietlenia'=>$wyswietenia, 'ocena'=>$ocena, 'sciezka'=>$sciezka, 'liczba_ocen' => $liczba_ocen, 'suma_ocen' => $suma_ocen);
			echo json_encode($info_video);
		}
		
	}
	
	else 
	{
			echo 'BRAK';
	}
?>