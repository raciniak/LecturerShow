var login;

/* funkcje odpowiadająca za wybranie filmu/slajów */
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

/* funkcja wysyłająca filmy/slajdy na serwer */
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

/* funkcja odpowiadająca za pasek postępu */
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

/* funkcje wykonujące się po poprawnym wykonaniu powyższych funkcji */
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
      
/* funkcja wysyłajaca dane z formularza kontaktowego */      
function sendReport() {
	var fd = new FormData();
	fd.append("e-mail", document.getElementById("e-mail_formularz").value);
	fd.append("tresc", document.getElementById("opis_formularz").value);
	var xhr = new XMLHttpRequest;
	xhr.addEventListener("load", sendReportComplete, false);
	xhr.addEventListener("error", sendReportError, false);
	xhr.addEventListener("abort", sendReportError, false);
	xhr.open("POST","php/sendReport.php");
	xhr.send(fd);
}

/* funkcja wykonująca się po poprawnym wykonaniu się funkcji sendReport */
function sendReportComplete(evt) {
	document.getElementById("e-mail_formularz").value = '';
	document.getElementById("opis_formularz").value = ' ';
}

/* funkcja wykonujaca się po błędnym wykonianiu się funkcji sendReport */
function sendReportError() {
	alert("Błąd wysłania zgłoszenia");
	setTimeout(function(){
		document.location.href = "index.html";
	},5000);
}

/* funkcja dodająca komentarz do bazy */
function addComment() {
	sciezka = document.location.search;
	sciezka = sciezka.slice(sciezka.indexOf('=')+1, sciezka.length);
	var fd = new FormData();
	fd.append("autor", login);
	fd.append("sciezka", sciezka);
	fd.append("tresc", document.getElementById("comment_area").value);
	var xhr = new XMLHttpRequest;
	xhr.addEventListener("load", sendCommentComplete, false);
	xhr.open("POST","php/addComment.php");
	xhr.send(fd); 
}

/* funkcja wykonująca się po błędnym wykonaniu się funcji addComment */
function sendCommentComplete() {
	document.getElementById("comment_area").value = '';
	document.getElementById("opacity_site").style.opacity = "0.4";
	document.getElementById("popup").style.visibility = "visible";
	document.getElementById("popup_text").innerHTML = "Dodano komentarz";
	setTimeout(function(){
		window.location.reload();
	},2000);
}

/* funkcja wykonująca się po poprawnym wykonaniu się funkcji sendReport */
function sendReportComplete(evt) {
	document.getElementById("e-mail_formularz").value = '';
	document.getElementById("opis_formularz").value = ' ';
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
	xhr.addEventListener("load", sendComplete, false);
	xhr.addEventListener("abort", sendError, false);
	xhr.addEventListener("error", sendError, false);
	xhr.open("POST", "php/rejestracja.php");
	xhr.send(fd);
	}

function sendComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="index.html";
	},100);
}

function sendError() {
	alert("Błąd rejestracji. Proszę spróbować jeszcze raz");
	setTimeout(function() {
		document.location.href = "rejestracja_new.html";
	},5000);
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
	xhr.addEventListener("abort", uploadError, false);
	xhr.addEventListener("error", uploadError, false);
	xhr.open("POST", "php/zmien_dane.php");
	xhr.send(fd);
}

// funkcja wykonująca się po poprawnym wykonaniu funkcji wysylajacej (sendUserData) i aktualizującej dane (updateUserData)
function uploadComplete(evt) {
	alert(evt.target.responseText);
	setTimeout(function(){
		window.location.href="konto_new.html";
	},100);
}

function uploadError() {
	alert("Błąd aktualizacji danych. Proszę spróbować jeszcze raz");
	setTimeout(function() {
		document.location.href = "konto_new.html";
	},5000);
}
// funkcja logowania
function logIn() { /*
	document.getElementById("opacity_site").style.opacity = "0.4";
	document.getElementById("popup").style.visibility = "visible";
	var fd = new FormData();
	fd.append("login_l", document.getElementById('login_l').value);
	fd.append("haslo_l", document.getElementById('haslo_l').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logInLoadComplete, false);
	xhr.addEventListener("error", logInError, false);
	xhr.addEventListener("abort",logInError, false);
	xhr.open("POST", "php/logowanie.php");
	xhr.send(fd);
	setInterval(function(){
		document.getElementById("popup_text").innerHTML = "Loguje";
	},100);
	setTimeout(function(){
		document.getElementById("popup_text").innerHTML = "Zalogowany";
	},1000); */
	
	var hr = new XMLHttpRequest();
    var url = "php/logowanie.php";
    var login_l = document.getElementById("login_l").value;
    var haslo_l = document.getElementById("haslo_l").value;
    var vars = "login_l="+login_l+"&haslo_l="+haslo_l;
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
   		if(hr.readyState == 4 && hr.status == 200) {
   			document.getElementById("popup_text").innerHTML = "Zalogowany";
 			document.location.href="index.html";
   		}
    }
    hr.send(vars);
	document.getElementById("opacity_site").style.opacity = "0.4";
	document.getElementById("popup").style.visibility = "visible";
	alert();
	document.getElementById("popup_text").innerHTML = "Loguje";	
}

// funkcja wykonująca się po poprawnym zalogowaniu się
function logInLoadComplete(ext) {
	setTimeout(function(){
		document.getElementById("popup_text").innerHTML = "Zalogowany";
	},0);
	document.location.href="index.html";
} 

// funkcja wykonująca się po błędzie logowania 
function logInError(ext) {
	alert(ext.target.responseText);
	alert("Błąd logowania. Proszę spróbować ponownie.");
	setTimeout(function(){
		document.location.href="logowanie_new.html";
	},5000);
}

// funkcja wylogowująca użytkownika
function logOut() {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", logOutLoadComplete, false);
	xhr.addEventListener("error", logOutError, false);
	xhr.addEventListener("abort", logOutError, false);
	xhr.open("POST", "php/wyloguj.php");
	xhr.send();
	document.getElementById("konto").style.display = "none";
}

// funkcja wykonująca się po poprawnym wylogowaniu się
function logOutLoadComplete() {
	document.getElementById("konto").style.display = "none";
	setTimeout(function(){
		window.location.href="logowanie_new.html";
	},5);
}
// funkcja wykonująca się po błędzie podczas wylogowywania się
function logOutError() {
	alert("Błąd wylogowywania. Proszę spróbować ponownie.");
	setTimeout(function(){
		document.location.href="index.html";
	},5000);
}

// funkcja wysyłająca treść inputa wyszukiwarki 
function searchVideo() {
	var fd = new FormData();
	fd.append("title_l", document.getElementById('searchinput').value);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", searchVideoComplete, false);
	xhr.addEventListener("error", searchVideoError, false);
	xhr.addEventListener("abort", searchVideoError, false);
	xhr.open("POST", "php/search.php");
	xhr.send(fd);
}

// funkcja wykonująca się po poprawnym wykonaniu funkcji searchVideo	
function searchVideoComplete(evt) {
	window.location.href = "results.html";
}

// funkcja wykonująca się po errorze w funkcji searchVideo
function searchVideoError() {
	window.location.href = "index.html";
} 
var myVar;

// funkcja zmieniajaca obrazki miniaturek
function funkcja(x, path) {
	var i=1;
    myVar = setInterval(function(){
        i=i%4;
        if(i==0){
        	i=1;
        }
        x.src = "res/" + path + "/snapshots/" + i + ".png";
        i++;
	}, 1000);
}    
// cd funkcji
function funkcja_powrot(x, path){
	clearInterval(myVar);
	x.src = "res/" + path +'/snapshots/1.png';
}        	

$(document).ready(function(){
	$(window).bind('scroll', function() {
    	var margin = ($(window).width()-1200)/2;
    	if ($(window).scrollTop() >= $( '.subpage #header-wrapper' ).height()) {
    	document.getElementById("wyszukiwarka").style.position = "fixed";
      	document.getElementById("wyszukiwarka").style.top = "0px";  
        document.getElementById("wyszukiwarka").style.marginLeft = margin + "px"; 
        document.getElementById("wyszukiwarka").style.height= "5.7%"; 
        document.getElementById("wyszukiwarka").style.borderRadius= "0px 0px 5px 5px";
        document.getElementById("logo_search").style.display= "inline-block"; 
        document.getElementById("logo_search").style.cssFloat = "left";	
		}
	    else{
	        document.getElementById("wyszukiwarka").style.position = "";
	        document.getElementById("wyszukiwarka").style.top = "0px"; 
	        document.getElementById("wyszukiwarka").style.borderRadius= ""; 
			document.getElementById("logo_search").style.display= "none"; 
	    }
	});
	// funkcje zmieniające obrazki linków
	$('#fb_link').hover(
	    function(){
	      $(this).attr('src','images/icons/fb_hover.png');
	    },
	    function(){
	      $(this).attr('src','images/icons/fb.png');
	    }
	);
   $('#tw_link').hover(
	    function(){
	      $(this).attr('src','images/icons/twitter_hover.png');
	    },
	    function(){
	      $(this).attr('src','images/icons/twitter.png');
	    }
	);
   $('#wmii_link').hover(
	    function(){
	      $(this).attr('src','images/icons/wmii_hover.png');
	    },
	    function(){
	      $(this).attr('src','images/icons/wmii.png');
	    }
	);
	
	// funkcja pobierająca dane sesji
	$.ajax({
        url: "php/sesja.php",
        success : function(msg){
			if(msg == 'nieznany')
            {
            	if(window.location.pathname == "/konto_new.html")
            	{
            		window.location.href = "logowanie_new.html";
            	}
            	document.getElementById("logowanie").innerHTML = "Zaloguj";
            	document.getElementById("logowanie").href = "logowanie_new.html";
            	document.getElementById("konto").style.display = "none";
				document.getElementById("rejestracja").style.visibility = "visible";
				document.getElementById("comment_p").style.width = "40%";
				document.getElementById("comment_p").innerHTML = "Zaloguj się aby dodawać komentarze";
				document.getElementById("comment_area").style.display = "none";
				document.getElementById("comment_button").style.display = "none";
				document.getElementById('rate').style.zIndex = "1";
            }
            else
			{	
				if(window.location.pathname == "/rejestracja_new.html")
            	{
            		window.location.href = "konto_new.html";
            	}
				var dane = JSON.parse(msg);	
				login = dane.login;
				document.getElementById("konto").innerHTML= dane.login;
				document.getElementById("konto").style.visibility = "visible";
				document.getElementById("rejestracja").style.display = "none";
				document.getElementById("logowanie").innerHTML = "Wyloguj";
				document.getElementById("logowanie").onclick = logOut;	
				document.getElementById("login_aktualizacja").value = dane.login;
				document.getElementById("haslo1_aktualizacja").value = dane.haslo;
				document.getElementById("haslo2_aktualizacja").value = dane.haslo;
				document.getElementById("email1_aktualizacja").value = dane.email;
				document.getElementById("email2_aktualizacja").value = dane.email;
				document.getElementById("imie_aktualizacja").value = dane.imie;
				document.getElementById("nazwisko_aktualizacja").value = dane.nazwisko;
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
	
	// funkcja pobierająxa statystyki serwisu
	$.ajax({
        url: "php/statystyki.php",
        success : function(msg){
			var dane_serwisu = JSON.parse(msg);
			document.getElementById("liczba_uzytkownikow_s").innerHTML = "Ilość użytkowników: " + dane_serwisu.liczba_uzytkownikow;
			document.getElementById("liczba_filmow_s").innerHTML = "Ilość filmów: " + dane_serwisu.liczba_filmow;
			document.getElementById("liczba_wyswietlen_s").innerHTML = "Łączna ilość wyświetleń: " + dane_serwisu.liczba_wyswietlen;
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 
	
	// funkcja wyświetlająca filmy zalogowanego użytkownika
	$.ajax({
        url: "php/search_my_videos.php",
        success: function(msg){
        	if(msg == 0) { 
        		document.getElementById("filmy").innerHTML = "<p> Nie dodałeś żadnego filmu do LecturerShow</p>";
        	}
        	else 
        	{
	        	msg = msg.replace(/}{/g, "},{");
	        	msg = "[" + msg + "]";
	        	//alert(elo2);
	        	var obj = $.parseJSON(msg);
	        	var lang = '';
	        	$.each(obj, function() {
	        	document.getElementById("filmy").innerHTML += "<li id='li_lista'><div id='film'>" +  
								      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
								      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
								      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a><a href='player.html?id=" + this['sciezka'] + "'><p>" + this['tytul'] + 
								      "</p></a><p id='results_p'> Opis: " + this['opis'] + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
								      "</p><p id='results_p'> Wyświetlenia: " + this['wyswietlenia'] + "</p><a href='editor_new.html?id=" + this['sciezka'] + "'><p>Edytuj ten film</p></a></div></li>";
	        	}); 
        	}
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 
	
	// funkcja pobierająca najnowsze filmy z bazy
	$.ajax({
        url: "php/najnowsze.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	//alert(msg);
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("najnowsze").innerHTML += "<li id='li_lista'><div id='film'>" +  
							      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
							      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a><a id='title_video_result' href='player.html?id=" + this['sciezka'] 
							      + "'>" + this['tytul'] + 
							      "</a><p id='results_p'> Opis: " + this['opis'] + "</p><p id='results_p'> Autor: " + 
							      this['autor'] + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
							      "</p></div></li>";
        	});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	
	// j.w ... najlepsze
	$.ajax({
        url: "php/najlepsze.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("najlepsze").innerHTML += "<li id='li_lista'><div id='film'>" +  
							      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
							      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] +"\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + 
							      "/snapshots/1.png'></a><a id='title_video_result' href='player?id=" + this['sciezka'] + "'>" + this['tytul'] + 
							      "</a><p id='results_p'> Opis: " + this['opis'] + "</p><p id='results_p'> Autor: " + 
							      this['autor'] + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
							      "</p></div></li>";
        	});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	
	// j.w. najpopularniejsze
	$.ajax({
        url: "php/najpopularniejsze.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("popularne").innerHTML += "<li id='li_lista'><div id='film'>" +  
							      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
							      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + 
							      this['sciezka'] + "/snapshots/1.png'></a><a id='title_video_result' href='player.html?id=" + this['sciezka'] +
							      "'>" + this['tytul'] + "</a><p id='results_p'> Opis: " + this['opis'] + "</p><p id='results_p'> Autor: " + 
							      this['autor'] + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
							      "</p></div></li>";
        	}); 
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 
	
	// podobne funkcje co wyżej tylko do sliderow strony glownej
	$.ajax({
        url: "php/najnowsze_slider.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("najnowsze_slider").innerHTML += "<li><div id='film_slider'><div id='zdjecie_li'><a href='player.html?id=" + this['sciezka'] +
        							 "'><img id='zdjecie_slider' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a></div><div id='opis_li'><p id='title_video_slider' >" + 
							      this['tytul'] + "</p><a href='user.html?name=" + this['autor'] + "' id='autor_slider'>" + 
							      this['autor'] + "</a><p> Wyświetlenia: " + this['wyswietlenia'] + "</p></br></div></div></li>";
        	});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});

	$.ajax({
        url: "php/najlepsze_slider.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("najlepsze_slider").innerHTML += "<li><div id='film_slider'><div id='zdjecie_li'><a href='player.html?id=" + this['sciezka'] +
        							 "'><img id='zdjecie_slider' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a></div><div id='opis_li'><p id='title_video_slider' >" + 
							      this['tytul'] + "</p><a href='user.html?name=" + this['autor'] + "' id='autor_slider'>" + 
							      this['autor'] + "</a><p> Ocena: " + this['ocena'] + "</p></br></div></div></li>";
        	});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	
	$.ajax({
        url: "php/najpopularniejsze_slider.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("popularne_slider").innerHTML += "<li><div id='film_slider'><div id='zdjecie_li'><a href='player.html?id=" + this['sciezka'] +
        							 "'><img id='zdjecie_slider' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'>" + "</a></div><div id='opis_li'><p id='title_video_slider' >" + 
							      this['tytul'] + "</p><a href='user.html?name=" + this['autor'] + "' id='autor_slider'>" + 
							      this['autor'] + "</a><p> Wyświetlenia: " + this['wyswietlenia'] + "</p></br></div></div></li>";
        	}); 
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});  
	
	// funkcja pobierająca dane filmów wyszukanych przez uzytkownika
	 $.ajax({
        url: "php/suggest.php",
        success: function(msg){
        	var tab = new Array;
        	i=0;
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	var obj = $.parseJSON(msg);
        	$.each(obj, function() {
        		tab[i] = this['title'];
        		i++;
        	}); 
			var availableTags = tab;
			$( "#searchinput" ).autocomplete({
				source: availableTags
			});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	}); 

});