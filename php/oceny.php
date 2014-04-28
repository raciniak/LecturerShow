<?php
require_once('connect.php');
session_start();
$aResponse['error'] = false;
$aResponse['message'] = '';


	
	
if(isset($_POST['action']))
{
	if(htmlentities($_POST['action'], ENT_QUOTES, 'UTF-8') == 'rating')
	{
		/*
		* vars
		*/
	
		
		$rate = floatval($_POST['rate']);
		$rate = $rate/4;
		
		$sql = "UPDATE movies SET Liczba_Ocen = Liczba_Ocen + 1 , Suma_Ocen=Suma_Ocen + '".$rate."' WHERE Sciezka='".$_SESSION['sciezka']."'";
		mysql_query($sql);
		
		$sql2 = "INSERT INTO `rate` (`User`,`Sciezka`,`Ocena`) VALUES ('".$_SESSION['login']."', '".$_SESSION['sciezka']."', '".$rate."')";
		mysql_query($sql2);
		
		$sql_select = "SELECT Liczba_Ocen, Suma_Ocen FROM movies WHERE Sciezka='".$_SESSION['sciezka']."'";
		
		$suma_ocen = $row['Suma_Ocen'];
		$liczba_ocen = $row['Liczba_Ocen'];
		$ocena = $suma_ocen / $liczba_ocen;
		$sql_update = "UPDATE movies SET Ocena='$ocena' WHERE Sciezka='".$_SESSION['sciezka']."'";
		
		mysql_query($sql_update); 
		// if request successful
		$success = true;
		// else $success = false;
		
		
		// json datas send to the js file
		if($success)
		{
			$aResponse['message'] = 'Your rate has been successfuly recorded. Thanks for your rate :)';
			
			// ONLY FOR THE DEMO, YOU CAN REMOVE THE CODE UNDER
				$aResponse['server'] = '<strong>Success answer :</strong> Success : Your rate has been recorded. Thanks for your rate :)<br />';
				$aResponse['server'] .= '<strong>Rate received :</strong> '.$rate.'<br />';
				$aResponse['server'] .= '<strong>ID to update :</strong> '.$id;
			// END ONLY FOR DEMO
			
			echo json_encode($aResponse);
		}
		else
		{
			$aResponse['error'] = true;
			$aResponse['message'] = 'An error occured during the request. Please retry';
			
			// ONLY FOR THE DEMO, YOU CAN REMOVE THE CODE UNDER
				$aResponse['server'] = '<strong>ERROR :</strong> Your error if the request crash !';
			// END ONLY FOR DEMO
			
			
			echo json_encode($aResponse);
		} 
	}
	else
	{
		$aResponse['error'] = true;
		$aResponse['message'] = '"action" post data not equal to \'rating\'';
		
		// ONLY FOR THE DEMO, YOU CAN REMOVE THE CODE UNDER
			$aResponse['server'] = '<strong>ERROR :</strong> "action" post data not equal to \'rating\'';
		// END ONLY FOR DEMO
			
		
		echo json_encode($aResponse);
	}
}
else
{
	$aResponse['error'] = true;
	$aResponse['message'] = '$_POST[\'action\'] not found';
	
	// ONLY FOR THE DEMO, YOU CAN REMOVE THE CODE UNDER
		$aResponse['server'] = '<strong>ERROR :</strong> $_POST[\'action\'] not found';
	// END ONLY FOR DEMO
	
	
	echo json_encode($aResponse);
}