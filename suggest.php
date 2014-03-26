<?php
$db = new mysqli('localhost', 'root', '', 'aus');  
$search = $_GET['search']; 
if(!empty($search))
{
	$zapytanie = "SELECT DISTINCT title FROM suggest WHERE title LIKE '%$search%' LIMIT 10";
	$wynik = $db->query($zapytanie);
    $ile_znalezionych = $wynik->num_rows;
    for ($i=0; $i <$ile_znalezionych; $i++)
    {
        $wiersz = $wynik->fetch_assoc();
        $str .= $wiersz['title']."\n";
   	}
    $str .= "empty \n";
    echo rtrim($str);
}                                      