// funkcja wysyłająca dane z formularza rejestracji 
function sendUserData() {
	var fd = new FormData();
	fd.append("login", document.getElementById('login').value);
	fd.append("haslo1", document.getElementById('haslo1').value);
	fd.append("haslo2", document.getElementById('haslo2').value);
	fd.append("email1", document.getElementById('email1').value);
	fd.append("imie", document.getElementById('imie').value);
	fd.append("nazwisko", document.getElementById('nazwisko').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", uploadComplete, false);
	xhr.open("POST", "php/rejestracja.php");
	xhr.send(fd);
	}

// funkcja wysyłająca dane z formularza aktualizacji danych użytkownika 
function updateUserData() {
	var fd = new FormData();
	fd.append("login", document.getElementById('login_aktualizacja').value);
	fd.append("haslo1", document.getElementById('haslo1_aktualizacja').value);
	fd.append("haslo2", document.getElementById('haslo2_aktualizacja').value);
	fd.append("email1", document.getElementById('email1_aktualizacja').value);
	fd.append("email2", document.getElementById('email2_aktualizacja').value);
	fd.append("imie", document.getElementById('imie_aktualizacja').value);
	fd.append("nazwisko", document.getElementById('nazwisko_aktualizacja').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", uploadComplete, false);
	xhr.open("POST", "php/zmien_dane.php");
	xhr.send(fd);
}

// funkcja wykonująca się po poprawnym wykonaniu funkcji wysylajacej (sendUserData) i aktualizującej dane (updateUserData)
function uploadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="zarejestrowany_new.html";
	},100);
}

// funkcja logowania
function logIn() {
	alert("loguje");
	var fd = new FormData();
	fd.append("login_l", document.getElementById('login_l').value);
	fd.append("haslo_l", document.getElementById('haslo_l').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logInLoadComplete, false);
	xhr.open("POST", "php/logowanie.php");
	xhr.send(fd);
	alert("loguje");
}

// funkcja wykonująca się po poprawnym zalogowaniu się
function logInLoadComplete() {
	alert("zalogował");
	setTimeout(function(){
		window.location.href="konto_new.html";
	},5);
}

// funkcja wylogowująca użytkownika
function logOut() {
	
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logOutLoadComplete, false);
	xhr.open("POST", "php/wyloguj.php");
	xhr.send();
	
}

// funkcja wykonująca się po poprawnym wylogowaniu się
function logOutLoadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="logowanie_new.html";
	},5);
}


function funkcja()
        	{
        		setTimeout(function(){
        			document.getElementById("zdjecie").src = 'images/banner.jpg';
        		},500);
        	}
function funkcja_powrot(){
	document.getElementById("zdjecie").scr = 'images/60.jpg';
}        	

$(document).ready(function(){
	$.ajax({
        url: "php/sesja.php",
        success : function(msg){
			if(msg == 'nieznany')
            {
            	
            	document.getElementById("logowanie").innerHTML = "Zaloguj";
            	document.getElementById("logowanie").href = "logowanie_new.html";
            	document.getElementById("konto").innerHTML= msg;
				document.getElementById("konto").style.display = "none";
				document.getElementById("rejestracja").style.visibility = "visible";
            	
			}
            else
			{	
				
				var dane = JSON.parse(msg);	
				document.getElementById("login_aktualizacja").value = dane.login;	
				document.getElementById("konto").innerHTML= dane.login;
				document.getElementById("haslo1_aktualizacja").value = dane.haslo;
				document.getElementById("haslo2_aktualizacja").value = dane.haslo;
				document.getElementById("email1_aktualizacja").value = dane.email;
				document.getElementById("email2_aktualizacja").value = dane.email;
				document.getElementById("imie_aktualizacja").value = dane.imie;
				document.getElementById("nazwisko_aktualizacja").value = dane.nazwisko;
				document.getElementById("konto").style.visibility = "visible";
				document.getElementById("rejestracja").style.display = "none";
				document.getElementById("logowanie").innerHTML = "Wyloguj";
				document.getElementById("logowanie").onclick = logOut;	
            }
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	// funkcja pobierająca statystyki profilu zalogowanego użytkownika
	$.ajax({
        url: "php/statystyki_profilu.php",
        success : function(msg){
       
			var dane = JSON.parse(msg);
			document.getElementById("ilosc_filmow").innerHTML = "Ilość filmow: " + dane.ilosc_filmow;
			document.getElementById("ilosc_wyswietlen").innerHTML = "Łączna ilość wyświetleń Twoich filmów: " + dane.ilosc_wyswietlen;
			document.getElementById("srednia_ocen").innerHTML = "Średnia ocen Twoich filmów: " + dane.srednia_ocen;
			
			
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 
	$.ajax({
        url: "php/search_my_videos.php",
        success : function(msg){
        	alert(msg);
        	var dane = JSON.parse(msg);
        	
        	
        	// do poprawy divy i odczyt kilku filmow
        	
        	document.getElementById("filmy").innerHTML += "<a onmouseover = funkcja() onmouseout = funkcja_powrot() href='" + dane.sciezka + "'>" + "<img id='zdjecie'  src='images/60.jpg'></a>";
        	document.getElementById("filmy").innerHTML += "<p> Tytul: " + dane.tytul + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Opis: " + dane.opis + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Autor: " + dane.autor + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Ocena: " + dane.ocena + "</p>";
        	document.getElementById("filmy").innerHTML += "<a href='" + dane.sciezka + "'>" + dane.tytul + "</a>";
	
        	
			//alert(dane.tytul);
			//alert(dane.opis);
		
			
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 

});