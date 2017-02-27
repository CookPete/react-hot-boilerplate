import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { module, output, plugins } from './config.common'

export default {
  devtool: 'source-map',
  entry: './src/index',
  resolve: {
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
  },
  module,
  output,
  plugins: [
    ...plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new ExtractTextPlugin({ filename: 'app.css' })
  ]
}
