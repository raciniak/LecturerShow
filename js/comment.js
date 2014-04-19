var sciezka = document.location.search;
sciezka = sciezka.slice(sciezka.indexOf('=')+1, sciezka.length);

var fd = new FormData();
	fd.append("sciezka", sciezka);
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "php/search.php");
	xhr.send(fd);
	
$(document).ready(function() {
	
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
});