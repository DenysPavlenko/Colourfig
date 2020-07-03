export default function () {
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
