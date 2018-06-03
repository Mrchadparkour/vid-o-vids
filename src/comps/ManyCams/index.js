import React, { Component } from 'react'
import drawManyCams from './drawManyCams'

export default class ManyCams extends Component {
  constructor() {
    super()
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const { chop } = this.props
    drawManyCams(this.canvas.current, chop)
  }

  componentDidUpdate() {
    const { chop } = this.props
    drawManyCams(this.canvas.current, chop)
  }

  render() {
    return <canvas ref={ this.canvas } height="450px" width="800px"></canvas>
  }
}
