var gulp = require("gulp");
var gutil = require("gulp-util");
var cfg = require('../config');
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackstream = require('webpack-stream');
var browserSync = require('browser-sync').create();

var rootDir = path.resolve(__dirname, "..", "..");

gulp.task("webpack", function (callback) {
    var src = "./" + path.join(cfg.src, cfg.context, cfg.task.typescript.main);
    var destDir = path.join(rootDir, cfg.build, cfg.context);

    // run webpack
    var config = require("../util/webpack.config.pro")(src, destDir);

    return gulp.src(src)
        .pipe(webpackstream(config, webpack, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({colors: true}));
        }))
        .pipe(gulp.dest(destDir));

});

gulp.task("webpack:dev", function (callback) {
    var src = "./" + path.join(cfg.src, cfg.context, cfg.task.typescript.main);
    var destDir = path.join(rootDir, cfg.build, cfg.context);

    // load webpack config
    var config = require("../util/webpack.config.dev")(src, destDir);

    return gulp.src(src)
        .pipe(webpackstream(config, webpack, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({colors: true}));
        }))
        .pipe(gulp.dest(destDir));
});


gulp.task('ts-watch', ["webpack:dev"], function () {
    browserSync.reload();
});

gulp.task('watch', ["webpack:dev"], function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch('src/**/*.ts', ['ts-watch']);
});