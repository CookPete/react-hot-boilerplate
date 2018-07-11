import { join } from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PORT = 3000
const PRODUCTION = process.env.NODE_ENV === 'production'
const LOCAL_IDENT_NAME = PRODUCTION ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]'
const PUBLIC_PATH = PRODUCTION ? '/' : `http://localhost:${PORT}/`
const STYLE_LOADER = PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader'

const PATH_ROOT = join(__dirname, '..')
const PATH_DIST = join(PATH_ROOT, 'dist')
const PATH_SRC = join(PATH_ROOT, 'src')
const PATH_ASSETS = join(PATH_ROOT, 'assets')
const PATH_INDEX = join(PATH_ROOT, 'index.html')

export const plugins = [
  new HtmlWebpackPlugin({
    template: PATH_INDEX,
    minify: {
      collapseWhitespace: true,
      quoteCharacter: '\''
    }
  })
]

export default {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    join(PATH_SRC, 'index')
  ],
  resolve: {
    alias: {
      assets: PATH_ASSETS
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: PATH_SRC
    }, {
      test: /\.css$/,
      use: [
        STYLE_LOADER,
        `css-loader?modules&sourceMap&localIdentName=${LOCAL_IDENT_NAME}`,
        'postcss-loader'
      ],
      include: PATH_SRC
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=assets/[hash].[ext]',
      include: PATH_ASSETS
    }]
  },
  output: {
    path: PATH_DIST,
    filename: 'app.js',
    publicPath: PUBLIC_PATH
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port: PORT,
    publicPath: PUBLIC_PATH,
    hot: true,
    overlay: true,
    historyApiFallback: true
  },
  performance: {
    hints: false
  }
}
