(function($) {

	$(document).ready(function() {

		$('.carousel').carousel();

		var blank = $('a[href="#"]');
		blank.on('click', function(e) {
			e.preventDefault();
		});

		var toTop = $('.to-top');
		toTop.on('click', function() {
			$('html, body').animate({scrollTop: 0}, 500);
		});

	});

})(jQuery);