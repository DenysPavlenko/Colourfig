const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

/* Hub tasks */
const hub = new HubRegistry('./gulp/**/*.js');
gulp.registry(hub);