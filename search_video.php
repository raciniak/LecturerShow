<?php

require_once('php/search.php');

?>

<!DOCTYPE html>

<html lang="pl">
    <head>
        <title>  <?php echo $search_input; ?> Player</title>
        <meta charset="UTF-8">
        <meta name="keywords" content="" />
		<meta name="description" content="" />
        <meta name="viewport" content="width=device-width">
        
        <!-- Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/wyszukiwarka.css" />
   		<link rel="stylesheet" type="text/css" href="css/player.css" media="all">
        <link rel="stylesheet" type="text/css" href="css/result.css" media="all">

		<!-- Skrypty JavaScript -->
        <script src="js/jquery-1.10.2.js" type='text/javascript'></script>
        <script type="text/javascript" src="js/player.js"></script>
        <script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript" src="js/suggest.js"></script>
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
                    	echo '<li><a id="logowanie" href="wyloguj.php"> Wyloguj </a></li>';
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
				<h2> Wyniki dla wyszukiwania: <?php echo $search_input; ?> </h2>
                </br>
                	<div id="wyniki">
                    	<ul>
							<?php echo $search_output; ?>
                		</ul>
                    </div>
               
                
			</section>
		</div>
    </body>
</html>
