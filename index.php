<?php
	require_once('php/connect.php');
	$sqlUpdateCommand = "UPDATE suggest SET id=id+1 WHERE title='siemanko'";
	$query = mysql_query($sqlUpdateCommand) or die(mysql_error());
?>
<!DOCTYPE html>
<html lang="pl">
    <head>
        <title>Player</title>
        <meta charset="UTF-8">
        <meta name="keywords" content="" />
		<meta name="description" content="" />
		<link href="css/styl.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript" src="js/suggest.js"></script>
        <meta name="viewport" content="width=device-width">
        <!-- Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/wyszukiwarka.css" />
   		<link rel="stylesheet" type="text/css" href="css/player.css" media="all">
		<!-- Skrypty JavaScript -->
        <script src="js/jquery-1.10.2.js" type='text/javascript'></script>
        <script type="text/javascript" src="js/player.js"></script>
        <script type="text/javascript" src="js/account.js"></script>
		<!-- <script type="text/javascript" src="script.js"></script> -->
	</head>
    <body>
   		<div id="wrapper">
   	 		<!-- Naglowek -->
            <header> 
				<!-- Logo i pasek wyszukiwania -->            
           		<div id="logo">
               		<h1><img src="icons/logo.png" /></h1>
            	</div>
                <div id="wyszukiwarka">
          			<form id="searchform" method="get" action="search_video.php" autocomplete="off"> 
						<input type="text" placeholder="Wyszukaj film ..." id="searchinput" name="searchinput" onkeyup="searchSuggest();">  
						<input type="submit" value="Szukaj" id="searchsubmit">
					<div id="search_suggest"></div>
                    </form>
                </div>
                <nav id="panel_uzytkownika">
                <?php
					session_start();
                	if(isset($_SESSION['zalogowany'])) 
					{
						echo '<ul>';
                		echo '<li><a id="rejestracja" href="konto.php"> Twoje konto </a></li>';
                    	echo '<li><a id="logowanie" href="php/wyloguj.php"> Wyloguj </a></li>';
                		echo '</ul>';
					}
					else
					{
						echo '<ul>';
                		echo '<li><a id="rejestracja" href="rejestracja.html"> Rejestracja </a></li>';
                    	echo '<li><a id="logowanie" href="logowanie.html"> Logowanie </a></li>';
                		echo '</ul>';
					}
				?>
                </nav>
        	</header>
			<!-- Content -->    	
        	<section>
				<!-- Odtwarzacz video --> 
                <div id="player_box">
                    <video id="vid" width="640" height="360" oncontextmenu="return false" onClick="playPause()"> <!-- nie pozwala wyświetlić menu po kliknięciu prawego przycisku -->
                        <source id="film"  src="video/trailer_test.mp4" type="video/mp4">
						<source src="video/trailer_test.ogg" type="video/ogg"> 
                    </video>
                </div>
                <!-- Odtwarzacz JPG -->
                <div id="load_JPG" oncontextmenu="return false" >
                    <img width="640" height="360" />
				</div>
            	<!-- Sterowanie odtwarzaczami -->
                <div id="timeline"> 
     				<nav>
        				<div id="play"><button id="playPause" ></button></div>
             	  		<div id="slider1"><input id="slider" type="range" min="0" max="100" value="0" step="1" style="width:300px" ></div> 			
                  		<div id="time"><span id="czasobecny">00:00</span> / <span id="czastrwania"> 00:00</span></div>
                    	<div id="mute_button"><button id="mute"></button></div>
                    	<div id="volume_slider"><input id="volslider" type="range" min="0" max="30" value="30" step="1" style="width:140px"></div>
        			</nav>
                </div>
                <div id="edytor">
                <?php 
                	phpinfo();
					?>
                </div>
			</section>
		</div>
    </body>
</html>
