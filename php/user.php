<?php
	require_once('connect.php');
	require_once ('connect_mysqli.php');
	session_start();
	$sql= "SELECT Login, Imie, Nazwisko, Mail FROM users WHERE Login LIKE '".$_SESSION['nick']."'";
	
	$query = mysql_query($sql);
	$count = mysql_num_rows($query);

	if($count > 0){
		while($row = mysql_fetch_array($query))
		{
			$zapytanie_ilosc_filmow = "SELECT * FROM movies WHERE Autor='".$_SESSION['nick']."'";
			$zapytanie_srednia_ocen = "SELECT AVG(Ocena) FROM movies WHERE Autor='".$_SESSION['nick']."'"; 
			$zapytanie_ilosc_wyswietlen = "SELECT SUM(Wyswietlenia) FROM movies WHERE Autor='".$_SESSION['nick']."'";
			$query_count_video = mysql_query($zapytanie_ilosc_filmow);
			$count_video = mysql_num_rows($query_count_video);
			$query_avg_rate = mysql_query($zapytanie_srednia_ocen);
			$row2 = mysql_fetch_array($query_avg_rate);
			$avg = round($row2[0],2);;
			$query_sum_view = mysql_query($zapytanie_ilosc_wyswietlen);
			$row3 = mysql_fetch_array($query_sum_view);
			$sum = $row3[0];
			
			$imie = $row["Imie"];
			$nazwisko = $row["Nazwisko"];
			$email = $row["Mail"];
			$login = $row["Login"];
			$info_user = array('login'=>$login, 'imie'=>$imie, 'nazwisko'=>$nazwisko, 'email'=>$email, 'wyswietlenia' => $wyswietlenia, 'ilosc_filmow' => $count_video, 'srednia' => $avg, 'sum_view' => $sum);
			echo json_encode($info_user);
		}
	}
	else 
	{
			echo "ERROR";
	} 
?>