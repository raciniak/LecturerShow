$(document).ready(function(){

//------------------------------------	
var myVideo = $('#myVideo')[0];	
var timeLine = $('#timeLine')[0];
//------------------------------------


	$('#playButton').click(function() {
		play();
	}
	);
	$('#pauseButton').click(function() {
		pause();
	}
	);

	// Funkcja wykonywana, kiedy player jest uruchomiony
	$(myVideo).bind('timeupdate', updateTime);
	// Funkcja wykonywana po naciśnięciu w timeline
	$(timeLine).click(function(e){
		var posX = $(this).offset().left;
        
        // Szerokość timeLine-a
        var width = $(this).width();
        
        // Obliczam procent timeLine-a
        var percent = Math.floor((e.pageX-posX)/width*100);
        
        setTimeLine(percent);
	});
});

function play() {
	myVideo.play();
}

function pause() {
	myVideo.pause();
}

function updateTime(){
	$('#czas').html(myVideo.currentTime);
	
	$('#timeLine .belt').animate(
		{"width" : myVideo.currentTime/myVideo.duration*100+"%"},
		{duration : 100}
	);
	
	//$('#timeLine .belt').css("width", myVideo.currentTime/myVideo.duration*100+"%")
}

function setTimeLine(percent)
{
	$('#timeLine .belt').animate(
		{"width" : percent+"%"},
		{duration : 200}
	);
	
	myVideo.currentTime = percent/100 * myVideo.duration;
}

// ---------------------------------------------------------------------------------
//       jacek m

// ---------------------------------------------------------------------------------