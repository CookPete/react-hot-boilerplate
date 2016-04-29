var path = require('path')
var webpack = require('webpack')
var precss = require('precss')

var PORT = 3000
var DIST = path.join(__dirname, 'dist')
var SRC = path.join(__dirname, 'src')

module.exports = {
  port: PORT,
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: DIST,
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: SRC
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?modules', 'postcss'],
      include: SRC
    }, {
      test: /\.css$/,
      loaders: ['style?insertAt=top', 'css'],
      include: path.join(__dirname, 'node_modules', 'normalize.css')
    }]
  },
  postcss: function () {
    return [ precss ]
  }
}
