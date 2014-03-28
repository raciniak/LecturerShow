<?php
	session_start();
	require_once('php/search_my_videos.php');
?>
<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Konto</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/wyszukiwarka.css" rel="stylesheet" type="text/css" />
		<link href="css/logowanie.css" rel="stylesheet" type="text/css" />
		<link href="css/rejestracja.css" rel="stylesheet" type="text/css" />
		<link href="//fonts.googleapis.com/css?family=Lato:100italic,100,300italic,300,400italic,400,700italic,700,900italic,900" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript" src="js/suggest.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
        <script type="text/javascript" src="js/tabs.js"></script>
        <script type="text/javascript" src="js/zmien_dane.js"></script>
		
	</head>


	<body>
    	<div id="wrapper">
        	<header>
            	<div id="logo">
                	<h1><img src="images/icons/logo.png" /></h1>
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
                		<li> <a id="rejestracja" href="konto.php"> Twoje konto </a>  </li> 
                    	<li> <a id="logowanie" href="php/wyloguj.php"> Wyloguj </a>   </li>
                	</ul>
                </nav>
            </header>
           
            
            <section>
            	<ul class="tabs">
        			<li class="active"><a href="#tab-1"> Dane </a></li>
        			<li><a href="#tab-2">Moje filmy</a></li>
        			<li><a href="#tab-3">Wrzuć film</a></li>
				</ul>
 				<div id="tab-1" class="tab">
        			<p class="naglowek">Zmień dane</p>
                   
                    <p></p>
                    <p class="dane"> Dane konta:</p>
              		<hr />
                    <p></p>
					<b>Login:</b> <input type="text" placeholder="min. 6 znaków" name="login" id="login" value=<?php echo $_SESSION['login'];?> disabled><br></br>
					<b>Hasło:</b> <input type="password" name="haslo1" placeholder="min. 6 znaków " id="haslo1" value=<?php echo $_SESSION['haslo'];?>><br></br>
					<b>Powtórz hasło:</b> <input type="password" name="haslo2" id="haslo2" value=<?php echo $_SESSION['haslo'];?>><br></br>
					<b>E-mail:</b> <input type="email" name="email1" placeholder="np. jan.kowalski@gmail.com" id="email1" value=<?php echo $_SESSION['email'];?>><br></br>
					<b>Powtórz e-mail:</b> <input type="email" name="email2" id="email2" value=<?php echo $_SESSION['email'];?>><br></br>
					<p></p>
                    <p class="dane"> Dane osobiste: (niewymagane)</p>
              		<hr />
                	<p></p>
               		<b>Imię:</b> <input type="text" placeholder="np. Jan" name="imie" id="imie" value=<?php echo $_SESSION['imie'];?>><br></br>
                	<b>Nazwisko:</b> <input type="text" placeholder="np. Kowalski" name="nazwisko" id="nazwisko" value=<?php echo $_SESSION['nazwisko'];?>><br></br>
                	
         			<input type="submit" value="Zmień dane" name="zmien_dane" id="rejestruj_button" onclick="updateUserData()"> <!--disabled-->
			

				</div>
				<div id="tab-2" class="tab">
        			<?php echo $search_output; ?>
				</div>
				<div id="tab-3" class="tab">
      				Tu fragment kodu Bartka
				</div>
            </section>
           
            
           
        </div>
     </body>
</html>
