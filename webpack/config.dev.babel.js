import webpack from 'webpack'
import { port, module, output, plugins } from './config.common'

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  module,
  output,
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port,
    publicPath: output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }
}
