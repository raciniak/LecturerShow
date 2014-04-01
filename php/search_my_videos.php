<?php 
	//require_once('connect_mysqli.php');
	require_once ('connect.php');
	$sql_moje_filmy = "SELECT Tytul, Ocena, Wyswietlenia, Autor, Sciezka, Opis FROM movies WHERE Autor='bareq'";
	//$wynik_moje_filmy = $db -> query($sql_moje_filmy);
	$query = mysql_query($sql_moje_filmy);
	//$ile_moje_filmy = $wynik_moje_filmy -> num_rows;
	$ile_moje_filmy = mysql_num_rows($query);
	if($ile_moje_filmy > 0){
		//$row = $wynik_moje_filmy -> fetch_row();
		$row = mysql_fetch_array($query);
		{
			/*$id = $row["Wyswietlenia"];
  	 		$title = $row["Tytul"];
			$jpg = $row["Ocena"];
			$search_output .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
  	 		$search_output .= "<div id='tytul'><a href='index.php'> $title </a></div>";
			$search_output .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>"; */
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
		//$search_output = "<hr /> Brak wyników <hr />";
		echo 'elo nie ma';
	}
?>

