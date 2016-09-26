import webpack from 'webpack'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { module, output } from './config.common'

export default {
  devtool: 'source-map',
  entry: './src/index',
  module,
  output,
  plugins: [
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
  postcss: function () {
    return [ autoprefixer, precss ]
  }
}
