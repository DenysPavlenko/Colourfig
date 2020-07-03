export default function () {
  var $preloader = $('.preloader');
  var $body = $('body');

  $preloader.fadeOut();
  $body.removeClass('loaded');
}
