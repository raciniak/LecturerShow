<?php 
	require_once('connect.php');

	$sql_najnowsze = "SELECT Id, Tytul, Ocena, Wyswietlenia, Autor, Opis, Sciezka FROM movies ORDER BY Id DESC";
	

	$query = mysql_query($sql_najnowsze);
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
			
	}
	

?>

