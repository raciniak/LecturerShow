
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

function updateUserData() {
	var fd = new FormData();
	fd.append("login", document.getElementById('login').value);
	fd.append("haslo1", document.getElementById('haslo1').value);
	fd.append("haslo2", document.getElementById('haslo2').value);
	fd.append("email1", document.getElementById('email1').value);
	fd.append("email2", document.getElementById('email2').value);
	fd.append("imie", document.getElementById('imie').value);
	fd.append("nazwisko", document.getElementById('nazwisko').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", uploadComplete, false);
	xhr.open("POST", "php/zmien_dane.php");
	xhr.send(fd);
}

function logIn() {
	var fd = new FormData();
	fd.append("login_l", document.getElementById('login_l').value);
	fd.append("haslo_l", document.getElementById('haslo_l').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logInLoadComplete, false);
	xhr.open("POST", "php/logowanie.php");
	xhr.send(fd);	

}

function uploadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="glowna.php";
	},100);
}

function logInLoadComplete(evt) {
	var dane = JSON.parse(evt.target.responseText);
	s_login = dane.login;
	s_haslo = dane.haslo;
	s_email = dane.email;
	s_zalogowany = dane.zalogowany;
	alert(s_zalogowany);
	

}
