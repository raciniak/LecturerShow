
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
	//alert("loguje");
	var fd = new FormData();
	fd.append("login_l", document.getElementById('login_l').value);
	fd.append("haslo_l", document.getElementById('haslo_l').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logInLoadComplete, false);
	xhr.open("POST", "php/logowanie.php");
	xhr.send(fd);
	alert("loguje");
}

function logOut() {
	
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logOutLoadComplete, false);
	xhr.open("POST", "php/wyloguj.php");
	xhr.send();
	
}

function logOutLoadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="konto_new.html";
	},5);
}

function uploadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="zarejestrowany_new.html";
	},100);
}

function logInLoadComplete() {
	alert("zalogował");
	setTimeout(function(){
		window.location.href="konto_new.html";
	},5);
}
$(document).ready(function(){
	$.ajax({
        url: "php/sesja.php",
        success : function(msg){
			if(msg == 'nieznany')
            {
            	//alert(msg);
            	document.getElementById("logowanie").innerHTML = "Zaloguj";
            	document.getElementById("logowanie").href = "logowanie_new.html";
            		
				document.getElementById("konto").innerHTML= msg;
				document.getElementById("konto").style.display = "none";
				document.getElementById("rejestracja").style.visibility = "visible";
            	
			}
            else
			{	
				//alert(msg);			
				document.getElementById("konto").innerHTML= msg;
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
});