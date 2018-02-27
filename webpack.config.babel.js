import { join } from 'path'
import webpack from 'webpack'
import { extract } from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PORT = 3000
const PRODUCTION = process.env.NODE_ENV === 'production'
const LOCAL_IDENT_NAME = PRODUCTION ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]'
const PUBLIC_PATH = PRODUCTION ? '/' : `http://localhost:${PORT}/`

const PATH_DIST = join(__dirname, 'dist')
const PATH_SRC = join(__dirname, 'src')
const PATH_ASSETS = join(__dirname, 'assets')
const PATH_INDEX = join(__dirname, 'index.html')

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
    './src/index'
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
      use: styleLoader([
        'style-loader',
        `css-loader?modules&sourceMap&localIdentName=${LOCAL_IDENT_NAME}`,
        'postcss-loader'
      ]),
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
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  performance: {
    hints: false
  }
}

function styleLoader (loaders) {
  if (process.env.NODE_ENV === 'production') {
    const [ fallback, ...use ] = loaders
    return extract({ fallback, use })
  }
  return loaders
}
