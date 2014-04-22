<?php
	require_once('connect.php');
	session_start();
	$ip = $_SERVER['REMOTE_ADDR'];
	$sciezka = $_SESSION['sciezka'];
	
	$sql = "SELECT * FROM views WHERE User = '".$_SERVER['REMOTE_ADDR']."' AND Sciezka = '".$_SESSION['sciezka']."'";
	
	$query = mysql_query($sql);

	$count = mysql_num_rows($query);
		if($count == 0)
		{
		$sql_update = "UPDATE movies SET Wyswietlenia = Wyswietlenia + 1 WHERE Sciezka = '".$sciezka."'";
		mysql_query($sql_update);
		$sql_insert = "INSERT INTO `views`(`User`, `Sciezka`) VALUES ('".$ip."', '".$sciezka."');";
		mysql_query($sql_insert);
		}
		
	$sql_select = "SELECT * FROM rate WHERE User = '".$_SESSION['login']."' AND Sciezka = '".$_SESSION['sciezka']."'";
	$query_select = mysql_query($sql_select);
	$count_select = mysql_num_rows($query_select);
	$ocena = mysql_fetch_array($query_select);
	if($count_select == 0)
	{
		echo 0;
	}
	else
	{
		echo $ocena['Ocena'];
	}
?>
	 
