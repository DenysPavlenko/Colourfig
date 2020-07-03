export default function () {
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
