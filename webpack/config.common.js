import { join } from 'path'
import webpack from 'webpack'
import { extract } from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import precss from 'precss'
import autoprefixer from 'autoprefixer'

const PRODUCTION = process.env.NODE_ENV === 'production'

const PATH_ROOT = join(__dirname, '..')
const PATH_DIST = join(PATH_ROOT, 'dist')
const PATH_SRC = join(PATH_ROOT, 'src')
const PATH_ASSETS = join(PATH_ROOT, 'assets')
const PATH_INDEX = join(PATH_ROOT, 'index.html')

export const port = 3000

const localIdentName = PRODUCTION ? '[hash:base64:5]' : '[name]__[local]'

export const module = {
  rules: [{
    test: /\.js$/,
    loader: 'babel-loader',
    include: PATH_SRC
  }, {
    test: /\.css$/,
    use: styleLoader([
      'style-loader',
      `css-loader?modules&sourceMap&localIdentName=${localIdentName}`,
      'postcss-loader'
    ]),
    include: PATH_SRC
  }, {
    test: /\.(png|jpg)$/,
    loader: 'file-loader?name=assets/[hash].[ext]',
    include: PATH_ASSETS
  }]
}

export const plugins = [
  new HtmlWebpackPlugin({
    template: PATH_INDEX,
    minify: {
      collapseWhitespace: true,
      quoteCharacter: '\''
    }
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: PATH_ROOT,
      postcss: PRODUCTION ? [ precss, autoprefixer ] : [ precss ]
    }
  })
]

export const output = {
  path: PATH_DIST,
  filename: 'app.js',
  publicPath: PRODUCTION ? '/' : `http://localhost:${port}/`
}

function styleLoader (loaders) {
  if (process.env.NODE_ENV === 'production') {
    const [ fallback, ...use ] = loaders
    return extract({ fallback, use })
  }
  return loaders
}
