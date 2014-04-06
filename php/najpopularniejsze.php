<?php 
	require_once('connect.php');
	session_start();
	//$_SESSION['search_title'] = $_POST['search_title'];

	$sql_popularne = "SELECT Id, Tytul, Ocena, Wyswietlenia, Autor, Opis, Sciezka FROM movies ORDER BY Wyswietlenia DESC";


	$query = mysql_query($sql_popularne);
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
	
	
	/*$query_najnowsze = mysql_query($sql_najnowsze) or die(mysql_error());
	while($row = mysql_fetch_array($query_najnowsze)){
		$id = $row["id"];
   		$title = $row["title"];
		$jpg = $row["jpg"];
		$najnowsze .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
   		$najnowsze .= "<div id='tytul'><a href='index.php'> $title </a></div>";
		$najnowsze .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
}
$query_popularne = mysql_query($sql_popularne) or die(mysql_error());
while($row = mysql_fetch_array($query_popularne)){
		$id = $row["id"];
   		$title = $row["title"];
		$jpg = $row["jpg"];
		$popularne .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
   		$popularne .= "<div id='tytul'><a href='index.php'> $title </a></div>";
		$popularne .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
}
$query_najlepsze = mysql_query($sql_najlepsze) or die(mysql_error());
while($row = mysql_fetch_array($query_najlepsze)){
		$id = $row["id"];
   		$title = $row["title"];
		$jpg = $row["jpg"];
		$najlepsze .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
   		$najlepsze .= "<div id='tytul'><a href='index.php'> $title </a></div>";
		$najlepsze .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
} */
?>

