<?php
	$db = new mysqli('localhost','root','','aus');
	
		if(isset($_POST['login']))
		{
			$login = $_POST['login'];
			$wynik = $db -> query("SELECT login FROM uzytkownicy WHERE login='$login'");
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
		}
?>