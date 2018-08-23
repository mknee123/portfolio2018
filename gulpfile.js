/**
Required Files
*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');

/**Development Server **/
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'http://localhost',
        server: {
          baseDir: "./web/*html"
        }
    });
});

/***
TASKS
**/

/**
 * Minify and combine CSS files, including Reset
*/
gulp.task('css-reset', function() {
    gulp.src([
            'src/css/reset.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('reset.css'))
        .pipe(gulp.dest('web/assets/css'));
});
gulp.task('css', function() {
    gulp.src([
            'src/css/stylesheet.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest('web/assets/css'));
});

/**
 * Minify and combine JS files, including jQuery and Bootstrap
 */
 gulp.task('js', function() {
     gulp.src([
             'src/js/**/*.js'
         ])
         .pipe(uglify())
         .pipe(concat('script.js'))
         .pipe(gulp.dest('web/assets/js'));
 });

 /**
  * Copy images from source to distributable
  *
  * This could be extended to create different
  * quality versions of images, or an image sprite
  */
 gulp.task('images', function() {
     gulp.src([
             'src/img/**/*'
         ])
         .pipe(gulp.dest('web/assets/img'));
 });

 /**
  * The default gulp task
  */
 gulp.task('default', function() {
     gulp.run('css-reset', 'css', 'js', 'images');
 });

 /**
  * Watch asset files for changes. First runs default task before starting watches
  */
  gulp.task('watch', function() {
          browserSync.init({
            server: {
                baseDir: "./web/"
            }
          });

          gulp.run('default');

          gulp.watch('src/css/**/*.css', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
              gulp.run('css');
          });

          gulp.watch('src/js/**/*.js', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
              gulp.run('js');
          });

          gulp.watch('src/images/**/*', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
              gulp.run('images');
          });
          gulp.watch("web/*.html").on("change", reload);
  });
