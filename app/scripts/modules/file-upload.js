export default function () {
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
