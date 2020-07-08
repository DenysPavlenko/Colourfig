export default function () {
  var $button = $('.graphics__button--upload');
  $button.on('click', function (e) {
    e.preventDefault();
    $('html').animate({ scrollTop: 0 });
  });
}
