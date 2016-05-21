var webpack = require('webpack')
var precss = require('precss')
var common = require('./webpack.config.common')

var PORT = 3000

module.exports = {
  port: PORT,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  module: common.module,
  output: common.output,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function () {
    return [ precss ]
  }
}
