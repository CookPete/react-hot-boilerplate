import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './App.css'

class App extends Component {
  render () {
    return (
      <div className={styles.red}>
        Hello world.
      </div>
    )
  }
}

export default hot(module)(App)
