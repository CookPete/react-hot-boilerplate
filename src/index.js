import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const app = document.getElementById('app')

render(<AppContainer component={App} />, app)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<AppContainer component={require('./App').default} />, app)
  })
}
