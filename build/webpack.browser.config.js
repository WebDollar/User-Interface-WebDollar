const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = merge(base, {
    target: 'web',

    node: {
        console: false,
        child_process: "empty",
        dgram: "empty",
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        uws: 'empty'
    },

    //define entry point
    entry: {
        app: "./src/main.js",
    },
    output: {
        filename: 'WebDollar-User-Interface-bundle.js',
    },
    resolve: {
        alias: {

        }
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: 'true'
            }
        })
    ]

});

module.exports = config