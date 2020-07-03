'use strict'
// Modules
import preloader from './modules/preloader';
import graphics from './modules/graphics';
import fileUpload from './modules/file-upload';
import filesDownload from './modules/files-download';
import scrollAnimations from './modules/scroll-animations';

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
