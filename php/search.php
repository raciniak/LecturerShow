<?php 
	require_once('connect.php');
	session_start();
	$_SESSION['title'] = $_POST['title_l'];
	$_SESSION['nick'] = $_POST['nick'];
?>

