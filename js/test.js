$(document).ready(function() {
	
    var $sliders = $('.slider');
 	
    
    $sliders.each(function() {
        var $current_slider = $(this);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
		
			
            var odleglosc = $li.eq(0).outerWidth() + parseInt($li.eq(0).css('margin-left'));
 			var maxLeft = 1000;
 			var koniec;
			var poczatek;
			//alert($lista.position().left);
			$('.next', $current_slider).click(function() {
			koniec = maxLeft + $lista.position().left;
			koniec = Math.floor(koniec);
			
				if ($lista.position().left==0)
				{
					
					$('.prev', $current_slider).css("visibility","visible");
					$($lista).not(':animated').animate({
                        'left' : '-='+100
						
                    },400);
				}
				if ($lista.position().left!=0)
				{
						
					$('.prev', $current_slider).css("visibility","visible");
					$($lista).not(':animated').animate({
                        'left' : '-='+100
						
                    },400);
				}
				if ($lista.position().left > -maxLeft) {
					
                    $($lista).not(':animated').animate({
                        'left' : '-='+odleglosc
						
                    },400);
				}
				if (koniec == 0) 
				{
					$('.next', $current_slider).eq(0).css("visibility","hidden");
				}
            });
 
            $('.prev', $current_slider).click(function() {
			poczatek = maxLeft + $lista.position().left;
					poczatek = Math.floor(poczatek);	
                if ($lista.position().left<0) {
                    $($lista).not(':animated').animate({
						
                        'left' : '+='+odleglosc
                    },400);
					
					
                }
				if(poczatek != 0)
				{
					$('.next', $current_slider).css("visibility","visible");
				}
				if(poczatek == maxLeft)
				{
					$('.prev', $current_slider).css("visibility","hidden");
				}	
				
            });
 
       
    });
});