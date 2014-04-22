<?php
	require_once('connect.php');  
	$sql = "SELECT * FROM movies";
	$query = mysql_query($sql);
	$count = mysql_num_rows($query);
	$row = mysql_fetch_array($query);
	$tytuly;
	if($count>0){
		
		while($row = mysql_fetch_array($query)){
			$title_video = array('title' => $row['Tytul']);
			echo json_encode($title_video);
		}

	}    
	
?>