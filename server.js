var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(config.port, 'localhost', function (err, result) {
  if (err) throw err
  console.log('Listening at http://localhost:' + config.port)
})
