$(document).ready(function() {
	alert('elo');
    var $sliders = $('.slider');
 	
    $sliders.each(function() {
        var $current_slider = $(this);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
  
        if ($li.length > 5) {
			
            var odleglosc = $li.eq(0).outerWidth() + parseInt($li.eq(0).css('margin-left')) + parseInt($li.eq(0).css('margin-right'));
            var maxLeft = odleglosc * $li.length - 5 * odleglosc;
 
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
        	
            $('.next, .prev', $current_slider).click(function() {
                $(this).preventDefault();
                return false;
            });
 
        }
    });
});