var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');
var jasmine = require('gulp-jasmine');

gulp.task('test:build', function () {
    return gulp.src(path.join(cfg.build, cfg.context, cfg.pattern.allSubDirs, "*.spec.js"))
        .pipe(jasmine());
});


gulp.task('test:compile', function () {
    return gulp.src(path.join(cfg.bin, cfg.context, cfg.pattern.allSubDirs, "*.spec.js"))
        .pipe(jasmine());
});

