import React, { Component } from 'react'
import * as DataMap from 'datamaps'

const mapElementId = 'music-map'

// Colours for the fill of the map.
// RdPu from ColorBrewer
const fills = {
  f0: '#FFF7F3',
  f1: '#FDE0DD',
  f2: '#FCC5C0',
  f3: '#FA9FB5',
  f4: '#F768A1',
  f5: '#DD3497',
  f6: '#AE017E',
  f7: '#7A0177',
  f8: '#49006A'
}

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

  componentDidUpdate () {
    if (this.props.artist && this.props.artist.streams) {
      this.drawMap(this.props.artist.streams)
    }
  }

  drawMap (streams) {
    // Turn numbers of streams into colours

    // First, work out the largest streams value so that we can scale the values
    // relative to that.
    const maxValue = Object.values(streams).reduce(
      (acc, curr) => curr > acc ? curr : acc,
      0
    )

    const formattedStats = {}
    for (const v in streams) {
      if (!streams.hasOwnProperty(v)) {
        continue
      }

      const relativeToMax = streams[v] / maxValue
      let streamsKey = 'f8'
      for (let i = 1; i < 9; i++) {
        if (relativeToMax < i / 9) {
          streamsKey = 'f' + (i - 1)
          break
        }
      }

      formattedStats[v] = fills[streamsKey]
    }

    this.dataMap.updateChoropleth(formattedStats, { reset: true })
  }
}
