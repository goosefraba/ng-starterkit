var cfg = require('../config');
var path = require("path");
var webpack = require("webpack");
var WebpackStrip = require('strip-loader');


module.exports = function (src, dest) {

    var config = require("./webpack.config.dev")(src, dest);
    config.debug = false;
    config.devtool = undefined;
    config.output.filename = cfg.task.typescript.outputname + "-" + cfg.version + ".js";
    config.cache = false;

    // add optimization plugin
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        dead_code: true
    }));
    // remove debug output
    config.module.loaders.unshift(
        {test: /\.ts$/, loader: WebpackStrip.loader('console.log')}
    );

    return config;
};