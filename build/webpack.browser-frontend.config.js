const webpack = require('webpack');
const base = require('./webpack.browser.config');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const config = merge(base, {
  output: {
    filename:
      '../../vue-Frontend/public/WebDollar-dist/WebDollar-User-Interface-bundle.js'
  },

  plugins: [
    new CopyPlugin([
        { from: './dist_bundle/assets', to: '../../vue-Frontend/public/WebDollar-dist/assets' }
    ])
  ]
});

module.exports = config;
