var Vue = require('vue/dist/vue.min.js');
const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production'
//const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');
const isAnalyze = true

module.exports = {

    //define entry point
    entry: ['babel-regenerator-runtime'],

    // send to distribution
    output: {
        path: path.resolve(__dirname, '../dist_bundle'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'helpers': path.resolve(__dirname + '/../src/helpers'),
            'components': path.resolve(__dirname + '/../src/components'),
            'initialize-params': path.resolve(__dirname + '/../src/initialize-params'),
            'maps': path.resolve(__dirname + '/../src/maps'),
            'mining': path.resolve(__dirname + '/../src/mining'),
            'wallet': path.resolve(__dirname + '/../src/wallet'),
            'UI': path.resolve(__dirname + '/../src/UI'),
        }

    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process

        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader']
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: ['es2017', "env"],
                }
            },
        ]

    },

    plugins:
        isProd
            ? [
                ...isAnalyze ? [new BundleAnalyzerPlugin()] : [],

                new webpack.optimize.UglifyJsPlugin({
                    compress: { warnings: false }
                }),
                new ExtractTextPlugin({
                    filename: 'common.[chunkhash].css'
                })
            ]
            : [
                ...isAnalyze ? [new BundleAnalyzerPlugin()] : [],
                new FriendlyErrorsPlugin()
            ]

}