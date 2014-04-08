<?php 
	require_once('connect.php');	
	$_SESSION['title'] = $_POST['search_title'];
	echo $_SESSION['title'];
?>

