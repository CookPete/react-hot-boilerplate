var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var PATH_DIST = path.join(__dirname, 'dist')
var PATH_SRC = path.join(__dirname, 'src')
var PATH_NORMALIZE = path.join(__dirname, 'node_modules', 'normalize.css')

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: PATH_SRC
    }, {
      test: /\.css$/,
      loader: styleLoader(['style', 'css?modules&sourceMap&localIdentName=[hash:base64:3]', 'postcss']),
      include: PATH_SRC
    }, {
      test: /\.css$/,
      loader: styleLoader(['style?insertAt=top', 'css']),
      include: PATH_NORMALIZE
    }]
  },
  output: {
    path: PATH_DIST,
    filename: 'app.js',
    publicPath: '/'
  }
}

function styleLoader (loaders) {
  if (process.env.NODE_ENV === 'production') {
    return ExtractTextPlugin.extract(loaders[0], loaders.slice(1).join('!'))
  }
  return loaders.join('!')
}
