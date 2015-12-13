var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var rename = require('gulp-rename');


gulp.task('inject:build', function () {
    var src = path.join(cfg.src, cfg.context, cfg.task.inject.target);
    var destDir = path.join(cfg.build, cfg.context);
    var ignorePath = path.join(cfg.build, cfg.context);


    var sources = gulp.src([
        path.join(".", cfg.build, cfg.context, cfg.pattern.js),
        path.join(".", cfg.build, cfg.context, cfg.pattern.allSubDirs, cfg.pattern.css)
    ], {read: false});

    return gulp.src(src)
        .pipe(inject(sources, {
            addRootSlash: false,
            ignorePath: ignorePath
        }))
        .pipe(gulp.dest(destDir));
});


gulp.task('inject:compile', function () {
    var src = path.join(cfg.src, cfg.context, cfg.task.inject.target);
    var destDir = path.join(cfg.bin, cfg.context);
    var ignorePath = path.join(cfg.bin, cfg.context);


    var sources = gulp.src([
        path.join(".", cfg.bin, cfg.context, cfg.pattern.js),
        path.join(".", cfg.bin, cfg.context, cfg.pattern.allSubDirs, cfg.pattern.css)
    ], {read: false});

    return gulp.src(src)
        .pipe(inject(sources, {
            addRootSlash: false,
            ignorePath: ignorePath
        }))
        .pipe(gulp.dest(destDir));
});
