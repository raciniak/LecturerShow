$(document).ready(function() {
	
    var $sliders = $('.slider');
 	setTimeout(function(){
    $sliders.each(function() {
  		
        var $current_slider = $(this);
        var $lista = $('.lista', $current_slider);
        var $li = $lista.children('li');
		
 
        if ($li.length > 6) {
			$('.prev').css("visibility","hidden");
          
            var odleglosc = parseFloat($li.eq(0).outerWidth()) + parseFloat($li.eq(0).css('margin-left')) + parseFloat($li.eq(0).css('margin-right'));
 			
            
            var maxLeft = odleglosc * $li.length - 7 * odleglosc;
 			var koniec;
			var poczatek;
			
            
            $('.next', $current_slider).click(function() {
			koniec = maxLeft + $lista.position().left;
			koniec = Math.floor(koniec);
			//alert($lista.position().left );
			//alert(koniec);
				if ($lista.position().left==0)
				{
					$('.prev', $current_slider).css("visibility","visible");
				}
				if ($lista.position().left!=0)
				{
					$('.prev', $current_slider).css("visibility","visible");
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
 
        } else {
 
            
            $('.next, .prev', $current_slider).click(function() {
                $(this).preventDefault();
                return false;
            });
 
        } 
    }); },3000);
});