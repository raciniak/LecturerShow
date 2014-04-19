<?php
	require_once('connect.php');
	$nick = $_POST['nick'];
	$sql= "SELECT Imie, Nazwisko FROM users WHERE Login LIKE '".$_SESSION['nick']."'";
	$query = mysql_query($sql);
	$count = mysql_num_rows($query);
	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$imie = $row["Imie"];
			$nazwisko = $row["Nazwisko"];
			
			$info_user = array('imie'=>$imie, 'nazwisko'=>$nazwisko);
			echo json_encode($info_user);
			
		}
		
	}
	
	else 
	{
			
	} 
?>