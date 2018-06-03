import React, { Component } from 'react'
import ManyCams from '../ManyCams'
import Slider from '../Slider'
import style from './style.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      chop: 20
    }
    this.updateChop = this.updateChop.bind(this)
  }

  updateChop(chop) {
    chop = parseInt(chop, 10)
    this.setState({ chop })
  }

  render() {
    const { chop } = this.state
    return (
      <div className={style.AppContainer}>
        <Slider updateChop={ this.updateChop } chop={ chop }/>
        <ManyCams chop = { chop }/>
      </div>
    )
  }
}

export default App;
