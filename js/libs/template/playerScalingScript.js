/*
 * 
 *  Skrypt odpowiada za skalowanie playera, ustalanie rozmiaru pliku wideo i slajdów, które wyświetlają się po prawej stronie
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */

var playerVideoEffectClick = 2;
var playerImageEffectClick = 2;
var beginWidth = 0;
var beginHeight = 0;
var beginVideoMarginBottom = 0;
var beginPlayerScreenHeight = 0;
var videoWidth = 0;
var videoHeight = 0;
var imageWidth = 0;
var imageHeight = 0;
var videoIsInFull = false;
var imageLoaderIsInFull = false;

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
	// przycisk minimalizacji/maksymilizacji filmu
	var min_max_button_left = $("#maximalize_minimalize_button_left")[0];
	// przycisk minimalizacji/maksymilizacji slajdów
	var min_max_button_right = $("#maximalize_minimalize_button_right")[0];
	
	$(min_max_button_left).hide();
	$(min_max_button_right).hide();
	
	// Kiedy film zostanie załadowany na stronie 
	$(video).bind('loadedmetadata', function(e){
		// Pobieramy wysokość filmu
  		var videoHeight = $(this).height();
  		// Pobieramy szerokość filmu
  		var videoWidth = $(this).width();
  		
  		beginWidth = videoWidth;
  		beginHeight = videoHeight;
  		beginVideoMarginBottom = $(player).css("margin-bottom");
  		beginPlayerScreenHeight = videoHeight+22;

  		
  		$(playerScreen).css("height", beginPlayerScreenHeight+"px");
  		$(imageLoader).css("height", videoHeight+"px");
  		$(player).css("height", videoHeight+"px");
	});
	
	/************* FUNKCJONALNOSCI MIN_MAX_BUTTON **********************/
		$(video).mouseover(function(){
			if(!fullScreenOn)
				if(imageLoaderIsInFull)
					showMinMaxButtonRight();
				else
					showMinMaxButtonLeft();
		});
		$(video).mouseout(function(){
			hideMinMaxButtonLeft();
			hideMinMaxButtonRight();
		});
		$(imageLoader).mouseover(function(){
			if(!fullScreenOn)
				if(videoIsInFull)
					showMinMaxButtonLeft();
				else
					showMinMaxButtonRight();

		});
		$(imageLoader).mouseout(function(){
			hideMinMaxButtonLeft();
			hideMinMaxButtonRight();
		});
	
	
		$(min_max_button_left).mouseover(function() {
			showMinMaxButtonLeft();
		});
		$(min_max_button_right).mouseover(function() {
			showMinMaxButtonRight();
		});
		$(min_max_button_left).mouseout(function() {
			hideMinMaxButtonLeft();
		});
		$(min_max_button_right).mouseout(function() {
			hideMinMaxButtonRight();
		});
	
		function showMinMaxButtonLeft()
		{
			$(min_max_button_left).show();
		}
		function showMinMaxButtonRight()
		{
			$(min_max_button_right).show();
		}
		function hideMinMaxButtonLeft()
		{
			$(min_max_button_left).hide();
		}
		function hideMinMaxButtonRight()
		{
			$(min_max_button_right).hide();
		}
	
		/* efekt klikniecia w przycisk maksymilizacji/minimalizacji filmu */
		$(min_max_button_left).click(function() {
			videoWidth = $(video).width();
			videoHeight = $(video).height();
			
			if( videoWidth == 0 && videoHeight == 0 )
			{
				$(video).css("width", beginWidth+"px");
				$(video).css("height", beginHeight+"px");
				
				$(imageLoader).css("width", beginWidth+"px");
				$(imageLoader).css("height", beginHeight+"px");
				$(playerScreen).css("height", beginPlayerScreenHeight+1+"px");	
				
				var marginBottom = $(player).css("margin-bottom");
				var newMargin = marginBottom.substr(0, marginBottom.length - marginBottom.lastIndexOf("px"));
				$(player).css("margin-bottom", parseInt(newMargin)+videoHeight/3);
				
				$(min_max_button_right).show();
				$(min_max_button_left).css("background-position","top");
				videoIsInFull = false;
								
			}else{
				$(video).css("width", 0+"px");
				$(video).css("height", 0+"px");
				
				$(imageLoader).css("width", beginWidth*2+"px");
				$(imageLoader).css("height", beginHeight*2+"px");
				$(player).css("margin-bottom", beginHeight+20+"px");
				$(playerScreen).css("height", beginHeight*2+11+"px");
				
				$(min_max_button_right).hide();
				$(min_max_button_left).css("background-position","bottom");
				videoIsInFull = true;
			}
			
			$(min_max_button_right).hide();
			
		});
		
		/* efekt klikniecia w przycisk maksymilizacji/minimalizacji slajdów */
		$(min_max_button_right).click(function() {
			videoWidth = $(imageLoader).width();
			videoHeight = $(imageLoader).height();
			
			if( videoWidth == 0 && videoHeight == 0 )
			{

				$(imageLoader).css("width", beginWidth+"px");
				$(imageLoader).css("height", beginHeight+"px");
				
				$(video).css("width", beginWidth+"px");
				$(video).css("height", beginHeight+"px");
				$(playerScreen).css("height", beginPlayerScreenHeight+1+"px");	
				
				var marginBottom = $(player).css("margin-bottom");
				var newMargin = marginBottom.substr(0, marginBottom.length - marginBottom.lastIndexOf("px"));
				$(player).css("margin-bottom", parseInt(newMargin)+videoHeight/3);
				
				$(min_max_button_left).show();
				$(min_max_button_right).css("background-position","top");
				imageLoaderIsInFull = false;
								
			}else{
				$(imageLoader).css("width", 0+"px");
				$(imageLoader).css("height", 0+"px");
				
				$(video).css("width", beginWidth*2+"px");
				$(video).css("height", beginHeight*2+"px");
				$(player).css("margin-bottom", beginHeight+20+"px");
				$(playerScreen).css("height", beginHeight*2+11+"px");
				
				$(min_max_button_left).hide();
				$(min_max_button_right).css("background-position","bottom");
				imageLoaderIsInFull = true;
			}
			
			$(min_max_button_left).hide();
			
		});
	
	/************* FUNKCJONALNOSCI MIN_MAX_BUTTON - KONIEC **********************/

		/* Efekty playera po kliknieciu */
		$(video).click(function() {
			if(!imageLoaderIsInFull && !videoIsInFull && !fullScreenOn)
			{

				videoWidth = $(video).width();
				videoHeight = $(video).height();
				imageWidth = $(imageLoader).width();
				imageHeight = $(imageLoader).height();
				//alert(videoWidth + "x" + videoHeight + ", " + imageWidth + "x" + imageHeight);
				
				switch(playerVideoEffectClick)
				{
					case 1:
						
						$(player).css("margin-bottom", beginVideoMarginBottom);										
						$(video).css("width", beginWidth+"px");
						$(video).css("height", beginHeight+"px");
						$(imageLoader).css("width", beginWidth+"px");
						$(imageLoader).css("height", beginHeight+"px");
						$(player).css("margin-bottom", 20+"px");	
						$(playerScreen).css("height", beginPlayerScreenHeight+"px");	
			
						playerVideoEffectClick++;
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
							
						playerVideoEffectClick++;
					break;
					case 3:
						
						var marginBottom = $(player).css("margin-bottom");
						var newMargin = marginBottom.substr(0, marginBottom.length - marginBottom.lastIndexOf("px"));
						$(player).css("margin-bottom", parseInt(newMargin)+videoHeight/2.15);
										
						$(video).css("width", videoWidth+imageWidth/2.5+"px");
						$(video).css("height", videoHeight+imageHeight/2.5+"px");
						$(imageLoader).css("width", imageWidth/1.7+"px");
						$(imageLoader).css("height", imageHeight/1.7+"px");
						$(playerScreen).css("height", $(playerScreen).height()+videoHeight/5.75+"px");		
							
						playerVideoEffectClick=1;
					break;
					default:
						alert("Jakis blad, zmienna playerVideoEffectClick nie moze byc inna!");
					break;
				}
			}
		});
		
		
		$(imageLoader).click(function() {
			if(!imageLoaderIsInFull && !videoIsInFull && !fullScreenOn)
			{		
				videoWidth = $(video).width();
				videoHeight = $(video).height();
				imageWidth = $(imageLoader).width();
				imageHeight = $(imageLoader).height();
				
				switch(playerImageEffectClick)
				{
					case 1:					
						$(player).css("margin-bottom", beginVideoMarginBottom);										
						$(video).css("width", beginWidth+"px");
						$(video).css("height", beginHeight+"px");
						$(imageLoader).css("width", beginWidth+"px");
						$(imageLoader).css("height", beginHeight+"px");
						$(player).css("margin-bottom", 20+"px");	
					
						$(playerScreen).css("height", beginPlayerScreenHeight+"px");	
						playerImageEffectClick++;
					break;
					case 2:
						
						playerImageEffectClick++;
					break;
					case 3:
					
						playerImageEffectClick=1;
					break;
					default:
						alert("Jakis blad, zmienna playerVideoEffectClick nie moze byc inna!");
					break;
				}
			}
		});
	
	
});