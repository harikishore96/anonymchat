var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var path = ['src/index.html', 'src/app.module.js'];

//Watch files
gulp.task('watch', function(done) {
    browserSync.reload();
    done();
});

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
    gulp.watch(path, ['watch']);
});

gulp.task('default', ['serve']);