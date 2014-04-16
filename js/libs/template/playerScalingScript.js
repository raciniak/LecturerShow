/*
 * 
 *  Skrypt odpowiada za skalowanie playera, ustalanie rozmiaru pliku wideo i slajdów, które wyświetlają się po prawej stronie
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */

var playerEffectClick = 2;
var beginWidth = 0;
var beginHeight = 0;
var beginVideoMarginBottom = 0;
var beginPlayerScreenHeight = 0;
var videoWidth = 0;
var videoHeight = 0;
var imageWidth = 0;
var imageHeight = 0;
var imageMarginChanged = false;
$(document).ready(function () {

	// Player screen
	var playerScreen = $("#myPlayer .playerScreen")[0];
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
  		
  		beginWidth = videoWidth;
  		beginHeight = videoHeight;
  		beginVideoMarginBottom = $(player).css("margin-bottom");
  		beginPlayerScreenHeight = $(playerScreen).height()+27;

  		
  		$(playerScreen).css("height", videoHeight+27+"px");
  		$(imageLoader).css("height", videoHeight+"px");
  		$(player).css("height", videoHeight+"px");
	});
	
	
	
		/* Efekty playera po kliknieciu */
		$(video).click(function() {
				
			if(!fullScreenOn)
			{
				videoWidth = $(video).width();
				videoHeight = $(video).height();
				imageWidth = $(imageLoader).width();
				imageHeight = $(imageLoader).height();
				//alert(videoWidth + "x" + videoHeight + ", " + imageWidth + "x" + imageHeight);
				
				switch(playerEffectClick)
				{
					case 1:
							$(imageLoader).css("margin-left", 0+"px");
							imageMarginChanged = false;
					
						$(player).css("margin-bottom", beginVideoMarginBottom);				
					
						$(video).css("width", beginWidth+"px");
						$(video).css("height", beginHeight+"px");
						$(imageLoader).css("width", beginWidth+"px");
						$(imageLoader).css("height", beginHeight+"px");
						$(video).css("margin-bottom", newMargin);
						$(playerScreen).css("height", beginPlayerScreenHeight+"px");		
		
		
						playerEffectClick++;
					break;
					case 2:
					
						var marginBottom = $(player).css("margin-bottom");
						var newMargin = marginBottom.substr(0, marginBottom.length - marginBottom.lastIndexOf("px"));
						$(player).css("margin-bottom", parseInt(newMargin)+videoHeight/3);
								
						
						$(video).css("width", videoWidth+imageWidth/3+"px");
						$(video).css("height", videoHeight+imageHeight/3+"px");
						$(imageLoader).css("width", imageWidth/1.5+"px");
						$(imageLoader).css("height", imageHeight/1.5+"px");
						$(playerScreen).css("height", $(playerScreen).height()+videoHeight/3+"px");		
						
						playerEffectClick++;
					break;
					case 3:
						var marginBottom = $(player).css("margin-bottom");
						var newMargin = marginBottom.substr(0, marginBottom.length - marginBottom.lastIndexOf("px"));
						$(player).css("margin-bottom", parseInt(newMargin)+videoHeight/2.15);
								
						
						$(video).css("width", videoWidth+imageWidth/2.5+"px");
						$(video).css("height", videoHeight+imageHeight/2.5+"px");
						$(imageLoader).css("width", imageWidth/1.7+"px");
						$(imageLoader).css("height", imageHeight/1.7+"px");
						$(playerScreen).css("height", $(playerScreen).height()+videoHeight/2.5+"px");		
						
						playerEffectClick=1;
					break;
					default:
						alert("Jakis blad, zmienna playerEffectClick nie moze byc inna!");
					break;
				}
			}
			
		});
		
		
		$(imageLoader).click(function() {
			if(!fullScreenOn)
			{		
				switch(playerEffectClick)
				{
					case 1:
						if( imageMarginChanged )
						{
							$(imageLoader).css("margin-left", 0+"px");
							$("#myPlayer .playerScreen #myVideo")[0].css("margin-left", 100+"px");
							imageMarginChanged = false;
						}else{
							$(imageLoader).css("margin-left", -100+"px");
							imageMarginChanged = true;
						}
		
					break;
					case 2:
		
						
					break;
					case 3:
						if( imageMarginChanged )
						{
							$(imageLoader).css("margin-left", 0+"px");
							$("#myPlayer .playerScreen #myVideo")[0].css("margin-left", 100+"px");
							imageMarginChanged = false;
						}else{
							$(imageLoader).css("margin-left", -100+"px");
							imageMarginChanged = true;
						}
						
					break;
					default:
						alert("Jakis blad, zmienna playerEffectClick nie moze byc inna!");
					break;
				}
			}
		});
	
	
	
	
});