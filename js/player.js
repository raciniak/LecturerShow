var intID;
var a='';
var i;
var vid, plbtn, slider, czasObecny, czasTrwania;
var movieFileLocation;
$(document).ready(function(){
	   movieFileLocation = new String("movies/movie1/trailer_test.mp4");
       pobierzPlik();
       $('#load_JPG').html('<img src="images/logo.png" width="640" height="360" alt="cos1"/>');
       document.getElementById("film").src = movieFileLocation;
       startPlayer();
       $('#playPause').click(function(){i=1;});
       intID=setTimeout(function(){
       	windowsik();
       },150);
});

function obrazek(){
        var czas = Math.floor(vid.currentTime);
        var j=5;
        var i=0;
        while(i==0)
        {
            if(czas>=parseInt(a[j]))
                i=j;
            if(j==0)
                i=a[0];
            j--;
        }

        if(i<parseInt(a[0])+1)
        {
             if(czas>=a[i])
             {
                 $('#load_JPG').html('<img src="movies/movie1/images/' + a[i] + '.jpg" width="640" height="360" alt="cos'+i+'"/>');
             }
        }
}

function startPlayer() {
    vid = document.getElementById("vid");
    vid.load();
    plbtn = document.getElementById("playPause");
    slider = document.getElementById("slider");
    czasObecny = document.getElementById("czasobecny");
    czasTrwania = document.getElementById("czastrwania");
    mute = document.getElementById("mute");
    volslider = document.getElementById("volslider");
    //obsluga elementow
    plbtn.addEventListener("click", playPause, false);
    slider.addEventListener("change", vidSeek, false);
    vid.addEventListener("timeupdate", seekTimeUpdate, false);
    vid.addEventListener("timeupdate", obrazek, false);
    mute.addEventListener("click", vidmute, false);
    volslider.addEventListener("change", volume, false);
}


function pobierzPlik()
{
                
		var txt='';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","movies/movie1/times.txt");
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.status==200 && xmlhttp.readyState==4){
				txt=xmlhttp.responseText;
                                a=txt.split('\n');
			}
                            
		};
		xmlhttp.send();
 }
            
function windowsik()
{
	var i;
	for(i=1;i<parseInt(a[0])+1;i++)
	{
		var divek = document.createElement('li');
        divek.className = 'slajd';
        divek.innerHTML = "<input type='checkbox' id='"+i+"' checked='checked' /> <img src='movies/movie1/images/"+a[i]+".jpg' width='140' height='70' alt='cos1'/>  Numer slajdu: "+i+    
        " Sekunda slajdu: <input id='"+i+"'type='text' value='"+a[i]+"'>";
        $("#windows").append(divek);
	}
}


function playPause() {
    if (vid.paused) {
        vid.play();
        plbtn.textContent = "PAUZA";
    } else {
        vid.pause();
        plbtn.textContent = "GRAJ";
    }
}

function vidSeek() {
    var seekto = vid.duration * (slider.value / 100);
    vid.currentTime = seekto;
}

function seekTimeUpdate() {
    var nt = vid.currentTime * (100 / vid.duration);
    slider.value = nt;
    var min = Math.floor(vid.currentTime / 60);
    var sek = Math.floor(vid.currentTime - min * 60);
    var dmin = Math.floor(vid.duration / 60);
    var dsek = Math.round(vid.duration - dmin * 60);
    if (sek < 10) {
        sek = "0" + sek;
    }
    if (dsek < 10) {
        dsek = "0" + dsek;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (dmin < 10) {
        dmin = "0" + dmin;
    }
    czasObecny.innerHTML = min + ":" + sek;
    czasTrwania.innerHTML = dmin + ":" + dsek;
}

function vidmute() {
    if (vid.muted) {
        vid.muted = false;
        mute.textContent = "CISZA";
    } else {
        vid.muted = true;
        mute.textContent = "Głośno";
    }
}

function volume() {
    vid.volume = volslider.value / 100;
}

