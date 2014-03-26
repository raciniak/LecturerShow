$(document).ready(function() {
	alert('elo');
    var $sliders = $('.slider');
 	
    //dla kazdego slidera na stronie...
    $sliders.each(function() {
        var $current_slider = $(this);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
 
        //jeżeli dla danego slidera LI jest więcej od 3 to będzie można przewijać, inaczej nie ma sensu
 
        if ($li.length > 5) {
			
            //wyliczamy odległość pojedynczego przesunięcia
            var odleglosc = $li.eq(0).outerWidth() + parseInt($li.eq(0).css('margin-left')) + parseInt($li.eq(0).css('margin-right'));
 
            //po kliknięciu next przesówamy listę w lewo. Przed 3 ostatnimi elementami na liście musimy ją zatrzymać tak, by nie robiła się "pusta dziura".
            //Wyliczamy więc maksymalne przesuniecie w lewo
            var maxLeft = odleglosc * $li.length - 5 * odleglosc;
 
            //po kliknięciu na przycisk Poprzednie, przesówamy naszą listę w lewo
            $('.next', $current_slider).click(function() {
                
				if ($lista.position().left > -maxLeft) {
                    $($lista).not(':animated').animate({
                        'left' : '-='+odleglosc
                    },500);
                }
            });
 
            $('.prev', $current_slider).click(function() {
                if ($lista.position().left<0) {
                    $($lista).not(':animated').animate({
                        'left' : '+='+odleglosc
                    },500);
                }
            });
 
        } else {
 
            //jeżeli dla danego slidera przewijanie ma nie działać, wyłączmy działanie jego next i prev
            $('.next, .prev', $current_slider).click(function() {
                $(this).preventDefault();
                return false;
            });
 
        }
    });
});