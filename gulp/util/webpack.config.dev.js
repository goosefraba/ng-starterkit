var cfg = require('../config');
var path = require("path");
var webpack = require("webpack");
var rootDir = path.resolve(__dirname, "..", "..");


module.exports = function (src, dest) {

    return {
        progress: true,
        bail: true,
        debug: true,
        devtool: "#inline-source-map",
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
            path: dest,
            filename: cfg.task.typescript.outputname + "-" + cfg.version + cfg.pattern.devSuffix + ".js"
        }
    }
};