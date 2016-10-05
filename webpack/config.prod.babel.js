import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { module, output, plugins, postcss } from './config.common'

export default {
  devtool: 'source-map',
  entry: './src/index',
  module,
  output,
  plugins: [
    ...plugins,
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
  postcss
}
