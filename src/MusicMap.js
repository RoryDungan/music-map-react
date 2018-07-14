import React, { Component } from 'react'
import * as DataMap from 'datamaps'

const mapElementId = 'music-map'

export default class MusicMap extends Component {
  constructor () {
    super()

    this.onResize = () => {
      if (this.dataMap) {
        this.dataMap.resize()
      }
    }
  }

  render () {
    return <div id={mapElementId} />
  }

  componentDidMount () {
    const mapElement = document.querySelector('#' + mapElementId)

    this.dataMap = new DataMap({
      element: mapElement,
      responsive: true,
      fills: {
        defaultFill: 'lightgrey'
      }
    })

    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
}
