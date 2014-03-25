var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var server = require('./server');
var watch = require('gulp-watch');
var runSequence = require('gulp-run-sequence');
var rename = require("gulp-rename");

gulp.task('scripts', function () {
    return gulp.src('./example/main.js', {
        read: false
    }).pipe(browserify({
        transform: ['jstify'],
        shim: {
        },
        debug: false
    }))
    .pipe(rename("build.js"))
    .pipe(gulp.dest('./example/'));
});

gulp.task('default', ['build'], function () {
    var servers = server(3000, 35729);

    gulp.watch(['./example/**/*.*', './src/**/*.*', '!./example/build.js'], function (evt) {
        gulp.run('scripts', function () {
            // servers.lr.changed({
            //     body: {
            //         files: ['dist/js/main.js']
            //     }
            // });
        });
    });

});

gulp.task('build', function (cb) {
    runSequence('scripts', cb);
});
