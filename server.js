var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.port, 'localhost', function (err, result) {
  if (err) throw err
  console.log('Listening at http://localhost:' + config.port)
})
