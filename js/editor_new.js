var countingTimeFromTheEnd = false;
var volumeSliderClicked = false;

$(document).ready(function () {
//Zaladowanie sciezki do filmu
var namefile = 'movies/'+getParameterByName("id")+'/speech.mp4';
$("#myVideo").html("<source src='"+namefile+"' type='video/mp4' \>");
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
	$(timeLine).mousedown(function(e){
		var posX = $(this).offset().left;     
		// Szerokość timeLine-a
		var width = $(this).width();      
		// Obliczam procent timeLine-a
		var percent = Math.floor((e.pageX-posX)/width*100);    
		setTimeLine(percent);
	});
		
	// Funkcja wykonywana po naciśnięciu w volumeLine
	$(volumeLine).mousedown(function(e){
		volumeSliderClicked = true;
		var posY = $(this).offset().top;     
        // Szerokość timeLine-a
        var height = $(this).height();      
        // Obliczam procent timeLine-a
        var percent = (100 - Math.floor((e.pageY-posY)/height*100)) < 0 ? 0 : 100 - Math.floor((e.pageY-posY)/height*100);    
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
	var full = $("#myPlayer")[0];
	var vid = $("#myVideo")[0];
	var pic = $("#imgLoad")[0];
	var pscr = $('.playerScreen');
	
	
	//ustawianie elementow fullscreena
	$(full).css({
		"width" : screen.width,
		"height" : screen.height,
		"padding":"0px"
	});
	
	$(pscr).css({
		"width":screen.width,
		"height":screen.height,
		"top":"0px",
		"left":"0px",
		"padding":"0px"
	});

	$(vid).css({
		"width":0.49*screen.width,
		"height":screen.height,
		"float":"left",
		"padding":"0px",
		
	});

	$(pic).css({
		"width":0.49*screen.width,
		"height":screen.height,
		 "float" :"right",
		 "padding":"0px",
		 "-moz-user-select": "none",
    		"-webkit-user-select": "none",
    		"user-select": "none",
});

	
	//klikanie na wideo
	$(vid).dblclick(function() {
		$(vid)
		.animate({
			width : screen.width,
			left: "auto",
			right :"auto",
			top : "auto",
			bottom : "auto"
		}, 300)
		.animate({
			height : screen.height,
		}, 300)
		.css({
			"z-index" : "-10",
			"position" : "absolute",
		}).draggable({disabled:true});
		
		$(pic).animate({
			width : 0.35 * screen.width
		}, 300).animate({
			height : 0.35 * screen.height
		}, 300);
		$(pic).css({
			"z-index": "10",
			"float":"right",
			"-moz-user-select": "none",
    		"-webkit-user-select": "none",
    		"user-select": "none",
			"-moz-border-radius": "10px",
			"-webkit-border-radius": "10px",
			"border-radius": "10px",
		}).draggable({disabled:false}); 
});
	
	//klikanie na obrazek
	$(pic).dblclick(function() {
		$(pic)
		.animate({
			width : screen.width,
			left: "auto",
			right :"auto",
			top : "auto",
			bottom : "auto"
		}, 300)
		.animate({
			height : screen.height,
		}, 300)
		.css({
			"z-index" : "-10",
			"position" : "absolute",
			"-moz-user-select": "none",
    		"-webkit-user-select": "none",
    		"user-select": "none",
		}).draggable({disabled:true});
		
		
		$(vid).animate({
			width : 0.35 * screen.width
		}, 300).animate({
			height : 0.35 * screen.height
		}, 300);
		$(vid).css({
			"z-index" : "10",
			"float":"right",
			"-moz-border-radius": "10px",
			"-webkit-border-radius": "10px",
			"border-radius": "10px",
		}).draggable({disabled:false}); 

	});
	
	
	//fullscreen
	if (full.requestFullscreen)
		if (document.fullScreenElement) {
			document.cancelFullScreen();
		} else {
			full.requestFullscreen();
		}
	else if (full.msRequestFullscreen)
		if (document.msFullscreenElement) {
			document.msExitFullscreen();
			
		} else {
			full.msRequestFullscreen();
		}
	else if (full.mozRequestFullScreen)
		if (document.mozFullScreenElement) {
			document.mozCancelFullScreen();
			
		} else {
			full.mozRequestFullScreen();
		}
	else if (full.webkitRequestFullscreen)
		if (document.webkitFullscreenElement) {
			document.webkitCancelFullScreen();
		} else {
			full.webkitRequestFullscreen();
		}
		
		//funkcja tymczasowa ktora po wcisnieciu esc odswieza strone
		var KEYCODE_ESC = 27;
		$(document).keyup(function(e) {
   			if (e.keyCode == KEYCODE_ESC) { location.reload(); } 
		});
		
		
		//tymczasowe automatyczne startowanie playera fullscreenowego
		vid.play();
		timetimes();
		sort_times();
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

	//Wyliczamy w procentach długość timelina playera, oraz omijamy błąd
	var lengthTimeline = ((myVideo.currentTime-startPlay) / (stopPlay-startPlay) * 100 );
	if(((myVideo.currentTime-startPlay) / (stopPlay-startPlay) * 100 )>100)
	{
		lengthTimeline=100;
	}
    // Animacja
    $('#timeLine .belt').animate(
      //  { "width": myVideo.currentTime / myVideo.duration * 100 + "%" },
      { "width": lengthTimeline + "%" },
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
