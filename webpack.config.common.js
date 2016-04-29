var path = require('path')

var DIST = path.join(__dirname, 'dist')
var SRC = path.join(__dirname, 'src')

module.exports = {
  output: {
    path: DIST,
    filename: 'app.js',
    publicPath: '/'
  },
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
  }
}
