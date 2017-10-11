import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config, { plugins } from './webpack.config.babel'

export default {
  ...config,
  devtool: 'source-map',
  entry: './src/index',
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
