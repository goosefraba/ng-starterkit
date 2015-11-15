var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');

gulp.task('static:copy', function (callback) {
    var destDir = path.join(cfg.build, cfg.context);
    var src = [];
    _(cfg.task.static.src).forEach(function (elem) {
        src.push(path.join(cfg.src, cfg.context, elem));
    }).value();
    return gulp.src(src)
        .pipe(gulp.dest(destDir));
});
