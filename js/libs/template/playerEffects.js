/*
 * 
 *  Skrypt odpowiada za wszystkie efekty graficzne w plejerze
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */

var panelIsOpened = false;
$(document).ready(function () {

	var playPauseButton = $("#playButton")[0];
	var stopButton = $("#stopButton")[0];
	var volumeButton = $("#volumeButton")[0];
	var hdButton = $("#hdButton")[0];
	var fullScreenButton = $("#fullScreenButton")[0];
	var volumePanel = $("#bodyVolumeLine")[0];
	
	
	
	$(volumePanel).hide();
	
	
	$(volumeButton).click(function() {
		if( panelIsOpened)
		{
			$(volumePanel).show();
			panelIsOpened = !panelIsOpened;
		}else{
			$(volumePanel).hide();
			panelIsOpened = !panelIsOpened;
		}
	});
	
	
});