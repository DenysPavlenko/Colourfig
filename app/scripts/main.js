'use strict'
// Modules
import scrollAnimations from './modules/scroll-animations';
import preloader from './modules/preloader';
import fileUpload from './modules/file-upload';
import filesDownload from './modules/files-download';
import uploadButton from './modules/upload-button';

// On document ready
$(function () {
  fileUpload();
  filesDownload();
  uploadButton();
});

// On window load
$(window).on('load', function () {
  preloader();
  scrollAnimations();
});
