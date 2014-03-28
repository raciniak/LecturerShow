var intID;
var a='';
var i;
// funkcje wykonujace sie po zaladowaniu strony
$(document).ready(function(){
	//sciezka do aktualnego filmu
	  // movieFileLocation = new String("movies/movie1/trailer_test.mp4");
	   //funkcja do pobierania czasow odtwarzania slajdow, kazda funkcja ktora chce korzystac z tablicy a zawierajacej
	   // czasy musi odczekac w jakis sposob chwile aby funkcja zdazyla sie wykonac
       pobierzPlik();
     //  $('#load_JPG').html('<img src="images/logo.png" width="640" height="360" alt="cos1"/>');
       //zaladowanie playera z odtwarzaczem slajdow
     //  startPlayer();
       //odswieżana zmienna przy załadowaniu strony potrzebna do odtwarzacza slajdow
       $('#playPause').click(function(){i=1;});
       //funkcja odpowiadajaca za funkcjonalne okienko pomocnicze pod edytorem
       intID=setTimeout(function(){
       	windowsik();
       },200);
       var evt = new Event();
       var dragdrop = new Dragdrop(evt);
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