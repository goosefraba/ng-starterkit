var gulp = require("gulp");
var gutil = require("gulp-util");
var cfg = require('../config');
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackstream = require('webpack-stream');

var rootDir = path.resolve(__dirname, "..", "..");

gulp.task("webpack:compile", function (callback) {
    var src = "./" + path.join(cfg.src, cfg.context, cfg.task.typescript.main);
    var destDir = path.join(rootDir, cfg.bin, cfg.context);

    // run webpack
    var config = require("../util/webpack.config.pro")(src, destDir);

    return gulp.src(src)
        .pipe(webpackstream(config, webpack, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({colors: true}));
        }))
        .pipe(gulp.dest(destDir));

});

gulp.task("webpack:build", function (callback) {
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
