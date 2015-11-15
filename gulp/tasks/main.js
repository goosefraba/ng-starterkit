var Q = require('q');
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var eventStream = require('event-stream');
var cfg = require('../config');

gulp.task('ui:build', function () {
    var deferred = Q.defer();
    runSequence(
        //'clean',
        'static:copy',
        'less:build',
        //'i18n',
        'webpack:dev',
        function () {
            deferred.resolve();
        });

    return deferred.promise;
});


gulp.task('ui:compile', function () {
    var deferred = Q.defer();
    runSequence(
        'clean',
        'ui:build',
        'webpack',
        'less:compile',
        function () {
            deferred.resolve();
        });

    return deferred.promise;
});


gulp.task('ui:watch', ['ui:build'], function () {
    // .ts files
    gulp.watch('src/**/*.ts', ['webpack:watch']);
    // .tpl.html files
    gulp.watch('src/**/*.tpl.html', ['static:copy']);
});
