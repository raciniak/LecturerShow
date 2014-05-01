var sciezka = document.location.search;
sciezka = sciezka.slice(sciezka.indexOf('=')+1, sciezka.length);

var fd = new FormData();
fd.append("sciezka", sciezka);
var xhr = new XMLHttpRequest();
xhr.open("POST", "php/search.php");
xhr.send(fd);

var fd2 = new FormData();
fd2.append("sciezka", sciezka);
var xhr2 = new XMLHttpRequest();
xhr2.open("POST", "php/add_view.php");

$(document).ready(function() {
	 $('.basic').jRating();

	
	$.ajax({
        url: "php/showComments.php",
        success: function(msg){
        	if(msg == 'BRAK') {
        		document.getElementById("comments").innerHTML = "<p>Ten film nie ma jeszcze komentarzy. Bądź pierwszy</p>";
        	}
        	else {
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	$.each(obj, function() {
        	document.getElementById("comments").innerHTML += "<li id='comment'><a id='autor_comment' href='user.html?name=" + this['autor'] + "'>" + 
        	this['autor'] + "</a><p id='date_comment'>Dodany: " + this['data'] + "</p><p id='content_comment'>" + this['tresc'] + "</p></li>";
        	}); }
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	
	$.ajax({
        url: "php/showVideoInfo.php",
        success: function(msg){
        	var data = JSON.parse(msg);
        	document.getElementById("autor_video_player").innerHTML = "<a href='user.html?name=" + data.autor + "'>" + data.autor+ "</a>";
        	document.getElementById("title_tab").innerHTML = data.tytul + " - LecturerShow.pl";
        	document.getElementById("title_video_player").innerHTML = "<p id='title_video_p'>" + data.tytul + "</p>";
        	document.getElementById("description_video_player").innerHTML = "<p id='description_video_p'>" + data.opis + "</p>";
        	document.getElementById("views_video_player").innerHTML ="<p id='views_video_p'>" + data.wyswietlenia + " wyswietleń</p>";
        	if(data.suma_ocen==0 || data.liczba_ocen==0) {
        		var ocena = 0;
        	$('.jRatingColor').width(ocena + 'px');
        	}
        	else {
        	var ocena = data.suma_ocen / data.liczba_ocen;
        	ocena = ocena * 23;
        	$('.jRatingColor').width(ocena + 'px');
        	}
        //	document.getElementsByClassName("jRatingColor").style.boxShadow= "0 0 3px 3px #F00";
        
        	//document.getElementById("rate_video_player").innerHTML = "<p>" + data.ocena + "</p>";
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
	
	$.ajax({
        url: "php/add_view.php",
        success: function(msg){
        	var odp = msg;
        	if(odp!=0) {
        		var ocena = msg * 23;
        		$('.jRatingAverage').width(ocena + 'px');
        		$('.jRatingColor').width('0px');
        		document.getElementById('rate').style.zIndex = "1";
        	}
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
});