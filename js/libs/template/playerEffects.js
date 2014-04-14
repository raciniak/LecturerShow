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
	
		
	hideVolumePanel();

	$(volumePanel).mouseover(function() {
		mouseOnVolumePanel = true;
	});	
	$(volumePanel).mouseout(function() {
		mouseOnVolumePanel = false;
		setTimeout(function(){hideVolumePanel();}, 200);
	});	
	
	$(volumeButton).mouseover(function() {
		setTimeout(function(){showVolumePanel();}, 200);
	});
	
	$(volumeButton).mouseout(function() {
		setTimeout(function(){hideVolumePanel();}, 200);
		//hideVolumePanel();
	});


	/* FUNKCJE */
	function hideVolumePanel()
	{
		if( !mouseOnVolumePanel )
			$(volumePanel).css("z-index", 1);
	}
	
	function showVolumePanel()
	{
		if( !mouseOnVolumePanel )
			$(volumePanel).css("z-index", 2);
	}	

});


