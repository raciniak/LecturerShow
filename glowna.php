<?php 
		require_once('statystyki.php');
		require_once('php/najnowsze.php');
?>

<!DOCTYPE html>

<html lang="pl">
<head>
        <title>Strona główna</title>
        <meta charset="UTF-8">
        <meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta name="viewport" content="width=device-width">
        
        <!-- Style CSS -->
   
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="css/suggest.css" />
		<link rel="stylesheet" type="text/css" href="css/wyszukiwarka.css" />
        <link rel="stylesheet" type="text/css" href="css/slider1.css" />

        <link href="css/logowanie.css" rel="stylesheet" type="text/css" />
		
        <!-- Skrypty JavaScript -->
        <script type="text/javascript" src="js/jquery-1.10.2.js"></script>
  		<link href="//fonts.googleapis.com/css?family=Lato:100italic,100,300italic,300,400italic,400,700italic,700,900italic,900" rel="stylesheet" type="text/css">

        <script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript" src="js/suggest.js"></script>
        <script type="text/javascript" src="js/logowanie.js"></script>

        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  
 
		 <script type="text/javascript" src="js/test.js"></script> 
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
                	<ul>
                		<li> <a id="rejestracja_link" href="rejestracja.html"> Rejestracja </a>  </li> 
                    	<li> <!--<a id="logowanie_link" onClick="pokaz_panel()" title="Logowanie">  </a>   -->
                        <input id="logowanie_link" onClick="pokaz_panel()" value="Logowanie" type="button"> </li>
                    </ul>
                </nav>
                <div id="panel_logowania">
                	<form method="POST" action="logowanie.php">
                    	<center><p id="naglowek_panel"> Zaloguj się do Lecturer Show </p></center>
						<p>Login:</p> <input type="text" name="login" id="login" placeholder="login"></br>
						<p>Hasło:</p> <input type="password" name="haslo" id="haslo" placeholder="hasło"></br>
						<center><input type="submit" value="Zaloguj" name="loguj" id="login_button"></center>
					</form> 
                </div>
        	</header>
			<!-- Content -->    	
        	<section>
            	<div id="filmy">
                	<h1 id="naglowek_film"> Najnowsze filmy </h1>
                    <div class="slider" onselect="return false">
                    <input type="button" class="prev" value="<" >
                    <div class="wyniki">
                    	<ul class="lista">
                			<?php echo $najnowsze; ?>
                		</ul>
                    </div>
                    <input type="button" value=">" class="next" >
                    </div>
                    <h1 id="naglowek_film"> Najczęściej wyświetlane </h1>
                    <div class="slider">
                    <input type="button" value="<" class="prev">
                    <div class="wyniki">
                    	<ul class="lista">
                			<?php echo $popularne; ?>
                		</ul>
                    </div>
                     <input type="button" value=">" class="next">
                    </div>
                    <h1 id="naglowek_film"> Najlepiej oceniane </h1>
                    <div class="slider">
                    <input type="button" value="<" class="prev">
                    <div class="wyniki">
                    	<ul class="lista">
                			<?php echo $najlepsze; ?>
                		</ul>
                    </div>
                     <input type="button" value=">" class="next">
                    </div>
                </div>
				<div id="statystyki">
                	<h1 id="naglowek_stat"> Statystyki </h1>
                	<p class="dane"> <?php echo $ile_znalezionych_u; ?> użytkowników </p> 
                    <p class="dane"> <?php echo $ile_znalezionych_v; ?> opublikowanych filmów </p>
                    <p class="dane"> <?php echo $wyswietlenia; ?> wyświetleń filmów </p>
                </div>
              
			</section>
		</div>
    </body>
</html>
