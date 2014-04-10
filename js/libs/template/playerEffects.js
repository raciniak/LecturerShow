/*
 * 
 *  Skrypt odpowiada za wszystkie efekty graficzne w plejerze
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */

var mouseOnVolumePanel = false;
$(document).ready(function () {

	var playPauseButton = $("#playButton")[0];
	var stopButton = $("#stopButton")[0];
	var volumeButton = $("#volumeButton")[0];
	var hdButton = $("#hdButton")[0];
	var fullScreenButton = $("#fullScreenButton")[0];
	var volumePanel = $("#bodyVolumeLine")[0];
	
	
	
	$(volumePanel).hide();
	
	
	$(volumeButton).mouseover(function() {
			$(volumePanel).show();
	});
	
	$(volumeButton).mouseout(function() {
		if( !mouseOnVolumePanel )
			$(volumePanel).hide();
	});
	
	$(volumePanel).mouseover(function() {
			mouseOnVolumePanel = true;
	});
	$(volumePanel).mouseout(function() {
			mouseOnVolumePanel = false;
	});
	
	
	
});