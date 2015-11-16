var Q = require('q');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var cfg = require('../config');
var browserSync = require('browser-sync').create("NgSync");

gulp.task('ui:watch', ['ui:build'], function () {
    browserSync.init({
        server: {
            baseDir: path.join(cfg.build, cfg.context)
        },
        reloadDebounce: 1000
    });

    var srcContextSearchDir = path.join(cfg.src, cfg.context, cfg.pattern.allSubDirs);
    var buildContextSearchDir = path.join(cfg.build, cfg.context, cfg.pattern.allSubDirs);

    // and call any methods on it.
    browserSync.watch([
        path.join(buildContextSearchDir, cfg.pattern.js),
        path.join(buildContextSearchDir, cfg.pattern.css),
        path.join(buildContextSearchDir, cfg.pattern.json)
    ]).on('change', browserSync.reload);
    browserSync.watch().on('change', browserSync.reload);

    // .ts files
    gulp.watch(path.join(srcContextSearchDir, cfg.pattern.ts), ["webpack:build"]);
    // .html files
    gulp.watch(path.join(srcContextSearchDir, cfg.pattern.html), ['static:watch']);
    // .json files
    gulp.watch(path.join(srcContextSearchDir, cfg.pattern.json), ['static:watch']);
    // .less files
    gulp.watch(path.join(srcContextSearchDir, cfg.pattern.less), ['less:build']);
    // .scss files
    gulp.watch(path.join(srcContextSearchDir, cfg.pattern.less), ['sass:build']);
});


gulp.task('static:watch', function () {
    var deferred = Q.defer();
    runSequence(
        'static:copy:build',
        'inject:build',
        function () {
            browserSync.reload();
            deferred.resolve();
        });

    return deferred.promise;
});





