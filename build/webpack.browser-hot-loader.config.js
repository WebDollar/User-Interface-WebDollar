const path = require('path')
const webpack = require('webpack');
const base = require('./webpack.browser.config');
const merge = require('webpack-merge');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
        port: 4999,
        host: '0.0.0.0',
        https: true
    },

    plugins: [

        new OpenBrowserPlugin( { url: 'https://localhost:4999' } ),

        new webpack.DefinePlugin({
            "process.env": {
                DEV_SERVER: 'true'
            }
        })

    ]

});

module.exports = config;