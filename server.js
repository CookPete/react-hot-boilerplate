import webpack from 'webpack'
import Server from 'webpack-dev-server'

import config from './webpack/config.dev.babel'
import { port } from './webpack/config.common'

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}

const server = new Server(webpack(config), options)

server.listen(port, 'localhost', (err, result) => {
  if (err) {
    throw err
  }
  console.log('Listening at http://localhost:' + port)
})
