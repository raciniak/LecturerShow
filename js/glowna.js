

function changeVideo(tab_src) {
	
	mini_player = document.getElementById("mini_player");
	var i = 0;
	var intervalHandler=setInterval(function(){
		i++;
		i = i % 4;
		mini_player.src = tab_src[i];
		//alert(i);
	},5000);
	
}

function srcVideo() {
	mini_player = document.getElementById("mini_player");
	sciezka = mini_player.src;
	document.location.href = sciezka;
}  

function changeSrcVideo(x){
	mini_player = document.getElementById("mini_player");
	mini_player.src =  x + "/speech.mp4";
	clearInterval(intervalHandler);
	alert("ergh");
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
        	document.getElementById("video_list").innerHTML += "<li class='li_lista_5'><div id='film_zdjecie_5'>" + "<img id='zdjecie_5' onclick = 'changeSrcVideo(\u0022" + 
        							this['sciezka']  + "\u0022)' onmouseover='funkcja(this)'" + 
							      " onmouseout = funkcja_powrot(this) src='images/60.jpg'></div><div  id='opis_5'><p> Tytul: " + 
							      this['tytul'] + "</p><p> Opis: " + this['opis'] + "</p><p> Autor: " + 
							      this['autor'] + "</p></div></li>";
							      i++;
        	});
        	mini_player = document.getElementById("mini_player");
        	mini_player.src = tab[0];
        	changeVideo(tab);
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
});