$(document).ready(function(){
	$.ajax({
        url: "php/najpopularniejsze_5.php",
        success: function(msg){
        	
        	msg = msg.replace(/}{/g, "},{");
        	msg = "[" + msg + "]";
        	
        	var obj = $.parseJSON(msg);
        	var lang = '';
        	 $.each(obj, function() {
        	document.getElementById("video_list").innerHTML += "<li class='li_lista_5'><div id='film_zdjecie_5'>" +  
							      "<a href='" + this['sciezka'] + "'>" + 
							      "<img id='zdjecie_5' onmouseover='funkcja(this)'" + 
							      " onmouseout = funkcja_powrot(this)  src='images/60.jpg'></a></div><div id='opis_5'><p> Tytul: " + 
							      this['tytul'] + "</p><p> Opis: " + this['opis'] + "</p><p> Autor: " + 
							      this['autor'] + "</p></div></li>";
        	});
		},
		error: function(err) 
		{
        	console.log(err);
    	}
	});
});