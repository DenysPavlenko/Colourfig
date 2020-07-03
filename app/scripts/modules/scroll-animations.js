export default function () {
	var $items = $('[data-scroll-animation]');
	var windowHeight = $(window).height();
var bottomOffset = '80%';
	var resizeEnd;

	// Change windowHeight on resize
	$(window).on('resize', function () {
		clearTimeout(resizeEnd);
		resizeEnd = setTimeout(function () {
			windowHeight = $(window).height();
		}, 100);
	});
	// Run scrollAnimation
	scrollAnimation();
	// ScrollAnimation on window scroll
	$(window).on('scroll', scrollAnimation);

	// Scroll animation function
	function scrollAnimation() {
		var windowScrollTop = $(window).scrollTop();
		var windowOffset = windowScrollTop + windowHeight * parseInt(bottomOffset) / 100;

		// Add animation class to element
		$items.each(function () {
			var elem = $(this);
			if (elem.offset().top <= windowOffset) {
				var animationClass = elem.attr('data-scroll-animation');
				var animationDelay = elem.attr('data-scroll-animation-delay');
				elem
					.css({
						'-webkit-animation-delay': animationDelay,
						'-mox-animation-delay': animationDelay,
						'-o-animation-delay': animationDelay,
						'animation-delay': animationDelay,
					})
					.addClass(animationClass);
			}
		})
	}
}