var intID;
var a='';
var i;
// funkcje wykonujace sie po zaladowaniu strony
$(document).ready(function(){
	   //funkcja do pobierania czasow odtwarzania slajdow, kazda funkcja ktora chce korzystac z tablicy a zawierajacej
	   // czasy musi odczekac w jakis sposob chwile aby funkcja zdazyla sie wykonac
       pobierzPlik();
       taby();
       //odswieżana zmienna przy załadowaniu strony potrzebna do odtwarzacza slajdow
       $('#playPause').click(function(){i=1;});
       //funkcja odpowiadajaca za funkcjonalne okienko pomocnicze pod edytorem
       intID=setTimeout(function(){
       	windowsik();
       	uzupelnijMultiRange();
       	createRange();
       },200);
       var evt = new Event();
       var dragdrop = new Dragdrop(evt);
});

// Utworzenie MultiRange z wszystkimi slajdami wyrzuconymi przez modełko
function createRange(){
		var min = document.getElementById("range").getAttribute("data-min");
		var max = document.getElementById("range").getAttribute("data-max");
      	for(i=1;i<parseInt(a[0])+1;i++)
      	{
      		var left="left: "+a[i]/max*100+"%";
      		createSlider(i,a[i],left);
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
	for(i=1;i<parseInt(a[0])+1;i++)
	{
		var inpucik = document.createElement('input');
        inpucik.setAttribute('type', 'hidden');
        inpucik.setAttribute('name', i);
        inpucik.setAttribute('value', a[i]);
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
        var j=parseInt(a[0]);
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
                 $('.imageLoader').html('<img src="movies/movie1/images/' + i + '.jpg" alt="Obrazek nr:'+i+'"/>');
             }
        }
}

// funkcja odpowiadająca za pobranie pliku z czasami oraz liczbą slajdów
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

//funkcja odpowiadająca za uzupełnienie pola windows w edytorze do edycji slajdów
function windowsik()
{
	var i;
	for(i=1;i<parseInt(a[0])+1;i++)
	{
		var divek = document.createElement('li');
        divek.className = 'slajd';
        divek.innerHTML = "<input type='checkbox' id='"+i+"' checked='checked' onclick='checkSlajd(this)' /> <img src='movies/movie1/images/"+i+".jpg' width='140' height='70' alt='Obrazek nr:"+i+"'/>  Numer slajdu: "+i+    
        " Sekunda slajdu: <input id='"+i+"'type='text' value='"+a[i]+"'>";
        $("#windows").append(divek);
	}
}

//Funkcja odpowiadająca za checkboxy tworzy albo usuwa slider z multirange
function checkSlajd(checkbox)
{
    if (checkbox.checked)
    {
    	var max = document.getElementById("range").getAttribute("data-max");
    	var name = checkbox.getAttribute("id");
    	// JQuery zwraca tablice elementów dlatego wywołujemy get na argumencie zerowym aby nie była to talbica i można na zminnej
    	// wykonywać funkcje z javascript
    	var value = $("input[name="+name+"]").get(0);
    	value = value.getAttribute("value");
    	var left="left: "+value/max*100+"%";
    	createSlider(name,value,left);      
    }else{
    	var name = checkbox.getAttribute("id");
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
