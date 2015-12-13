var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');
var karma = require('gulp-karma');

gulp.task('test:build', function () {
    return gulp.src('./foo')
        .pipe(karma({
            configFile: 'gulp/util/karma.conf.dev.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('test:compile', function () {
    return gulp.src('./foo')
        .pipe(karma({
            configFile: 'gulp/util/karma.conf.pro.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});
