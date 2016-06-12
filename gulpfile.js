var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var uglifyJS = require('gulp-uglify');

var browserSync = require('browser-sync').create();

var config = {
  bowerDir : './build/js/vendor/bower_components/',
  sourceDir: './dist/',
  publicDir: './build/'
};

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch(config.sourceDir + 'sass/**/*.*', ['styles']);
  gulp.watch(config.sourceDir + 'js/**/*.*', ['scripts']);
  gulp.watch(config.publicDir + 'css/*.css').on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('bower', function () {

  var jsFilter = gulpFilter(['*.js', '!*.min.js']);
  var jsMinFilter = gulpFilter('*.min.js');
  var cssFilter = gulpFilter('*.css');

  var jsDir = config.publicDir + 'js/vendor';
  var cssDir = config.publicDir + 'css';

  return gulp.src(mainBowerFiles())

    // JS, EXCLUDING .min.js
    .pipe(jsFilter)
    .pipe(gulp.dest(jsDir)) // save source files
    .pipe(sourcemaps.init())
    .pipe(uglifyJS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(jsDir)) // save uglified files
    .pipe(jsFilter.restore())

    // JS, .min.js ONLY
    .pipe(jsMinFilter)
    .pipe(gulp.dest(jsDir))
    .pipe(jsMinFilter.restore())

    // CSS
    .pipe(cssFilter)
    .pipe(gulp.dest(cssDir)) // save source files
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(cssDir)) // save minified files
    .pipe(cssFilter.restore())

});

gulp.task('styles', function () {
  return sass(config.sourceDir + 'sass', {
    sourcemap: true,
    compass  : true,
    loadPath : [
      config.bowerDir + 'bootstrap-sass-official/assets/stylesheets',
      config.bowerDir + 'font-awesome/scss'
    ],
    style    : 'compressed'
  })
    .pipe(prefix({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Android > 4',
        'Explorer > 8',
        'Firefox ESR',
        'Opera 12.1'
      ],
      cascade : false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicDir + 'css'));
});

gulp.task('scripts', function () {

  var jsDir = config.publicDir + 'js';

  return gulp.src(config.sourceDir + 'js/*.js')
    .pipe(gulp.dest(jsDir))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglifyJS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(jsDir));
});

gulp.task('watch', function () {
  gulp.watch(config.sourceDir + 'sass/**/*.*', ['styles']);
  gulp.watch(config.sourceDir + 'js/**/*.*', ['scripts']);
});

gulp.task('default', function () {
  runSequence(
    ['bower'],
    ['styles', 'scripts'],
    ['serve']
  );
});

