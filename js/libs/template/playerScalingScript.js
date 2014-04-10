/*
 * 
 *  Skrypt odpowiada za skalowanie playera, ustalanie rozmiaru pliku wideo i slajdów, które wyświetlają się po prawej stronie
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */
$(document).ready(function () {

	// Film wideo
	var video = $("#myPlayer .playerScreen #myVideo")[0];
	// Obiekt w którym wyświetlam pliki graficzne
	var imageLoader = $("#myPlayer .playerScreen .imageLoader")[0];
	// Obraz w obiekcie .imageLoader
	var image = $("#myPlayer .playerScreen .imageLoader img")[0];
	// Obiekt myPlayer, w nim umieszczone są wszystkie powyższe elementy
	var player = $("#myPlayer")[0];


	
	// Kiedy film zostanie załadowany na stronie 
	$(video).bind('loadedmetadata', function(e){
		// Pobieramy wysokość filmu
  		var videoHeight = $(this).height();
  		// Pobieramy szerokość filmu
  		var videoWidth = $(this).width();
  		
  		$(imageLoader).css("width", videoWidth+"px");
  		$(imageLoader).css("height", videoHeight+"px");
  		$(player).css("width", videoWidth+videoHeight+135+"px");
  		
  		$(image).show();
	});
	
	
});