<?php 
	require_once('connect.php');
	$search_output = "";
	$sqlCommand = "SELECT Tytul, Ocena, Wyswietlenia FROM movies WHERE Autor='elo'";
	$query = mysql_query($sqlCommand) or die(mysql_error());
	$count = mysql_num_rows($query);
	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$id = $row["Wyswietlenia"];
  	 		$title = $row["Tytul"];
			$jpg = $row["Ocena"];
			$search_output .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
  	 		$search_output .= "<div id='tytul'><a href='index.php'> $title </a></div>";
			$search_output .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
		}
	}
	else 
	{
		$search_output = "<hr /> Brak wyników <hr />";
	}
?>

