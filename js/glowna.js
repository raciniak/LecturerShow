
var intervalHandler;
function changeVideo(tab_src) {
	mini_player = document.getElementById("mini_player");
	var i = 0;
	intervalHandler=setInterval(function(){
		i++;
		i = i % 4;
		mini_player.src = "res/" + tab_src[i] + "/speech.mp4";
	},20000);
}

function srcVideo() {
	mini_player = document.getElementById("mini_player");
	sciezka = mini_player.src;
	sciezka = sciezka.slice(sciezka.length-22,sciezka.length-11);
	document.location.href = "player.html?id=" + sciezka;
}  

function changeSrcVideo(x){
	mini_player = document.getElementById("mini_player");
	mini_player.src =  "res/" + x + "/speech.mp4";
	clearInterval(intervalHandler);
}

$(document).ready(function(){
	$.ajax({
        url: "php/najpopularniejsze_5.php",
        success: function(msg){
        	
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	var tab = new Array(4);
        	var i = 0;
        	
        	 $.each(obj, function() {
        	tab[i] = this['sciezka']; 	
        	
        	document.getElementById("video_list").innerHTML += "<li class='li_lista_5'><div id='film_zdjecie_5'>" + 
        														"<img id='zdjecie_5' onclick ='changeSrcVideo(\u0022" + this['sciezka']  + "\u0022)' onmouseover='funkcja(this," + "\u0022" + this['sciezka'] + "\u0022" + ")'" + 
							      " onmouseout = funkcja_powrot(this,\u0022"  + this['sciezka'] + "\u0022) " + "src='res/" + this['sciezka'] + "/1.png'></div><div id='opis_5'><p> Tytul: " + 
							      this['tytul'] + "</p><p> Autor: " + 
							      this['autor'] + "</p><p> Wyświetlenia: " + this['wyswietlenia'] + "</p></div></li>";
							      i++;
        	});
        	mini_player = document.getElementById("mini_player");
        	mini_player.src = "res/" + tab[0] + "/speech.mp4";
       		changeVideo(tab);
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
});