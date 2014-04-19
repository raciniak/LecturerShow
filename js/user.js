alert(window.location.href);
var nick = window.location.href;
var pozycja = nick.indexOf('=');
nick = nick.slice(pozycja+1,nick.length);
alert(nick);
var fd = new FormData();
	fd.append("nick", nick);
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "php/search.php");
	xhr.send(fd);
	alert("elo");
function searchUser() {
	alert("elo");
}

$(document).ready(function() {
	alert("sss0");
	$.ajax({
        url: "php/user.php",
        success: function(msg){
        	alert("AJAX: "+msg);
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});  
});

