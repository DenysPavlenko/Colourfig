const gulp = require('gulp');
const del = require('del');
// Templates
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const inject = require('gulp-inject-string');
// Styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
// Scripts
const rollup = require('gulp-better-rollup')
const nodeResolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');
const concat = require('gulp-concat');
// Images
const image = require('gulp-image');

// Paths
const paths = {
  root: './dist',
  templates: {
    entry: './app/pug/*.pug',
    src: './app/pug/**/*.pug',
    dest: './dist/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    src: './app/sass/**/*.sass',
    dest: './dist/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    src: './app/scripts/**/*.js',
    dest: './dist/scripts',
  },
  images: {
    src: './app/static/images/**/*.*',
    dest: './dist/images',
  },
  fonts: {
    src: './app/static/fonts/**/*',
    base: { base: 'app/static/' },
    dest: './dist/',
    clean: './dist/fonts/',
  }
}

// Clean
gulp.task('build:clean', () => {
  return del(paths.root)
})

// Pug
gulp.task('build:templates', () => {
  return gulp.src(paths.templates.entry)
    .pipe(pug({pretty: true}))
    // Inject concatenated styles link
    .pipe(replace(/<link.*href=["|\']?(.*[\\\|\/]?.*)\.css["|\']?.*/g, ''))
    .pipe(inject.before(`</head>`, `\n<link rel="stylesheet" type="text/css" href="./styles/main.css">`))
    // Inject concatenated scripts
    .pipe(replace(/<script.*src=["|\']?(.*[\\\|\/]?.*)\.js["|\']?.*/g, ''))
    .pipe(inject.before(`</body>`, `\n<script src="./scripts/main.js"></script>`))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.templates.dest))
})

// Sass
gulp.task('build:styles', () => {
  return gulp.src(paths.styles.entry)
    .pipe(sass({ outputStyle: 'compressed', includePaths: ['node_modules'] }))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(gcmq())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
})

// Scripts
gulp.task('build:scripts', () => {
  return gulp.src(paths.scripts.entry)
    .pipe(rollup({
      plugins: [nodeResolve(), uglify()],
      context: 'this'
    }, {
      format: 'cjs',
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
})

// Images
gulp.task('build:images', () => {
  return gulp.src(paths.images.src)
    .pipe(image({
      pngquant: ['--quality', '80-97'],
      mozjpeg: ['-quality', '97'],
    }))
    .pipe(gulp.dest(paths.images.dest))
})

// Fonts
gulp.task('build:fonts', () => {
  return gulp.src(paths.fonts.src, paths.fonts.base)
    .pipe(gulp.dest(paths.fonts.dest))
})

// Default task
gulp.task('build',
  gulp.series(
    'build:clean',
    gulp.parallel('build:templates', 'build:styles', 'build:scripts', 'build:images', 'build:fonts')
  )
);