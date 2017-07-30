var gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

var path = ['src/index.html', 'src/app.module.js'];

var images = ['src/asserts/brand.jpg', 'src/asserts/logo.png'];

//Watch files
gulp.task('watch', function(done) {
    browserSync.reload();
    done();
});

// Static server
gulp.task('serve:src', function() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
    gulp.watch(path, ['watch']);
});

gulp.task('imagemin', function() {
    gulp.src(images)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/asserts'));
});

gulp.task('useref', function() {
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve:dist', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('build', ['imagemin', 'useref', 'serve:dist']);

gulp.task('default', ['serve:src']);