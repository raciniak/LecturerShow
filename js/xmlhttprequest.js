var login;
function fileSelected(plik) {
        var file = document.getElementById(plik).files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
          else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
          if(plik == 'mowa'){
            document.getElementById('fileName1').innerHTML = 'Nazwa: ' + file.name;
            document.getElementById('fileSize1').innerHTML = 'Rozmiar: ' + fileSize;
            document.getElementById('fileType1').innerHTML = 'Typ: ' + file.type;
          }
          if(plik == 'slajdy'){
            document.getElementById('fileName2').innerHTML = 'Nazwa: ' + file.name;
            document.getElementById('fileSize2').innerHTML = 'Rozmiar: ' + fileSize;
            document.getElementById('fileType2').innerHTML = 'Typ: ' + file.type;
          }
        }
      }

      function uploadFile() {
        if(document.getElementById('fileType1').innerHTML.toString().contains("video") == false)
        {
            alert("Niepoprawny typ pliku mowy");
            return;
        }
        if(document.getElementById('fileType2').innerHTML.toString().contains("video") === false
                && document.getElementById('fileType2').innerHTML.toString().contains("pdf") === false)
        {
            alert("Niepoprawny typ pliku slajdow");
            return;
        }
        var fd = new FormData();
        fd.append("mowa", document.getElementById('mowa').files[0]);
        fd.append("slajdy", document.getElementById('slajdy').files[0]);
        fd.append("login", login);
        fd.append("name", document.getElementById('name').value);
        fd.append("opis", document.getElementById('opis').value);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "http://lecturershow.pl:8080/up/UploadServlet");
        xhr.send(fd);
      }

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
          document.getElementById('progressBar').value = percentComplete;
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
      }

      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
      }

      function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }
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
	},500);
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

var myVar;
function funkcja(x)
        	{
        		var i=1;
        		myVar = setInterval(function(){
        			if(i==0){
        				i=1;
        			}
        			i=i%7;
        			x.src = "images/pic0" + i + ".jpg";
        			x.style.width = "15%";
        			x.style.height = "15%";
        			i++;
        			//alert(x.src);
        		}, 1000);
        		
        		
        	}       
function funkcja_powrot(x){
	clearInterval(myVar);
	x.src = 'images/60.jpg';
}        	

$(document).ready(function(){
		
	
	$.ajax({
        url: "php/sesja.php",
        success : function(msg){
			if(msg == 'nieznany')
            {
            	
            	document.getElementById("logowanie").innerHTML = "Zaloguj";
            	document.getElementById("logowanie").href = "logowanie_new.html";
            
				document.getElementById("konto").style.display = "none";
				document.getElementById("rejestracja").style.visibility = "visible";
            	
			}
            else
			{	
				
				var dane = JSON.parse(msg);	
				document.getElementById("login_aktualizacja").value = dane.login;
				login = dane.login;	
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
        success: function(msg){
        	
        	
        	elo1 = msg.replace(/}{/g, "},{");
        	var elo2 = "[" + elo1 + "]";
        	//alert(elo2);
        	var obj = $.parseJSON(elo2);
        	var lang = '';
        	 $.each(obj, function() {
        	document.getElementById("filmy").innerHTML += "<div id='film'> <a href='" + this['sciezka'] + "'>" + "<img id='zdjecie' onmouseover='funkcja(this)' onmouseout = funkcja_powrot(this)  src='images/60.jpg'></a><p> Tytul: " + this['tytul'] + "</p><p> Opis: " + this['opis'] + "</p><p> Autor: " + this['autor'] + "</p><p> Ocena: " + this['ocena'] + "</p><a href='" + this['sciezka'] + "'>" + this['tytul'] + "</a></br></div>";
        	//document.getElementById("filmy").innerHTML += "<p> Tytul: " + this['tytul'] + "</p>";
        	//document.getElementById("filmy").innerHTML += "<p> Opis: " + this['opis'] + "</p>";
        	//document.getElementById("filmy").innerHTML += "<p> Autor: " + this['autor'] + "</p>";
        	//document.getElementById("filmy").innerHTML += "<p> Ocena: " + this['ocena'] + "</p>";
        	//document.getElementById("filmy").innerHTML += "<a href='" + this['sciezka'] + "'>" + this['tytul'] + "</a></br></div>";
			});
			
			
        	/*var data = [{"Id": 10004, "PageName": "club"},{"Id": 10040, "PageName": "qaz"},{"Id": 10059, "PageName": "jjjjjjj"},];
        	$.each(data, function(i,item){
        		alert(data[i].PageName);
        	}); */ 
        	
        	/*
        	document.getElementById("filmy").innerHTML += "<a onmouseover = funkcja() onmouseout = funkcja_powrot() href='" + dane.sciezka + "'>" + "<img id='zdjecie'  src='images/60.jpg'></a>";
        	document.getElementById("filmy").innerHTML += "<p> Tytul: " + dane.tytul + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Opis: " + dane.opis + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Autor: " + dane.autor + "</p>";
        	document.getElementById("filmy").innerHTML += "<p> Ocena: " + dane.ocena + "</p>";
        	document.getElementById("filmy").innerHTML += "<a href='" + dane.sciezka + "'>" + dane.tytul + "</a>";
			*/
        	
			//alert(dane.tytul);
			//alert(dane.opis);
		
			
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 
	
});