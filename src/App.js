import React, { Component } from 'react'

import 'normalize.css/normalize.css'
import styles from './App.css'

export default class App extends Component {
  render () {
    return (
      <div className={styles.red}>
        Hello world.
      </div>
    )
  }
}
