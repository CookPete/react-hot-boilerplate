var webpack = require('webpack')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var common = require('./config.common')

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  module: common.module,
  output: common.output,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      comments: false
    }),
    new ExtractTextPlugin('app.css')
  ],
  postcss: function () {
    return [ autoprefixer, precss ]
  }
}
