<?php 
	require_once('connect.php');
	$email = $_POST['e-mail'];
	$opis = $_POST['tresc'];
	$query = "INSERT INTO `report`(`E-mail`,`Tresc`) VALUES ('".$email."', '".$opis."');";
	mysql_query($query);
?>