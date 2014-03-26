<?php 
require_once('connect.php');
$najnowsze = "";
$popularne = "";
$najlepsze = "";
$sql_najnowsze = "SELECT id, title, jpg FROM suggest ORDER BY id DESC";
$sql_popularne = "SELECT id, title, jpg FROM suggest ORDER BY id DESC";
$sql_najlepsze = "SELECT id, title, jpg FROM suggest ORDER BY id DESC";
$query_najnowsze = mysql_query($sql_najnowsze) or die(mysql_error());
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
}
?>

