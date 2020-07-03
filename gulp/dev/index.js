const gulp = require('gulp');
const del = require('del');

// Server
const browserSync = require('browser-sync');
// Templates
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
// Styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const gcmq = require('gulp-group-css-media-queries');
// // Scripts
const rollup = require('gulp-better-rollup')
const nodeResolve = require('rollup-plugin-node-resolve');


// Paths
const paths = {
  root: './app/static',
  clean: ['./app/static/**/*', '!./app/static/images', '!./app/static/fonts'],
  templates: {
    entry: './app/pug/*.pug',
    src: './app/pug/**/*.pug',
    dest: './app/static/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    src: './app/sass/**/*.sass',
    dest: './app/static/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    src: './app/scripts/**/*.js',
    dest: './app/static/scripts',
  },
  static: {
    src: ['./app/static/images/**/*', './app/fonts/**/*'],
  }
}

// Clean
gulp.task('clean', () => {
  return del(paths.clean)
})

// Server
gulp.task('server', (done) => {
  browserSync({
    server: paths.root,
    ghostMode: {
      scroll: true
    },
    notify: false,
    scroll: true,
    open: false,
  });
  done();
})

// Pug
gulp.task('templates', () => {
  return gulp.src(paths.templates.entry)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.reload({ stream: true }))
})

// Sass
gulp.task('styles', () =>  {
  return gulp.src(paths.styles.entry)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded', includePaths: ['./node_modules', '../node_modules']}).on("error", notify.onError()))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(gcmq())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({ stream: true }))
})

// Scripts
gulp.task('scripts', () => {
  return gulp.src(paths.scripts.entry)
    .pipe(plumber())
    .pipe(rollup({
      plugins: [nodeResolve()],
      context: 'this'
    }, {
        format: 'cjs',
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.reload({ stream: true }))
})

// Static files
gulp.task('static', () => {
  return gulp.src(paths.static.src, paths.static.base)
    .pipe(browserSync.reload({ stream: true }))
})

// Watch
gulp.task('watch', () => {
  gulp.watch(paths.templates.src, gulp.series('templates'))
  gulp.watch(paths.styles.src, gulp.series('styles'))
  gulp.watch(paths.scripts.src, gulp.series('scripts'))
  gulp.watch(paths.static.src, gulp.series('static'))
})

// Default task
gulp.task('default',
  gulp.series(
    'clean',
    gulp.parallel('templates', 'styles', 'scripts', 'static'),
    gulp.parallel('watch', 'server')
  )
);