<?php 
	require_once('connect.php');	
	$search_output = "";
	$search_input = $_GET['searchinput'];
	if(isset($_GET['searchinput']) && $_GET['searchinput'] != ""){
		$searchquery = preg_replace('#[^a-z 0-9?!]#i', '', $_GET['searchinput']);
		$sqlCommand = "SELECT Id, Tytul FROM movies WHERE Tytul LIKE '%$searchquery%' ";
		$query = mysql_query($sqlCommand) or die(mysql_error());
		$count = mysql_num_rows($query);
		if($count > 1){
			while($row = mysql_fetch_array($query)){
				$id = $row["Id"];
   				$title = $row["Tytul"];
				//$jpg = $row["jpg"];
				$search_output .= "<li><a href='index.php'><div id='zdjecie'><img  width='100px' height='100px' src=$jpg> </div>";		
   				$search_output .= "<div id='tytul'><a href='index.php'> $title </a></div>";
				$search_output .= "<div id='nr'><p>$id wyświetleń</p></div></a></li>";
			}
		} 
		else
		{
			$search_output = "<hr />0 results for <strong>$searchquery</strong><hr />$sqlCommand";
		}
	}
?>

