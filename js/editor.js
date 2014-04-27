/**
*
* @author Jacek Murawski <JacekMurawskii@gmail.com>
*/

//tablice na czasy i identyfikatory slajdów
var plik=new Array();
var czasy=new Array();
var slajdy=new Array();
//dodatkowe tablice na czasy i identyfikatory slajdów
var czasyB=new Array();
var slajdyB=new Array();
var convertTime=new Array();
//Ramy grania filmu
var startPlay=0, stopPlay=0;
//bufor obrazka
var img = new Image();
//inne
var buffer_textbox='';
var iloscSlajdow, refresh;
var time = 0;
var intID;
var i=0;
var state = true;
var Interval;
var startInterval = true;
// funkcje wykonujace sie po zaladowaniu strony
$(document).ready(function(){
	//ukryte okienko, wyświetla się przy zapisie wszystkich zmian w edytorze
	$(".overlay, .overlay-message").hide();
	   //funkcja do pobierania czasow odtwarzania slajdow, kazda funkcja ktora chce korzystac z tablicy a zawierajacej
	   // czasy musi odczekac w jakis sposob chwile aby funkcja zdazyla sie wykonac
       pobierzPliki();
       taby();
       //odswieżana zmienna przy załadowaniu strony potrzebna do odtwarzacza slajdow
       $('#playButton').click(function(){time = Math.floor(myVideo.currentTime)-1;});
       $('#timeLine').click(function(){time = Math.floor(myVideo.currentTime)-1;});

	   //korzystanie z bibliotek
       var evt = new Event();
       var dragdrop = new Dragdrop(evt);
       
       //do zrobienia(wykrywanie bledu i co potem)
		document.getElementById('AddNewSlide').addEventListener('error',errorSlideVideo,true);
		
		//timowanie najnowszych czasów zapisanych w edytorze do wyświetlenia w czasie edytowania filmu wraz z wprowadzonymi zmianami
		$("#playButton").click(function(){
			timetimes();
			sort_times();
		});
		$("#timeLine").click(function(){
			timetimes();
			sort_times();
			ClickTimelineUpdateSlide();
		});
		$("#stopButton").click(function(){
			firstImage();
		});
		
});

// Obsługa błędu video w zakładce do wyszukiwania slajdów
function errorSlideVideo(){
	$("a[href='#tab-3']").remove();
}


//  Konwersja czasów podanych w sekundach na czas w postaci 00:00:00 do wyświetlania
function upConversionTime(times)
{
		var sek, min, hour, timee;
		hour=Math.floor(times/3600);
		timee=times%3600;
		min=Math.floor(timee/60);
		sek=timee%60;
		if(hour<10)
		{
			hour='0'+hour;
		}
		if(min<10)
		{
			min='0'+min;
		}
		if(sek<10)
		{
			sek='0'+sek;
		}
		times=hour+':'+min+':'+sek;
		return times;
}

//Funkcja list odpowiada za listę do przesuwania slajdów w okienku windows
function list(){
	     var $sliders = $('.windows')[0];
 
        var $current_slider = $($sliders);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
        var $tab = $('.tab')[0];
        var $current_tab = $($tab);
 
        //jeżeli dla danego slidera LI jest więcej od 3 to będzie można przewijać, inaczej nie ma sensu
        if ($li.length > 18) {
            //odległość pojedynczego przesunięcia
            var odleglosc = 112;
            //Wyliczanie max przesunięcia
            var maxBottom = (Math.floor($li.length/6)+1)*odleglosc;
 			maxBottom = maxBottom-(3*odleglosc);
            //przesuwanie w górę i w dół
            $('.down').click(function() {
                if ($lista.position().top > -maxBottom) {
                    $($lista).not(':animated').animate({
                        'top' : '-='+odleglosc
                    },500);
                }
            });
 
            $('.up').click(function() {
                if ($lista.position().top<0) {
                    $($lista).not(':animated').animate({
                        'top' : '+='+odleglosc
                    },500);
                }
            });
 
        }
}
// Utworzenie MultiRange z wszystkimi slajdami wyrzuconymi przez modełko
function createRange(){
		var max = document.getElementById("range").getAttribute("data-max");
      	for(i=0;i<iloscSlajdow;i++)
      	{
      		var left="left: "+czasy[i]/max*100+"%";
      		createSlider(slajdy[i],czasy[i],left);
      	}
}

// Utworzenie MultiRange z ramami odtwarzania filmu
function createRangeTime(){
		var max = document.getElementById("range").getAttribute("data-max");
      	var left="left: "+startPlay/max*100+"%";
      	createSlider("PoczatekFilmu",startPlay,left);
      	left="left: "+stopPlay/max*100+"%";
      	createSlider("KoniecFilmu",stopPlay,left);
}

// Utworzenie slidera z podpiętym slajdem
function createSlider(name,value,left){
		var timee;
		var slider = document.createElement('div');
		slider.className = 'slider draggable';
        slider.setAttribute('data-name', name);
        slider.setAttribute('data-value', value);
        slider.setAttribute('tabindex', 0);
        slider.setAttribute('style', left);
        timee = upConversionTime(value);
        slider.innerHTML = "<div class='underSlider'><img src='res/"+getParameterByName("id")+"/"+name+".png' width='140' height='70' alt='Obrazek nr:"+name+"'/><p id='movetime"+name+"' class='timeSlider'>"+timee+"</p></div>";
        if("PoczatekFilmu"===name || "KoniecFilmu"===name)
        {
        	slider.className = 'slider MovieTimes';
        	slider.innerHTML = "<div class='underSliderTime'><b>"+name+"</b><p id='movetime"+name+"'>"+timee+"</p></div>";
        }
        $(".range").append(slider);
}
//Utworzenie inputów które przechowywują dane o slajdzie nawet gdy jest odpięty od MultiRange
function uzupelnijMultiRange(){
	var i;
	for(i=0;i<iloscSlajdow;i++)
	{
		AddInput(i);
	}
	AddInputTime("PoczatekFilmu");
	AddInputTime("KoniecFilmu");
}

//Podfunkcja uzupelnijMultiRange odpowiadająca za dodanie pojedyńczego inputa ze slajdem
function AddInput(i)
{
		var inpucik = document.createElement('input');
        inpucik.setAttribute('type', 'hidden');
        inpucik.setAttribute('name', slajdy[i]);
        inpucik.setAttribute('value', czasy[i]);
        $(".range").append(inpucik);
}

//Podfunkcja uzupelnijMultiRange odpowiadająca za dodanie pojedyńczego inputa z poczatkiem i końcem odtwarzania filmu
function AddInputTime(sliderr)
{
		var inpucik = document.createElement('input');
        inpucik.setAttribute('type', 'hidden');
        inpucik.setAttribute('name', sliderr);
        if(sliderr==="PoczatekFilmu")
        {
        		inpucik.setAttribute('value', startPlay);
        }else if(sliderr==="KoniecFilmu")
        {
        		inpucik.setAttribute('value', stopPlay);
        }
        $(".range").append(inpucik);
}

// Obsługa zakładek w edytorze
function taby(){
		//dla każdego miejsca z tabami
        $('.bookmarks').each(function() {
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

// sortowanie czasów przed otworzeniem w razie większych zmian slajdów
function sort_times(){
	slajdyB=slajdy.slice();
	czasyB=czasy.slice();
	var tmp=0;
	var i,j;
	
	for(j = iloscSlajdow-1; j>0; j--)
    {
    p = 1;
    for(i = 0; i < j; i++)
      if(czasyB[i] > czasyB[i + 1])
      {
        x = czasyB[i]; czasyB[i] = czasyB[i + 1]; czasyB[i + 1] = x;
        x = slajdyB[i]; slajdyB[i] = slajdyB[i + 1]; slajdyB[i + 1] = x;
        p = 0;
      }
    if(p) break;
    }
}

// wczytanie pierwszego obrazka
function firstImage(){
	sort_times();
	$('.imageLoader').html('<img src="res/'+getParameterByName("id")+'/' + slajdyB[0] + '.png" alt="Obrazek nr: '+slajdyB[0]+'"/>');
	img.src = 'res/'+getParameterByName("id")+'/' + slajdyB[0] + '.png';
}

// funkcja odpowiadajaca za wyświetlanie się slajdów w odpowiednim czasie
function updateSlide(){
        var czas = Math.floor(myVideo.currentTime);
        
        //sprawdzamy czy czas filmu nie osiagnął ustawionego czasu stopPlay, jeśli tak to zatrzymujemy
        if(myVideo.currentTime > stopPlay){
   			myVideo.pause();
  		}
  		//
        if(czas===time+1)
        {
        	var j = iloscSlajdow;
        	var i=0;
        	var koniec=0;
        	while(koniec==0)
        	{
            	if(j==0){
                	i=iloscSlajdow;
                	koniec=1;
            	}
            	if(czas>=czasyB[j])
            	{
                	i=j;
                	koniec=1;
            	}
            	j--;
        	}

        	if(i<iloscSlajdow)
        	{
                 $('.imageLoader img').attr("src", img.src);
                 //ładujemy nowy slajd
                 if(czasyB[i+1]-1==czas)
                 {
                 	img.src = 'res/'+getParameterByName("id")+'/' + slajdyB[i+1] + '.png';
                 }
        	}
        	time=czas;
       }
}

// funkcja odpowiadajaca za wyświetlanie się slajdów w odpowiednim czasie
function ClickTimelineUpdateSlide(){
        var czas = Math.floor(myVideo.currentTime);

        if(czas===time+1)
        {
        	var j = iloscSlajdow;
        	var i=0;
        	var koniec=0;
        	while(koniec==0)
        	{
            	if(j==0){
                	i=iloscSlajdow;
                	koniec=1;
            	}
            	if(czas>=czasyB[j])
            	{
                	i=j;
                	koniec=1;
            	}
            	j--;
        	}

        	if(i<iloscSlajdow)
        	{
                 $('.imageLoader').html('<img src="res/'+getParameterByName("id")+'/' + slajdyB[i] + '.png" alt="Obrazek nr: '+slajdyB[i]+'"/>');
                 //ładujemy nowy slajd
                 if(czasyB[i+1]-1==czas)
                 {
                 	img.src = 'res/'+getParameterByName("id")+'/' + slajdyB[i+1] + '.png';
                 }
        	}
        	time=czas;
       }
}

// funkcja odpowiadająca za pobranie pliku z czasami oraz liczbą slajdów
function pobierzPliki()
{
		var namefile1 = '../res/'+getParameterByName("id")+'/times.txt';
		var namefile2 = '../res/'+getParameterByName("id")+'/timesMovie.txt';
		var name1 = {
            namefile: namefile1
        };
        var name2 = {
            namefile: namefile2
        };
        var video = $("#myPlayer .playerScreen #myVideo")[0];
        $(video).bind('loadedmetadata', function(){
        	var czas = Math.floor(myVideo.duration);
		$('#range')[0].setAttribute('data-max',czas);
		$.post('php/readtime.php',name1,PodzielPlik);
		
		$.post('php/readtime.php',name2,OpenTimeVideo);
		});
 }
 
 //przyjęcie czsów grania filmu z pliku
function OpenTimeVideo(data){
	plik=data.split('\n');
	startPlay=parseInt(plik[0]);
	stopPlay=parseInt(plik[1]);
	CompletPlayedMovieTime();
	createRangeTime();
    myVideo.currentTime = startPlay;
	
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
    	windowsik();
       	uzupelnijMultiRange();
       	createRange();
       	list();
       	firstImage();
   
}

//funkcja odpowiadająca za uzupełnienie pola windows w edytorze do edycji slajdów
function windowsik()
{
	var i;
	for(i=0;i<iloscSlajdow;i++)
	{
		slideAddWindows(i);
	}
}

// podfunkcja funkcji windowsik, dodaje pojedyńczy slajd do okienka
function slideAddWindows(i)
{
		var divek = document.createElement('li');
		var timee;
		timee = upConversionTime(czasy[i]);
		timee = timee.split(":");
        divek.className = 'slajd';
        divek.innerHTML = "<div class='windows_div' id='ControlWindows"+slajdy[i]+"' onmouseout='onselecdSlideWindows(this)' onmouseover='selecdSlideWindows(this)'><img id='Images"+slajdy[i]+"' class='obrazek_windows' src='res/"+getParameterByName("id")+"/"+slajdy[i]+".png' width='140' height='70' alt='Obrazek nr:"+slajdy[i]+"'/> "+
        "<div id='ControlPanel"+slajdy[i]+"' class='ControlPanel'></div><div id='ControlPanel"+slajdy[i]+"Items' class='ControlPanelItems'><input type='checkbox' class='checkbox' id='checkbox"+slajdy[i]+"' checked='checked' onclick='checkSlajd(this)' /> <b class='windows_element1'>Numer slajdu: "+slajdy[i]+    
        "</b> <br /><b class='windows_element2'>Czas slajdu: </br><b class='texboxup'><b class='textboxhour"+slajdy[i]+"'><input id='textboxhour"+slajdy[i]+"'type='text' class='textboxWindows'  onkeyup='chcecktextbox(event,this)' onkeypress='validate(event,this)' value='"+timee[0]+"'></b>:"+
        "<b class='textboxmin"+slajdy[i]+"'><input id='textboxmin"+slajdy[i]+"'type='text' class='textboxWindows'  onkeyup='chcecktextbox(event,this)' onkeypress='validate(event,this)' value='"+timee[1]+"'></b>:"+
        "<b class='textboxsek"+slajdy[i]+"'><input id='textboxsek"+slajdy[i]+"'type='text' class='textboxWindows'  onkeyup='chcecktextbox(event,this)' onkeypress='validate(event,this)' value='"+timee[2]+"'></b></b></b></div></div>";
        $("#windows_lista").append(divek);
}

// Akcja przyciemnienia slajdu po najechaniu na niego w okienku oraz wyłonienie się elementów kontrolujących
function selecdSlideWindows(img)
{
	var name;
	var id='';
	name = $(img).attr('id');
		//znajdujemy numer slajdu w identyfikatorze
		for(i=0;i<name.length;i++)
		{
			bool = isNaN(name[i]);
			if(bool===false)
			{
				id=id+name[i];
			}
		}
	document.getElementById("ControlPanel"+id).style.zIndex='3';
	document.getElementById("ControlPanel"+id+"Items").style.zIndex='4';
}

// Akcja powrotu slajdu po wyjechaniu kursorem z jego pola oraz ukrycie się elementów kontrolujących
function onselecdSlideWindows(img)
{
	var name;
	var id='';
	name = $(img).attr('id');
		//znajdujemy numer slajdu w identyfikatorze
		for(i=0;i<name.length;i++)
		{
			bool = isNaN(name[i]);
			if(bool===false)
			{
				id=id+name[i];
			}
		}
	document.getElementById("ControlPanel"+id).style.zIndex='1';
	document.getElementById("ControlPanel"+id+"Items").style.zIndex='1';
}

//dodanie texboxow z czasami odtwarzania filmu
function CompletPlayedMovieTime(){
	var timeeStart,timeeStop;
	timeeStart = upConversionTime(startPlay);
	timeeStop = upConversionTime(stopPlay);
	timeeStart = timeeStart.split(":");
	timeeStop = timeeStop.split(":");
	$('#TimeMoviePlayed').html("<b class='textboxPlay'>Początek prezentacji: <b class=textbox00><input id='textbox00'type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStart[0]+"'></b>:"+
	"<b class=textbox10><input id='textbox10'type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStart[1]+"'></b>:"+
	"<b class=textbox20><input id='textbox20'type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStart[2]+"'></b></b>"+
	"<b class='textboxPlay secondElementTime'>Koniec prezentacji: <b class='textbox01' ><input id='textbox01' type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStop[0]+"'></b>:"+
	"<b class='textbox11' ><input id='textbox11' type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStop[1]+"'></b>:"+
	"<b class='textbox21' ><input id='textbox21' type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+timeeStop[2]+"'></b></b>");

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

//odkodowuje czas na sekundy z postaci 00
function decodingTime(hour, min, sek){
	var timee;
	timee=parseInt(sek)+(parseInt(hour)*3600)+(parseInt(min)*60);
	return timee;
}

// funkcja odpowiadająca za aktualizację slidera względem wartości podanych w textboxie
function chcecktextbox(evt,textbox)
{
		var name,name2;
		var buffer = buffer_textbox;
		var value = new Array();
		var id='';
		var i;
		var timee1;
		var bool=true;
		var max = parseInt(document.getElementById("range").getAttribute("data-max"));
		
		var theEvent = evt || window.event;
	 	var key = theEvent.keyCode || theEvent.which; 
		key = String.fromCharCode( key ); 
	 	var regex = /[0-9]|\./; 
	 	if( regex.test(key) || theEvent.keyCode==8 || theEvent.keyCode==46 ) 
	 	{ 
		name = $(textbox).attr('id');
		//znajdujemy numer slajdu w identyfikatorze
		for(i=0;i<name.length;i++)
		{
			bool = isNaN(name[i]);
			if(bool===false)
			{
				id=id+name[i];
			}
		}
		name2 = name.split(id);
		value[0] = $("#textboxhour"+id).val();
		value[1] = $("#textboxmin"+id).val();
		value[2] = $("#textboxsek"+id).val();
		
		for(i=0;i<3;i++){
			if(value[i]=='')
			{
				value[i]='00';
				textbox.value=buffer;
				textbox.setAttribute('value',buffer);
			}
		}
		if(name2[0]=='textboxhour')
		{
			name2[0]=0;
		}else if(name2[0]=='textboxmin')
		{
			name2[0]=1;
		}else if(name2[0]=='textboxsek')
		{
			name2[0]=2;
		}
		
		timee1 = decodingTime(value[0], value[1], value[2]);
			if(timee1>max)
			{
				textbox.value=buffer;
				textbox.setAttribute('value',buffer);
				//usuniecie starego inputa i wstawienie nowego
				if (textbox){
      				textbox.parentNode.removeChild(textbox);
  				}
  				$('.'+name).append("<input id='"+name+"'type='text' class='textboxWindows'  onkeyup='chcecktextbox(event,this)' onkeypress='validate(event,this)' value='"+buffer+"'>");
  				document.getElementById(name).focus();
			}else if(timee1<=max)
			{
				var input=$("input[name="+id+"]").get(0);
    			removeSlider(id);
    			var left="left: "+timee1/max*100+"%";
    			createSlider(id,timee1,left);
    			//usuniecie starego inputa i wstawienie nowego
   				if (textbox){
      				textbox.parentNode.removeChild(textbox);
  				}
  				$('.'+name).html("<input id='"+name+"'type='text' class='textboxWindows'  onkeyup='chcecktextbox(event,this)' onkeypress='validate(event,this)' value='"+value[name2[0]]+"'>");
				document.getElementById(name).focus();
			}
		}
}

// funkcja odpowiadająca za aktualizację sliderow ram czasowych filmow względem wartości podanych w textboxie
function chcecktextboxPlay(evt,textbox)
{
		var name,name2;
		var buffer = buffer_textbox;
		var value = new Array();
		var id;
		var i,j;
		var timee1;
		var max = parseInt(document.getElementById("range").getAttribute("data-max"));
		var bool=true;
		var textboxy=new Array();
		var timee2=new Array();
		
		var theEvent = evt || window.event;
	 	var key = theEvent.keyCode || theEvent.which; 
		key = String.fromCharCode( key ); 
	 	var regex = /[0-9]|\./; 


	 	if( regex.test(key) || theEvent.keyCode==8 || theEvent.keyCode==46 ) 
	 	{ 
		name = $(textbox).attr('id'); //textbox(0/1/2)(0/1)
		id=name[name.length-1]; // (0/1)
		name2 = name.split(id); //name2[0]=textbox(0/1/2)
		value[0] = $("#textbox0"+id).val();
		value[1] = $("#textbox1"+id).val();
		value[2] = $("#textbox2"+id).val();
		//pobieranie czasow i sprawdzenie czy sie zgadzaja
		for(i=0;i<2;i++)
		{
			for(j=0;j<3;j++)
			{
				textboxy[j]=$("#textbox"+j+i).val();
			}
			timee2[i] = decodingTime(textboxy[0], textboxy[1], textboxy[2]);
		}
        	var koniec;
        	if(timee2[0] >= timee2[1])
        	{
        		bool=false;
       	 	}
        //
		for(i=0;i<3;i++){
			if(value[i]=='')
			{
				value[i]='00';
				textbox.value=buffer;
				textbox.setAttribute('value',buffer);
			}
		}
		if(name2[0]=='textbox0')
		{
			name2[0]=0;
		}else if(name2[0]=='textbox1')
		{
			name2[0]=1;
		}else if(name2[0]=='textbox2')
		{
			name2[0]=2;
		}
		
		timee1 = decodingTime(value[0], value[1], value[2]);
			if((timee1>max) || (bool===false))
			{
				textbox.value=buffer;
				textbox.setAttribute('value',buffer);
				//usuniecie starego inputa i wstawienie nowego
				if (textbox){
      				textbox.parentNode.removeChild(textbox);
  				}
  				$('.'+name).append("<input id='"+name+"'type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+buffer+"'>");
  				document.getElementById(name).focus();
			}else if((timee1<=max) && (bool===true))
			{	
				if(id=="0")
				{
					var input=$("input[name=PoczatekFilmu]").get(0);
					id="PoczatekFilmu";
    			}else if(id=="1")
    			{
    				var input=$("input[name=KoniecFilmu]").get(0);
    				id="KoniecFilmu";
    			}
    			removeSlider(id);
    			var left="left: "+timee1/max*100+"%";
    			createSlider(id,timee1,left);
    			//usuniecie starego inputa i wstawienie nowego
   				if (textbox){
      				textbox.parentNode.removeChild(textbox);
  				}
  				$('.'+name).html("<input id='"+name+"'type='text' class='textboxWindows2'  onkeyup='chcecktextboxPlay(event,this)' onkeypress='validate(event,this)' value='"+value[name2[0]]+"'>");
				document.getElementById(name).focus();
			}
		}
}

// tylko liczby i nie wieksze od długości filmu w textboxie z numerem czasów
function validate(evt,textbox) {
	var value = textbox.value;
		buffer_textbox=value;
	 var theEvent = evt || window.event;
	 var key = theEvent.keyCode || theEvent.which; 
	 key = String.fromCharCode( key ); 
	 var regex = /[0-9]|\./; 
	 if( !regex.test(key) && theEvent.keyCode!=8 && theEvent.keyCode!=37 && theEvent.keyCode!=39 && theEvent.keyCode!=46 ) 
	 { 
	 	theEvent.returnValue = false; 
	 	if(theEvent.preventDefault) 
	 	{
	 		theEvent.preventDefault(); 
	 	}
	 } 
}

//po zapisie slajdu jesli nie ma animacji to staje się włączona
function saveSlideFromVideo()
{
	if(startInterval)
	{
		animationtabs();
	}
	stopFrame();
}

//animacja zkładki ze slajdami
function animationtabs()
{
	Interval = setInterval(function(){
	$('#slidesss').css('background','none');
	if (state)
	{
		$("#slidesss").animate(
		{
			backgroundColor: '#FFFFFF',
		}, 1000);
	} else 
	{
		$("#slidesss").animate(
		{
			backgroundColor: '#00FFFF',
		}, 1000);
	}
	state = !state;
	},1000);
	startInterval=false;
}

//powrót zakładki do normalności po kliknięciu
function slidesClick()
{
	clearInterval(Interval);
	startInterval=true;
	$( "#slidesss" ).stop();
	$('#slidesss').removeAttr('style');
}

// Zapisywanie nowego slajdu, edycja pliku z czasami i ilością slajdów
function stopFrame(){
	var canvas = document.createElement('canvas');
	var video = document.getElementById('AddNewSlide');
	canvas.width = video.videoWidth;
	canvas.height= video.videoHeight;
	canvas.getContext("2d").drawImage(video, 0, 0);
	imgData=canvas.toDataURL("image/png");
	var filename=getParameterByName("id");
 var image ={
		img:imgData,
		numberSlide:iloscSlajdow+1,
		filename:filename,
		path:slajdy[iloscSlajdow-1]+1
	};
	$.post('php/saveslide.php',image,AddSlide);
}

// Zmiany zachodzące po dodaniu nowego slajdu
function AddSlide(data)
{	
		 czasy[iloscSlajdow] = 0;
		 slajdy[iloscSlajdow] = slajdy[iloscSlajdow-1]+1;
		 AddInput(iloscSlajdow);
		 slideAddWindows(iloscSlajdow);
		 iloscSlajdow = iloscSlajdow+1;
         list();
         $('#checkbox'+slajdy[iloscSlajdow-1]).prop('checked', false);
         	 
}

//pobieranie nazwy filmu z linku
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//kontrola zabezpieczającego okienka zapisu głównego i akcje wykonane w związku z dalszym postępem
function SaveChanges(){
	//var w = window.innerWidth;
   // var h = window.innerHeight;
   // $(".overlay-message").css("top",w);
   // $(".overlay-message").css("left",h);
    $(".overlay, .overlay-message").show();
    $("#yess").click(function() {
        $(".overlay, .overlay-message").hide();
        timetimes();
        SaveSlides();
    });
    $("#noo").click(function() {
        $(".overlay, .overlay-message").hide();
    });
}

//Zapis główny edytora
function SaveSlides(){
	var tab_czas = new Array();
	var tab_id = new Array();
	var j=0;
	for(i=0;i<iloscSlajdow;i++)
	{
		var checkbox = document.getElementById("checkbox"+slajdy[i]);
		if (checkbox.checked)
    	{
    		tab_id[j]=slajdy[i];
    		tab_czas[j]=czasy[i];
    		j++;
    	}
	}
	var filename1=getParameterByName("id");
	var times ={
		id:tab_id,
		time:tab_czas,
		numberSlides:j,
		filename:filename1
	};
	$.post('php/SaveAllEdit.php',times,completSave);
	tab_czas[0]=startPlay;
	tab_czas[1]=stopPlay;
	timesFilm={
		time:tab_czas,
		filename:filename1
	};
	$.post('php/SaveEditFilmTime.php',times,completSaveTime);
	//na koniec przekierowanie do odtwarzacza z tym filmem
}

//odpowiedź po zapisie głownym
function completSave(data){
	alert("Zapis nowych danych odbył się pomyślnie");
	location.reload();
}

//odpowiedz zapisu ram czasowych filmu
function completSaveTime(data)
{
	//alert(data);
}

// integracja czasów
function timetimes(){
	for(i=0;i<iloscSlajdow;i++)
	{
		var textbox1 = document.getElementById("textboxhour"+slajdy[i]);
		var textbox2 = document.getElementById("textboxmin"+slajdy[i]);
		var textbox3 = document.getElementById("textboxsek"+slajdy[i]);
		var wartosc_textbox1=textbox1.getAttribute("value");
		var wartosc_textbox2=textbox2.getAttribute("value");
		var wartosc_textbox3=textbox3.getAttribute("value");
		
		timee1 = decodingTime(wartosc_textbox1, wartosc_textbox2, wartosc_textbox3);
		czasy[i]=timee1;
	}
	var timess=new Array();
	for(i=0;i<2;i++)
	{
		var textbox1 = document.getElementById("textbox0"+i);
		var textbox2 = document.getElementById("textbox1"+i);
		var textbox3 = document.getElementById("textbox2"+i);
		var wartosc_textbox1=textbox1.getAttribute("value");
		var wartosc_textbox2=textbox2.getAttribute("value");
		var wartosc_textbox3=textbox3.getAttribute("value");
		
		timess[i] = decodingTime(wartosc_textbox1, wartosc_textbox2, wartosc_textbox3);
	}
	startPlay=timess[0];
	stopPlay=timess[1];
}

