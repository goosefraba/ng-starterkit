var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-rimraf');
var path = require('path');
var cfg = require('../config');

gulp.task('clean:build', function () {
    var destDir = path.join(cfg.build);
    return gulp.src([destDir], {read: false})
        .pipe(clean().on('error', gutil.log));
});

gulp.task('clean:compile', function () {
    var destDir = path.join(cfg.bin);
    return gulp.src([destDir], {read: false})
        .pipe(clean().on('error', gutil.log));
});