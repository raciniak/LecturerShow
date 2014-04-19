<?php 
	require_once('connect.php');
	session_start();
	$sqlCommand = "SELECT Sciezka, Autor, Tresc, Data FROM Comment WHERE Sciezka='".$_SESSION['sciezka']."' ORDER BY Id DESC";
	$query = mysql_query($sqlCommand) or die(mysql_error());
	$count = mysql_num_rows($query);
	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$autor = $row['Autor'];
			$tresc = $row['Tresc'];
			$data = $row['Data'];
			$info_video = array('autor' => $autor, 'tresc' => $tresc, 'data' => $data);
			echo json_encode($info_video);
		}
		
	}
	
	else 
	{
			echo "BRAK";
	}
?>
