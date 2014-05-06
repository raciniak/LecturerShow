var countingTimeFromTheEnd = false;
var volumeSliderClicked = false;
var fullScreenOn = false;

$(document).ready(function () {
//Zaladowanie sciezki do filmu
var namefile = 'res/'+getParameterByName("id")+'/speech_360.mp4';
$("#myVideo").html("<source src='"+namefile+"' type='video/mp4' \>");
//Zaladowanie sciezki do filmu ze slajdami
var namefileslide = 'res/'+getParameterByName("id")+'/screens.mp4';
$("#AddNewSlide").html("<source src='"+namefileslide+"' type='video/mp4' \>");
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
	$(myVideo).bind('timeupdate', updateSlide);
	
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
	var pelny = $("#myPlayer")[0];
	var vid = $("#myVideo")[0];
	var pic = $("#imgLoad")[0];
	var pscr = $('.playerScreen');
	var menu = $('.playerMenu');

	var vidklik = 0;
	var picklik = 0;

//bazowe ustawianie elementow fullscreena

	$(pelny).css({
		"width" : screen.width,
		"height" : screen.height,
		"padding" : "0px",
		"z-index" : "-140"
	});

	$(pscr).css({
		"width" : screen.width,
		"height" : screen.height,
		"top" : "0px",
		"left" : "0px",
		"padding" : "0px",
		"position" : "fixed",
		"z-index" : "-100"
	});

	$(vid).css({
		"position" : "relative",
		"width" : 0.495 * screen.width,
		"height" : 0.495 * screen.height,
		"float" : "left",
		"padding" : "0px",
		"margin-top" : 0.24 * screen.height,
		"-moz-user-select" : "none",
		"-webkit-user-select" : "none",
		"user-select" : "none",
		"-ms-user-select" : "none",
		"opacity" : "1"
	});

	$(pic).css({
		"position" : "relative",
		"width" : 0.495 * screen.width,
		"height" : 0.495 * screen.height,
		"float" : "right",
		"padding" : "0px",
		"margin-top" : 0.24 * screen.height,
		"-moz-user-select" : "none",
		"-webkit-user-select" : "none",
		"user-select" : "none",
		"opacity" : "1"
	});

	
	//OBSLUGA KLIKNIEC !!!
	//klikanie na wideo
	$(vid).click(vklik);
	function vklik() {
		vidklik += 1;
		picklik = 0;
		switch(vidklik) {
			case 1:
				$(vid).css({
					"z-index" : "-10",
					"position" : "absolute",
					"margin" : "0 auto",
					"-ms-user-select" : "none",
				}).draggable({
					disabled : true
				}).animate({
					width : screen.width,
				}, 300).animate({
					height : screen.height,
				}, 300);

				$(pic).css({
					"z-index" : "10",
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"-ms-user-select" : "none",
					"-moz-border-radius" : "10px",
					"-webkit-border-radius" : "10px",
					"border-radius" : "10px",
					"position" : "absolute",
					"border-style" : "double",
					"border-color" : "#0000ff",
					"opacity" : "1"
				}).draggable({
					disabled : false
				}).animate({
					width : 0.35 * screen.width
				}, 300).animate({
					height : 0.35 * screen.height
				}, 300);
				$(pic).off("click").draggable({
					disabled : false
				});
				break;

			case 2:
				$(vid).css({
					"position" : "relative",
					"z-index" : "10",
					"width" : screen.width,
					"height" : screen.height,
					"padding" : "0px",
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"-ms-user-select" : "none",
					"opacity" : "1"
				});
				$(pic).hide().css({
					"position" : "relative",
					"border-style" : "none"
				});
				break;
			case 3:
				$(vid).css({
					//"position" : "fixed",
					"z-index" : "10",
					"width" : 0.495 * screen.width,
					"height" : 0.495 * screen.height,
					"float" : "left",
					"position" : "relative",
					"padding" : "0px",
					"left":"auto",
					"top":"auto",
					"right":"auto",
					"bottom":"auto",
					"margin-top" : 0.24 * screen.height,
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"-ms-user-select" : "none",
					"opacity" : "1"
				});

				$(pic).css({
					//"position" : "fixed",
					"z-index" : "10",
					"width" : 0.495 * screen.width,
					"height" : 0.495 * screen.height,
					"float" : "right",
					"left":"auto",
					"margin-top":"0px",
					"right":"auto",
					"bottom":"auto",
					"padding" : "0px",
					"top" : 0.24 * screen.height,
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"opacity" : "1",
					"-moz-border-radius" : "none",
					"-webkit-border-radius" : "none",
					"border-radius" : "none",
				}).draggable({
					disabled : true
				}).show().on("click", pklik);
				vidklik = 0;
				break;
		}

	}

	//klikanie na obrazek
	$(pic).click(pklik);
	function pklik() {
		picklik += 1;
		vidklik = 0;
		switch(picklik) {
			case 1:
				$(pic).css({
					"z-index" : "-10",
					"position" : "absolute",
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"margin" : "0 auto",
					"opacity" : "1",
					"top":"0px",
					"margin-top":"0px",
				}).animate({
					width : screen.width
				}, 300).animate({
					height : screen.height,
				}, 300).draggable({
					disabled : true
				});

				$(vid).css({
					"z-index" : "10",
					"-moz-border-radius" : "10px",
					"-webkit-border-radius" : "10px",
					"border-radius" : "10px",
					"border-style" : "double",
					"border-color" : "#0000ff",
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"-ms-user-select" : "none",
					"opacity" : "1"
				}).draggable({
					disabled : false
				}).animate({
					width : 0.35 * screen.width
				}, 300).animate({
					height : 0.35 * screen.height
				}, 300);
				$(vid).off("click").draggable({
					disabled : false
				});
				break;
			case 2:
				$(pic).css({
					"width" : screen.width,
					"height" : screen.height,
					"float" : "right",
					"padding" : "0px",
					"top":"0px",
					"margin-top":"0px",
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"z-index" : "10",
					"position" : "relative",
					"opacity" : "1"
				});
				$(vid).hide().css({
					"position" : "relative",
					"border-style" : "none"
				});
				$(vid).on("click", vklik);
				break;
			case 3:
				$(vid).css({
					"width" : 0.495 * screen.width,
					"height" : 0.495 * screen.height,
					"float" : "left",
					"padding" : "0px",
					"left":"auto",
					"top":"auto",
					"right":"auto",
					"bottom":"auto",
					"margin-top" : 0.24 * screen.height,
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"-ms-user-select" : "none",
					"opacity" : "1",
					"-moz-border-radius" : "none",
					"-webkit-border-radius" : "none",
					"border-radius" : "none",
				}).draggable({
					disabled : true
				}).show();

				$(pic).css({
					"width" : 0.495 * screen.width,
					"height" : 0.495 * screen.height,
					"float" : "right",
					"padding" : "0px",
					"left":"auto",
					"right":"auto",
					"bottom":"auto",
					"top" : 0.24 * screen.height,
					"-moz-user-select" : "none",
					"-webkit-user-select" : "none",
					"user-select" : "none",
					"position" : "relative",
					"opacity" : "1"
				}).draggable({
					disabled : true
				});
				picklik = 0;
				break;
		}
	}

	//fullscreen
	if (pelny.requestFullscreen)
		if (document.fullScreenElement) {
			document.cancelFullScreen();
			fullScreenOn = false;
			location.reload();
		} else {
			pelny.requestFullscreen();
			fullScreenOn = true;
		}
	else if (pelny.msRequestFullscreen)
		if (document.msFullscreenElement) {
			document.msExitFullscreen();
			fullScreenOn = false;
			location.reload();
		} else {
			pelny.msRequestFullscreen();
			fullScreenOn = true;
		}
	else if (pelny.mozRequestFullScreen)
		if (document.mozFullScreenElement) {
			document.mozCancelFullScreen();
			fullScreenOn = false;
			location.reload();
		} else {
			pelny.mozRequestFullScreen();
			fullScreenOn = true;
			//tu można ustawiać firefox przez margin-top w css dla elementu pscr
			$(pscr).css({
				"top" : "15%",
			});
		}
	else if (pelny.webkitRequestFullscreen)
		if (document.webkitFullscreenElement) {
			document.webkitCancelFullScreen();
			fullScreenOn = false;
			location.reload();
		} else {
			pelny.webkitRequestFullscreen();
			fullScreenOn = true;
		}

	//funkcja tymczasowa ktora po wcisnieciu esc odswieza strone
	var KEYCODE_ESC = 27;
	$(document).keyup(function(e) {
		if (e.keyCode == KEYCODE_ESC) {
			location.reload();
		}
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

	//myVideo.currentTime = percent/100 * myVideo.duration;
	var liczba = startPlay+(percent/100 * (stopPlay-startPlay));
	liczba = liczba.toFixed(2);
	myVideo.currentTime = liczba;
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
