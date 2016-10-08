import { join } from 'path'
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

export const module = {
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    include: PATH_SRC
  }, {
    test: /\.css$/,
    loader: styleLoader('style!css?modules&sourceMap&localIdentName=[hash:base64:3]!postcss'),
    include: PATH_SRC
  }, {
    test: /\.(png|jpg)$/,
    loader: 'file?name=assets/[hash].[ext]',
    include: PATH_ASSETS
  }]
}

export function postcss (webpack) {
  const array = [
    precss({
      import: {
        addDependencyTo: webpack
      }
    })
  ]
  return PRODUCTION ? array.concat(autoprefixer) : array
}

export const plugins = [
  new HtmlWebpackPlugin({
    template: PATH_INDEX,
    minify: {
      collapseWhitespace: true,
      quoteCharacter: '\''
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
    const [ first, ...rest ] = loaders.split('!')
    return extract(first, rest.join('!'))
  }
  return loaders
}
