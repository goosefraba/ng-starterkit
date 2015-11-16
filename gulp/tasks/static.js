var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');

gulp.task('static:copy:build', function (callback) {
    var destDir = path.join(cfg.build, cfg.context);
    var src = [];
    _(cfg.task.static.src).forEach(function (elem) {
        src.push(path.join(cfg.src, cfg.context, elem));
    }).value();
    return gulp.src(src)
        .pipe(gulp.dest(destDir));
});

gulp.task('static:copy:compile', function (callback) {
    var destDir = path.join(cfg.bin, cfg.context);
    var src = [];
    _(cfg.task.static.src).forEach(function (elem) {
        src.push(path.join(cfg.src, cfg.context, elem));
    }).value();
    return gulp.src(src)
        .pipe(gulp.dest(destDir));
});

