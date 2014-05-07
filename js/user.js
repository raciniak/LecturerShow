var nick = window.location.href;
var pozycja = nick.indexOf('=');
nick = nick.slice(pozycja+1,nick.length);

var fd = new FormData();
	fd.append("nick", nick);
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "php/search.php");
	xhr.send(fd);

$(document).ready(function() {

	$.ajax({
        url: "php/user.php",
        success: function(msg){
        	if(msg == 'ERROR') {
        		document.getElementById("opacity_site").style.opacity = "0.4";
				document.getElementById("popup").style.visibility = "visible";
				document.getElementById("popup_text").innerHTML = "Nie ma takiego użytkownika";
				setTimeout(function(){
					document.getElementById("popup_text").innerHTML = "Powrót do strony głównej";
					window.location.href = "index.html";
				},5000);
        	}
        	else
        	var dane = JSON.parse(msg);	
				document.getElementById('user_name').innerHTML = "Profil użytkownika " + dane.imie + " " +
				dane.nazwisko + " (" + dane.login + ")";
				document.getElementById('user_name_p').innerHTML = dane.imie + " " + dane.nazwisko;
				document.getElementById('user_e-mail').innerHTML = "E-mail: " + dane.email;
				document.getElementById('count_videos').innerHTML = "Ilość filmów: " + dane.ilosc_filmow;
				document.getElementById('sum_views').innerHTML = "Ilość wyświetleń filmów użytkownika " + dane.login + ": " + dane.sum_view;
				document.getElementById('avg_rate').innerHTML = "Średnia ocen: " + dane.srednia;
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});  
	
	$.ajax({
        url: "php/search_user_videos.php",
        success: function(msg){
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	//alert(msg);
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	
        	$.each(obj, function() {
        	/*document.getElementById("user_videos").innerHTML += "<li id='li_lista'><div id='film'>" +  
							      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
							      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
							      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a><a id='title_video_result' href='player.html?id=" + this['sciezka'] 
							      + "'>" + this['tytul'] + 
							      "</a><p id='results_opis'> Opis: " + this['opis'] + "</p><p id='results_p'> Wyświetlenia: " + 
							      this['wyswietlenia'] + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
							      "</p></div></li>"; */
			if (this['opis'].length > 14) {
				var opis = this['opis'].slice(0,14);
				opis = opis.concat("...");
			}				   
			else 
			{
				var opis = this['opis'];
			}  
			document.getElementById("filmyy").innerHTML += "<li id='li_lista'>" +  
								      "<a href='player.html?id=" + this['sciezka'] + "'>" + 
								      "<img id='zdjecie' onmouseover='funkcja(this,\u0022" + this['sciezka'] + "\u0022)'" + 
								      " onmouseout = funkcja_powrot(this,\u0022" + this['sciezka'] + "\u0022)  src='res/" + this['sciezka'] + "/snapshots/1.png'></a><a href='player.html?id=" + this['sciezka'] + "'>" + this['tytul'] + 
								      "</a><p id='results_p'> Opis: " + opis + "</p><p id='results_p'> Ocena: " + this['ocena'] + 
								      "</p><p id='results_p'> Wyświetlenia: " + this['wyswietlenia'] + "</p></li>";				     
        	});
        	
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
});

