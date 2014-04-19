<?php 
	require_once('connect.php');
	$autor = $_POST['autor'];
	$tresc = $_POST['tresc'];
	$sciezka = $_POST['sciezka'];
	$data = date("d-m-Y H:i");
	$query = "INSERT INTO `Comment`(`Autor`,`Tresc`, `Sciezka`, `Data`) VALUES ('".$autor."', '".$tresc."', '".$sciezka."', '".$data."' );";
	mysql_query($query);
?>