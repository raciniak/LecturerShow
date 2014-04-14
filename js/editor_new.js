var countingTimeFromTheEnd = false;
var volumeSliderClicked = false;
$(document).ready(function () {

//------------------------------------	
var myVideo    = $('#myVideo')[0];	
var timeLine   = $('#timeLine')[0];
var volumeLine = $('#volumeLine')[0];
//------------------------------------
	
	// Chowam przycisk "pauza"
	$("#pauseButton").hide();
	// Ustawiam pasek głośności
	setVolumeLine(myVideo.volume*100);

	$('#timeDiv').click(function () {
	    countingTimeFromTheEnd = !countingTimeFromTheEnd;
	    changeTime();
	}
    );

	$('#playButton').click(function() {

			$(this).hide();
			play();
			$("#pauseButton").show();
	}
	);
	$('#pauseButton').click(function() {

			$(this).hide();
			pause();
			$("#playButton").show();
	}
	);
	
	
	$('#stopButton').click(function() {
		if( myVideo.currentTime != 0 )
		{
			stop();
			$("#playButton").show();
			$("#pauseButton").hide();
		}
	}
	);
	
	$('#volumeButton').click(function() {
		if(!volumeSliderClicked)
		mute();
	}
	);

	$('#fullScreenButton').click(function () {
	    fullScreen();
	});

    // Funkcja wykonywana, kiedy player jest uruchomiony
	$(myVideo).bind('timeupdate', updateTime);
	// Funkcja do zmiany slajdow ze skryptu editor.js
	$(myVideo).bind('timeupdate', obrazek);

	
	// Funkcja wykonywana po naciśnięciu w timeline
	$(timeLine).click(function(e){
		var posX = $(this).offset().left;     
        // Szerokość timeLine-a
        var width = $(this).width();      
        // Obliczam procent timeLine-a
        var percent = Math.floor((e.pageX-posX)/width*100);    
        setTimeLine(percent);
	});
	
	// Funkcja wykonywana po naciśnięciu w volumeLine
	$(volumeLine).click(function(e){
		volumeSliderClicked = true;
		
		
		var posY = $(this).offset().top;     
        // Szerokość timeLine-a
        var height = $(this).height();      
        // Obliczam procent timeLine-a
        var percent = 100 - Math.floor((e.pageY-posY)/height*100);    
        setVolumeLine(percent);
        setTimeout('sleep()', 1000);
	});
	
});

// Ta funkcja opóźnia zmianę wartości zmiennej, żeby uniknąć wyciszenia
function sleep(){
	volumeSliderClicked = false;
}

function play() {
	myVideo.play();
}

function pause() {
	myVideo.pause();
}

function stop() {
	pause();
	//myVideo.currentTime = 0;
	//Po kliknieciu stop wartosc currentTime filmu ustawia sie na poczatkowa
	myVideo.currentTime = startPlay;
	setTimeLine(0);
}

function mute() {
	if(myVideo.muted)
	{
		setVolumeLine(100);
		myVideo.muted = !myVideo.muted;
		$("#volumeButton")[0].className = "volumeButton";
	}else{
		setVolumeLine(0);
		myVideo.muted = !myVideo.muted;
		$("#volumeButton")[0].className = "volumeButtonMuted";
	}
}


function fullScreen() {

	var pbox = document.getElementById("myPlayer");
	if (pbox.requestFullscreen)
		if (document.fullScreenElement) {
			document.cancelFullScreen();
		} else {
			pbox.requestFullscreen();
		}
	else if (pbox.msRequestFullscreen)
		if (document.msFullscreenElement) {
			document.msExitFullscreen();
		} else {
			pbox.msRequestFullscreen();
		}
	else if (pbox.mozRequestFullScreen)
		if (document.mozFullScreenElement) {
			document.mozCancelFullScreen();
		} else {
			pbox.mozRequestFullScreen();
		}
	else if (pbox.webkitRequestFullscreen)
		if (document.webkitFullscreenElement) {
			document.webkitCancelFullScreen();
		} else {
			pbox.webkitRequestFullscreen();
		}
}






function updateTime(){
   /* var seconds = Math.floor(myVideo.currentTime % 60);
    var minutes = Math.floor((myVideo.currentTime / 60) % 60);
    var hours = Math.floor(myVideo.currentTime / 3600);*/
   var seconds = Math.floor((myVideo.currentTime-startPlay) % 60);
    var minutes = Math.floor(((myVideo.currentTime-startPlay) / 60) % 60);
    var hours = Math.floor((myVideo.currentTime-startPlay) / 3600);


    if (countingTimeFromTheEnd) {

      /*  seconds = Math.floor((myVideo.duration % 60) - seconds);
        minutes = Math.floor((myVideo.duration / 60) - minutes);
        hours =   Math.floor((myVideo.duration / 3600) - hours);*/
       seconds = Math.floor(((stopPlay-startPlay) % 60) - seconds);
        minutes = Math.floor(((stopPlay-startPlay) / 60) - minutes);
        hours =   Math.floor(((stopPlay-startPlay)/ 3600) - hours);
    }

    // Obliczanie sekund
    if (seconds < 10)
        seconds = "0" + seconds;
    if (seconds == 0)
        seconds = "&#48&#48";
    if (seconds % 60 == 0)
        seconds = Math.floor(seconds / 60);

    // Obliczanie minut
    if (minutes < 10)
        minutes = "0" + minutes;
    if (minutes == 0)
        minutes = "&#48&#48";
    if (minutes % 60 == 0)
        minutes = Math.floor(minutes / 60);

    // Obliczanie godzin
    if (hours < 10)
        hours = "0" + hours;
    if (hours == 0)
        hours = "&#48&#48";

    // Format wyświetlanego czasu
    var outTime = "" + hours + ":" + minutes + ":" + seconds;

    $('#timeDiv').html(outTime);

    // Animacja
    $('#timeLine .belt').animate(
      //  { "width": myVideo.currentTime / myVideo.duration * 100 + "%" },
      { "width": (myVideo.currentTime-startPlay) / (stopPlay-startPlay) * 100 + "%" },
        { duration: 100 }
    );
}

function changeTime()
{
    updateTime();
}

function setTimeLine(percent)
{   
	$('#timeLine .belt').animate(
		{"width" : percent+"%"},
		{duration : 200}
	);
	
//	myVideo.currentTime = percent/100 * myVideo.duration;
myVideo.currentTime = startPlay+(percent/100 * (stopPlay-startPlay));
}

function setVolumeLine(percent)
{
	$('#volumeLine .belt').animate(
		{"height" : percent+"%"},
		{duration : 200}
	);
	
	myVideo.volume = percent/100;
	
	if(percent <= 30 && percent > 0)
	{
		$("#volumeButton")[0].className = "volumeButton30";
	}
	if(percent <= 60 && percent > 30)
	{
		$("#volumeButton")[0].className = "volumeButton60";
	}
	if(percent <= 100 && percent > 60)
	{
		$("#volumeButton")[0].className = "volumeButton";
	}
	
}


// ---------------------------------------------------------------------------------
//       jacek m
// ---------------------------------------------------------------------------------


