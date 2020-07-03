'use strict';

function preloader () {
  var $preloader = $('.preloader');
  var $body = $('body');

  $preloader.fadeOut();
  $body.removeClass('loaded');
}

function graphics () {
  var $pagination = $('.pagination__item');
  var $arrows = $('.graphics__arrow');
  var $pages = $('.graphics__page');

  var currentPage = 1;
  var pagesQuant = $pages.length;

  $pagination.on('click', function () {
    var $this = $(this);
    currentPage = +$this.attr('data-page-number');
    switchPagination(currentPage);
    switchPage(currentPage);
  });

  $arrows.on('click', function () {
    var $arrow = $(this);
    var dataArrow = $arrow.attr('data-arrow');
    if (dataArrow === 'prev') {
      currentPage--;
      if (currentPage < 1) {
        currentPage = pagesQuant;
      }
      switchPage(currentPage);
      switchPagination(currentPage);
    }
    else if (dataArrow === 'next') {
      currentPage++;
      if (currentPage > pagesQuant) {
        currentPage = 1;
      }
      switchPagination(currentPage);
      switchPage(currentPage);
    }
  });

  function switchPage(pageNumber) {
    $pages.removeClass('graphics__page--active');
    $pages.each(function () {
      var $page = $(this);
      var dataPage = +$page.attr('data-page');
      if (pageNumber === dataPage) {
        $page.addClass('graphics__page--active');
      }
    });
  }

  function switchPagination(currentPage) {
    $pagination.removeClass('pagination__item--active');
    $pagination.eq(currentPage - 1).addClass('pagination__item--active');
  }
}

function fileUpload () {
  var $buttons = $('.header__button, .graphics__button--upload');
  var $messagePopup = $('.file-upload__message');
  var $messageText = $('.file-upload__message-text');
  var $messageClose = $('.file-upload__message-close');
  var $input = $('.file-upload__input');
  var $loadingLine = $('.file-upload__loading');

  $buttons.on('click', function () {
    $input.trigger('click');
  });

  $input.on('change', function () {
    var fileInput = this;
    var filePath = fileInput.value;
    var allowedExtensions = /(\.ai|\.eps)$/i;
    if (!allowedExtensions.exec(filePath)) {
      showMessage("We're sorry. The document you are uploading is in an unsupported format. Please upload a document in AI or EPS format.", 'error');
      fileInput.value = '';
      return false;
    }
    else {
      if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.addEventListener('progress', showProgress);
        reader.addEventListener('loadend', function () {
          showMessage('The file was uploaded successfully', 'success');
          // Submit here...
          fileInput.value = '';
        });
        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  });

  function showMessage(message, type) {
    $messagePopup.slideDown().attr('data-type', type);
    $messageText.html(message);
    setTimeout(function () {
      $messagePopup.slideUp();
    }, 4000);
    $messageClose.one('click', function () {
      $messagePopup.slideUp();
    });
  }

  function showProgress(evt) {
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      if (percentLoaded <= 100) {
        $loadingLine.css('width', percentLoaded + '%');
        if (percentLoaded === 100) {
          $loadingLine.attr('style', '');
          percentLoaded = 0;
        }
      }
    }
  }
}

function filesDownload () {
  var $html = $('html');
  var $button = $('.graphics__button--download');
  var $waitingScreen = $('.waiting-screen');

  $button.on('click', function () {
    showWaitingScreen();
    setTimeout(function () {
      hideWaitingScreen();
    }, 2000);
  });

  function showWaitingScreen() {
    $waitingScreen.fadeIn();
    $html.css('padding-right', scrollBarWidth() + 'px');
    $html.css('overflow', 'hidden');
  }

  function hideWaitingScreen() {
    $waitingScreen.fadeOut();
    $html.css('padding-right', 0);
    $html.css('overflow', 'auto');
  }

  function scrollBarWidth() {
    return window.innerWidth - document.body.clientWidth;
  }
}

function scrollAnimations () {
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
		});
	}
}

// On document ready
$(function () {
  graphics();
  fileUpload();
  filesDownload();
});

// On window load
$(window).on('load', function () {
  preloader();
  scrollAnimations();
});
