var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var es = require('event-stream');


gulp.task('less:build', function (callback) {
    var destDir = path.join(cfg.build, cfg.context, cfg.dir.css);

    // Create a stream array
    var src = [];
    _(cfg.task.less.src).forEach(function (elem) {
        src.push(path.join(cfg.src, cfg.context, cfg.dir.less, elem));
    }).value();

    if (!_.isEmpty(src)) {
        var tasks = src.map(function (entry) {
            return gulp.src(src)
                .pipe(less({
                    compress: false
                }).on('error', gutil.log))
                .pipe(rename({
                    //basename: pkg.name,
                    suffix: "-" + cfg.version + cfg.pattern.devSuffix
                }))
                .pipe(gulp.dest(destDir));
        });
        return es.merge.apply(null, tasks);
    } else {
        callback();
    }
});


gulp.task('less:compile', function (callback) {
    var destDir = path.join(cfg.build, cfg.context, cfg.dir.css);

    // Create a stream array
    var src = [];
    _(cfg.task.less.src).forEach(function (elem) {
        src.push(path.join(cfg.src, cfg.context, cfg.dir.less, elem));
    }).value();


    if (!_.isEmpty(src)) {
        var tasks = src.map(function (entry) {
            return gulp.src(src)
                .pipe(less({
                    compress: true
                }).on('error', gutil.log))
                .pipe(rename({
                    //basename: pkg.name,
                    suffix: "-" + cfg.version
                }))
                .pipe(gulp.dest(destDir));
        });
        return es.merge.apply(null, tasks);
    } else {
        callback();
    }
});


