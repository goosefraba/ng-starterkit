var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-rimraf');
var path = require('path');
var cfg = require('../config');

gulp.task('clean', function () {
    var destDir = path.join(cfg.build);
    return gulp.src([destDir], {read: false})
        .pipe(clean().on('error', gutil.log));
});