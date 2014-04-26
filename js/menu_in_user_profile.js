	$(document).ready(function() {
		$('ul#form li a').click(
			function(e) {
				e.preventDefault(); // prevent the default action
				e.stopPropagation; // stop the click from bubbling
				$(this).closest('ul').find('.active').removeClass('active');
				$(this).parent().addClass('active');
			});
	});