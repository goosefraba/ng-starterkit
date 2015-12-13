var Q = require('q');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var cfg = require('../config');

gulp.task('ui:build', function () {
    var deferred = Q.defer();
    runSequence(
        'clean:build',
        [
            'static:copy:build',
            'less:build',
            'scss:build',
            'webpack:build'
        ],
        'inject:build',
        'test:build',
        function () {
            deferred.resolve();
        });

    return deferred.promise;
});


gulp.task('ui:compile', function () {
    var deferred = Q.defer();
    runSequence(
        'clean:compile',
        [
            'static:copy:compile',
            'less:compile',
            'scss:compile',
            'webpack:compile'
        ],
        'inject:compile',
        'test:compile',
        function () {
            deferred.resolve();
        });
    return deferred.promise;
});

