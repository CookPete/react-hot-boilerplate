import { join } from 'path'
import { extract } from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PATH_ROOT = join(__dirname, '..')
const PATH_DIST = join(PATH_ROOT, 'dist')
const PATH_SRC = join(PATH_ROOT, 'src')
const PATH_INDEX = join(PATH_ROOT, 'index.html')
const PATH_NORMALIZE = join(PATH_ROOT, 'node_modules', 'normalize.css')

export const port = 3000

export const module = {
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    include: PATH_SRC
  }, {
    test: /\.css$/,
    loader: styleLoader(['style', 'css?modules&sourceMap&localIdentName=[hash:base64:3]', 'postcss']),
    include: PATH_SRC
  }, {
    test: /\.css$/,
    loader: styleLoader(['style?insertAt=top', 'css']),
    include: PATH_NORMALIZE
  }]
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
  publicPath: '/'
}

function styleLoader (loaders) {
  if (process.env.NODE_ENV === 'production') {
    return extract(loaders[0], loaders.slice(1).join('!'))
  }
  return loaders.join('!')
}
