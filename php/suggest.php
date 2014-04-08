<?php
	require_once('connect_mysqli.php');  
	$search = $_GET['search']; 
	if(!empty($search))
	{
		$zapytanie = "SELECT DISTINCT Tytul FROM movies WHERE Tytul LIKE '$search%' LIMIT 10";
		$wynik = $db->query($zapytanie);
    	$ile_znalezionych = $wynik->num_rows;
    	for ($i=0; $i <$ile_znalezionych; $i++)
    	{
        	$wiersz = $wynik->fetch_assoc();
        	$str .= $wiersz['Tytul']."\n";
   		}
    	$str .= "empty \n";
    	echo rtrim($str);
	}                              
?>