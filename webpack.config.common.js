var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var DIST = path.join(__dirname, 'dist')
var SRC = path.join(__dirname, 'src')

function styleLoaders (loaders) {
  if (process.env.NODE_ENV === 'production') {
    return ExtractTextPlugin.extract(loaders[0], loaders.slice(1).join('!'))
  }
  return loaders.join('!')
}

module.exports = {
  output: {
    path: DIST,
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: SRC
    }, {
      test: /\.css$/,
      loader: styleLoaders(['style', 'css?modules&sourceMap', 'postcss']),
      include: SRC
    }, {
      test: /\.css$/,
      loader: styleLoaders(['style?insertAt=top', 'css']),
      include: path.join(__dirname, 'node_modules', 'normalize.css')
    }]
  }
}
