<?php
	require_once('connect_mysqli.php');
	
		
			$email = $_POST['email1'];
			$wynik = $db -> query("SELECT Mail FROM users WHERE Mail='$email'");
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