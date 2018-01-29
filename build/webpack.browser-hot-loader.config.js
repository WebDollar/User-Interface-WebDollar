const path = require('path')
const webpack = require('webpack');
const base = require('./webpack.browser.config');
const merge = require('webpack-merge');

const config = merge(base, {

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'webpack-hot-middleware/client',
        './src/main.js'
    ],

    output: {
        path: path.resolve(__dirname, "dist_bundle"),
        publicPath: "/",
        filename: "WebDollar-User-Interface-bundle.js"
    },


    devServer: {
        port: 9000
    }

});

module.exports = config