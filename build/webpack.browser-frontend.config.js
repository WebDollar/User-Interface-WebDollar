const webpack = require('webpack');
const base = require('./webpack.browser.config');
const merge = require('webpack-merge');

const config = merge(base, {

    output: {
        filename: '../../vue-Frontend/public/WebDollar-dist/WebDollar-User-Interface-bundle.js',
    },


});

module.exports = config