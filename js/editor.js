var intID;
var i=0;
var plik=new Array();
var czasy=new Array();
var slajdy=new Array();
var iloscSlajdow;
var time = 0;
// funkcje wykonujace sie po zaladowaniu strony
$(document).ready(function(){
	   //funkcja do pobierania czasow odtwarzania slajdow, kazda funkcja ktora chce korzystac z tablicy a zawierajacej
	   // czasy musi odczekac w jakis sposob chwile aby funkcja zdazyla sie wykonac
       pobierzPlik();
       taby();
       //odswieżana zmienna przy załadowaniu strony potrzebna do odtwarzacza slajdow
       $('#playButton').click(function(){time = Math.floor(myVideo.currentTime)-1;});
       $('#timeLine').click(function(){time = Math.floor(myVideo.currentTime)-1;});
       //funkcja odpowiadajaca za funkcjonalne okienko pomocnicze pod edytorem
       intID=setTimeout(function(){
     //  	PodzielPlik();
       	windowsik();
       	uzupelnijMultiRange();
       	createRange();
       	//Funkcja list odpowiada za listę do przesuwania slajdów w okienku windows
       	list();
       },200);
       var evt = new Event();
       var dragdrop = new Dragdrop(evt);
});

//Funkcja list odpowiada za listę do przesuwania slajdów w okienku windows
function list(){
	     var $sliders = $('.windows')[0];
 
    //dla kazdego slidera na stronie...
   // $sliders.each(function() {
        var $current_slider = $($sliders);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
 
        //jeżeli dla danego slidera LI jest więcej od 3 to będzie można przewijać, inaczej nie ma sensu
        if ($li.length > 3) {
            //odległość pojedynczego przesunięcia
            var odleglosc = 100;
            //Wyliczanie max przesunięcia
            var maxLeft = odleglosc * $li.length - 3 * odleglosc;
 
            //przesuwanie w górę i w dół
            $('.down', $current_slider).click(function() {
                if ($lista.position().top > -maxLeft) {
                    $($lista).not(':animated').animate({
                        'top' : '-='+odleglosc
                    },500);
                }
            });
 
            $('.up', $current_slider).click(function() {
                if ($lista.position().top<0) {
                    $($lista).not(':animated').animate({
                        'top' : '+='+odleglosc
                    },500);
                }
            });
 
        }
   // });
}
// Utworzenie MultiRange z wszystkimi slajdami wyrzuconymi przez modełko
function createRange(){
		var min = document.getElementById("range").getAttribute("data-min");
		var max = document.getElementById("range").getAttribute("data-max");
      	for(i=0;i<iloscSlajdow;i++)
      	{
      		var left="left: "+czasy[i]/max*100+"%";
      		createSlider(slajdy[i],czasy[i],left);
      	}
}

// Utworzenie slidera z podpiętym slajdem
function createSlider(name,value,left){
		var slider = document.createElement('div');
		slider.className = 'slider draggable';
        slider.setAttribute('data-name', name);
        slider.setAttribute('data-value', value);
        slider.setAttribute('tabindex', 0);
        slider.setAttribute('style', left);
        slider.innerHTML = "</br><img src='movies/movie1/images/"+name+".jpg' width='140' height='70' alt='Obrazek nr:"+name+"'/>";
        $(".range").append(slider);
}

//Utworzenie inputów które przechowywują dane o slajdzie nawet gdy jest odpięty od MultiRange
function uzupelnijMultiRange(){
	var i;
	for(i=0;i<iloscSlajdow;i++)
	{
		var inpucik = document.createElement('input');
        inpucik.setAttribute('type', 'hidden');
        inpucik.setAttribute('name', slajdy[i]);
        inpucik.setAttribute('value', czasy[i]);
        $(".range").append(inpucik);
	}
}

// Obsługa zakładek w edytorze
function taby(){
		//dla każdego miejsca z tabami
        $('.tabs').each(function() {
            var $ul = $(this);
            var $li = $ul.children('li');
            //przy wejsciu na strone ukrywamy tresc tabow i pokazujemy tylko aktywny...
            $li.each(function() { //pętla po wszystkich tabach
                var $trescTaba = $($(this).children('a').attr('href')); //pobieramy blok o id pobranym z linka-taba
                if ($(this).hasClass('active')) { //jeżeli ten tab ma klasę aktywną
                    $trescTaba.show(); //to pobrany przed chwilą blok pokazujemy
                } else {
                    $trescTaba.hide(); //jeżeli takiej klasy nie ma to blok ukrywamy
                }
            });
                     
            //mały trik - gdy klikamy na tab, wtedy wykonujemy zdarzenie dla linka, który się w nim znajduje (dzieki temu możemy kliknąć na cały tab, a nie tylko na linka)
            $li.click(function() {$(this).children('a').click();});
            //po kliknięciu na link...
            $li.children('a').click(function() {
                //usuwamy z tabów klasę active
                $li.removeClass('active');
                //ukrywamy wszystkie taby              
                $li.each(function() {
                    $($(this).children('a').attr('href')).hide();
                });
                //ustawiamy klikniętemu tabowi klasę aktywną
                $(this).parent().addClass('active');
                $($(this).attr('href')).show();
                //nie chcemy wykonać domyślnej akcji dla linka
                return false;
            });
        });
}

// funkcja odpowiadajaca za wyświetlanie się slajdów w odpowiednim czasie
function obrazek(){
        var czas = Math.floor(myVideo.currentTime);
        if(czas===time+1)
        {
        	//var j=iloscSlajdow-1;
        	var j = 4;
        	var i=0;
        	var koniec=0;
        	while(koniec==0)
        	{
            	if(j==0){
                	i=iloscSlajdow;
                	koniec=1;
            	}
            	if(czas>=czasy[j])
            	{
                	i=j;
                	koniec=1;
            	}
            	j--;
        	}

        	if(i<iloscSlajdow)
        	{
                 $('.imageLoader').html('<img src="movies/movie1/images/' + slajdy[i] + '.jpg" alt="Obrazek nr: '+slajdy[i]+'"/>');
        	}
        	time=czas;
       }
}

// funkcja odpowiadająca za pobranie pliku z czasami oraz liczbą slajdów
function pobierzPlik()
{
		/*var txt='';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","movies/movie1/times.txt");
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.status==200 && xmlhttp.readyState==4){
				txt=xmlhttp.responseText;
                                plik=txt.split('\n');             
			}
		};
		xmlhttp.send();*/
		
		var namefile = '../movies/'+getParameterByName("id")+'/times.txt';
		var name = {
            namefile: namefile
        };
		$.post('php/readtime.php',name,PodzielPlik);
		
		
 }
 
// Dzielimy wartość pliku na dwie tablice: tablica z indentyfikatorami obrazków, tablica z czasami odtwarzania
function PodzielPlik(data)
{
	plik=data.split('\n'); 
	var j=1;
	iloscSlajdow=parseInt(plik[0]);
	for(i=0;i<iloscSlajdow;i++)
		{
			slajdy[i]=parseInt(plik[i+j]);
			j++;
			czasy[i]=parseInt(plik[i+j]);
   		 }
}

//funkcja odpowiadająca za uzupełnienie pola windows w edytorze do edycji slajdów
function windowsik()
{
	var i;
	for(i=0;i<iloscSlajdow;i++)
	{
		var divek = document.createElement('li');
        divek.className = 'slajd';
        divek.innerHTML = "<div class='windows_div'><input type='checkbox' class='checkbox' id='checkbox"+slajdy[i]+"' checked='checked' onclick='checkSlajd(this)' /> "+
        "<img class='obrazek_windows' src='movies/movie1/images/"+slajdy[i]+".jpg' width='140' height='70' alt='Obrazek nr:"+slajdy[i]+"'/>  <b class='windows_element'>Numer slajdu: "+slajdy[i]+    
        "</b> <b class='windows_element'>Sekunda slajdu: <input id='textbox"+slajdy[i]+"'type='text' class='textboxWindows' onkeyup='chcecktextbox(this)' onkeypress='validate(event,this)' value='"+czasy[i]+"'></b></div>";
        $("#windows_lista").append(divek);
	}
}

//Funkcja odpowiadająca za checkboxy tworzy albo usuwa slider z multirange
function checkSlajd(checkbox)
{
    if (checkbox.checked)
    {
    	var max = document.getElementById("range").getAttribute("data-max");
    	var name = checkbox.getAttribute("id");
    	name = name.split("checkbox");
    	name = name[1];
    	// JQuery zwraca tablice elementów dlatego wywołujemy get na argumencie zerowym aby nie była to talbica i można na zminnej
    	// wykonywać funkcje z javascript
    	var value = $("input[name="+name+"]").get(0);
    	value = value.getAttribute("value");
    	var left="left: "+value/max*100+"%";
    	createSlider(name,value,left);      
    }else{
    	var name = checkbox.getAttribute("id");
    	name = name.split("checkbox");
    	name = name[1];
    	removeSlider(name);
    }
}

//Funkcja usuwajaca slider
function removeSlider(id){
	var el = $("div[data-name="+id+"]").get(0);
   if (el){
      el.parentNode.removeChild(el);
   }
}

// funkcja odpowiadająca za aktualizację slidera względem wartości podanych w textboxie
function chcecktextbox(textbox)
{
	var name = textbox.getAttribute("id");
	var value = parseInt(textbox.value);
	var max = parseInt(document.getElementById("range").getAttribute("data-max"));
	if(value<=max)
	{
    	name = name.split("textbox");
    	name = name[1];
    	var input=$("input[name="+name+"]").get(0);
    	input.setAttribute('value',value);
    	removeSlider(name);
    	var left="left: "+value/max*100+"%";
    	createSlider(name,value,left);
	}
}

// tylko liczby i nie wieksze od długości filmu w textboxie z numerem czasów
function validate(evt,textbox) {
	 var theEvent = evt || window.event;
	 var key = theEvent.keyCode || theEvent.which; 
	 key = String.fromCharCode( key ); 
	 var regex = /[0-9]|\./; 
	 if( !regex.test(key) && theEvent.keyCode!=8 && theEvent.keyCode!=46 && theEvent.keyCode!=37 && theEvent.keyCode!=39 && theEvent.keyCode!=46 ) 
	 { 
	 	theEvent.returnValue = false; 
	 	if(theEvent.preventDefault) 
	 	{
	 		theEvent.preventDefault(); 
	 	}
	 } 
	 if(regex.test(key))
	 {
		var value = textbox.value;
		var max = parseInt(document.getElementById("range").getAttribute("data-max"));
		value=value+key;
		if(parseInt(value)<=max)
		{
			theEvent.returnValue = true; 
		}else{
			theEvent.returnValue = false; 
	 		if(theEvent.preventDefault) 
	 		{
	 			theEvent.preventDefault(); 
	 		}
		}
	}
}

function stopFrame(){
	var video = document.getElementById('myVideo');
	var canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height= video.videoHeight;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(video, 0, 0);
	window.open(canvas.toDataUrl('image/jpg').replace("image/jpg", "image/ocet-stream"));
	//alert("2");
	///wind/w.location.href=image;
	//alert("3.3");
	//window.open(obrazek);
	//alert("3");
}

//pobieranie nazwy filmu z linku
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
