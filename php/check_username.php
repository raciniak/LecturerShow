<?php
	require_once('connect_mysqli.php');
	$login = $_POST['login'];
	$wynik = $db -> query("SELECT Login FROM users WHERE Login='$login'");
	$ile = $wynik -> num_rows;
	if($ile==0)
	{
		echo 'OK';
		$db -> close();
	}
	else
	{
		echo 'ZAJETY';
		$db -> close();
	}
?>