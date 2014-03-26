<?php 
require_once('connect.php');
$search_output = "";
$sqlCommand = "SELECT id, title, jpg FROM suggest WHERE autor='elo'";
$query = mysql_query($sqlCommand) or die(mysql_error());
$count = mysql_num_rows($query);
if($count > 0){

	//$search_output .= "<hr />$count wyniki dla <strong>$searchquery</strong> <hr />";
	//$search_output .= "<li><div id='zdjecie'> Zdjęcie <div>";
	//$search_output .= "<div id='nr'> ID </div> ";
	//$search_output .= "<div id='tytul'> Tytuł </div></li>";
	while($row = mysql_fetch_array($query))
	{
		$id = $row["id"];
   		$title = $row["title"];
		$jpg = $row["jpg"];
		$search_output .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
   		$search_output .= "<div id='tytul'><a href='index.php'> $title </a></div>";
		$search_output .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
	}
}
else 
{
	$search_output = "<hr />0 results for <strong>$searchquery</strong><hr />$sqlCommand";
}
?>

