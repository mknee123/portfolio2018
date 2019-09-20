/**
Required Files
*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');

/**Development Server **/
var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

function reload() {
    browserSync.reload();
}

/***
TASKS
**/

/**
 * Minify and combine CSS files, including Reset
*/
function style() {
    return gulp.src('src/css/stylesheet.css')
    .pipe(minifyCSS())
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('web/assets/css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './web'
        }
    });

    gulp.watch('src/css/stylesheet.css', style);
    gulp.watch('./*html', reload);
}

exports.watch = watch;

exports.style = style;

var build = gulp.parallel(style, watch);

gulp.task('build', build);
gulp.task('default', build);

 /**
  * Copy images from source to distributable
  *
  * This could be extended to create different
  * quality versions of images, or an image sprite
  */
//  gulp.task('images', function() {
//      gulp.src([
//              'src/img/**/*'
//          ])
//          .pipe(gulp.dest('web/assets/img'));
//  });

 /**
  * The default gulp task
  */

