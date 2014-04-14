/*
 * 
 *  Skrypt odpowiada za wszystkie efekty graficzne w plejerze
 * 
 *  Autor: Krzysztof Raciniewski
 * 
 */

var mouseOnVolumePanel = false;
var mouseOnQualityPanel = false;

$(document).ready(function () {

	var playPauseButton = $("#playButton")[0];
	var stopButton = $("#stopButton")[0];
	var volumeButton = $("#volumeButton")[0];
	var hdButton = $("#hdButton")[0];
	var fullScreenButton = $("#fullScreenButton")[0];
	var volumePanel = $("#bodyVolumeLine")[0];
	var qualityPanel = $("#qualityPanel")[0];
	
		
	hideVolumePanel();
	hideQualityPanel();

	// Dla panelu głośności
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
	});

	// Dla panelu jakości filmu
	$(qualityPanel).mouseover(function() {
		mouseOnQualityPanel = true;
	});	
	$(qualityPanel).mouseout(function() {
		mouseOnQualityPanel = false;
		setTimeout(function(){hideQualityPanel();}, 200);
	});	
	
	$(hdButton).mouseover(function() {
		setTimeout(function(){showQualityPanel();}, 200);
	});
	
	$(hdButton).mouseout(function() {
		setTimeout(function(){hideQualityPanel();}, 200);
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
	
	function hideQualityPanel()
	{
		if( !mouseOnQualityPanel )
			$(qualityPanel).css("z-index", 1);
	}
	
	function showQualityPanel()
	{
		if( !mouseOnQualityPanel )
			$(qualityPanel).css("z-index", 2);
	}	

});


