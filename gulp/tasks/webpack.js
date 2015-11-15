var gulp = require("gulp");
var gutil = require("gulp-util");
var cfg = require('../config');
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackstream = require('webpack-stream');
var WebpackStrip = require('strip-loader');
var browserSync = require('browser-sync').create();


var rootDir = path.resolve(__dirname, "..", "..");

gulp.task("webpack", function (callback) {
    var src = "./" + path.join(cfg.src, cfg.context, cfg.task.typescript.main);
    var destDir = path.join(rootDir, cfg.build, cfg.context);

    // run webpack
    var config = getWebpackConfig(src, destDir);

    // add optimization plugin
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        dead_code: true
    }));

    // output name
    config.output.filename = "./" + getOutputName() + ".js";
    config.cache = false;
    // remove debug output
    config.module.loaders.unshift(
        {test: /\.ts$/, loader: WebpackStrip.loader('console.log')}
    );


    return gulp.src(src)
        .pipe(webpackstream(config, null, function (err, stats) {
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
    gulp.watch('src/**/*.ts', ['ts-watch'])

});


gulp.task("webpack:dev", function (callback) {
    var src = "./" + path.join(cfg.src, cfg.context, cfg.task.typescript.main);
    var destDir = path.join(rootDir, cfg.build, cfg.context);

    // run webpack
    var config = getWebpackConfig(src, destDir);
    config.debug = true;
    config.devtool = "#inline-source-map";

    // output
    config.output.filename = getOutputName() + cfg.pattern.devSuffix + ".js";

    return gulp.src(src)
        .pipe(webpackstream(config, webpack, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({colors: true}));
        }))
        .pipe(gulp.dest(destDir));
});

function getOutputName() {
    return cfg.task.typescript.outputname + "-" + cfg.version;
}


function getWebpackConfig(src, destDir) {
    var rootDir = path.resolve(__dirname, "..", "..");
    return {
        progress: true,
        bail: true, // fail on errors
        entry: {
            app: src
        },
        // Currently we need to add '.ts' to resolve.extensions array.
        resolve: {
            root: [rootDir],
            modulesDirectories: ["web_modules", "node_modules", "bower_components"],
            extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
            alias: {
                bower: "bower_components",
                src: "src"
            }
        },
        plugins: [
            new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
            ),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                _: "lodash"
            })
        ],
        // Add loader for .ts files.
        module: {
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: "tslint"
                }
            ],
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader?module=common&target=es5'
                },
                // https://github.com/webpack/webpack/issues/512
                {
                    test: /[\\\/]bower_components[\\\/]venturocket-angular-slider[\\\/]build[\\\/]angular-slider\.js$/,
                    loader: "imports?this=>window!exports?window.Modernizr"
                }
            ]
        },
        output: {
            path: destDir,
            filename: './[name].js'
        }

    }
}