import React, { Component } from 'react'
import logo from './logo.svg'
import Button from 'antd/lib/button'
import ArtistsSelect from './ArtistsSelect'
import DetailsPane from './DetailsPane'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.artistsService.getAllArtists()
      .then(artists => {
        if (this.shouldCancel) {
          return
        }

        this.setState({
          artists,
          ...this.state
        })
      })
      .catch(ex => console.error('Error requesting artists: ' + ex.message))
  }

  componentWillUnmount () {
    this.shouldCancel = true
  }

  getArtists () {
    if (!this.state || !this.state.artists) {
      return []
    }
    return this.state.artists
  }

  setSelectedArtist (id) {
    this.props.artistsService.getArtistStats(id)
      .then(stats => {
        if (this.shouldCancel) {
          return
        }

        this.setState({
          ...this.state,
          selectedArtistDetails: stats
        })
      })
      .catch(ex => console.error('Error requesting artist details: ' + ex.message))
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button type="primary">Button</Button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ArtistsSelect artists={ this.getArtists() } onChange={ id => this.setSelectedArtist(id) }/>
        <DetailsPane artist={ this.state && this.state.selectedArtistDetails }/>
      </div>
    )
  }
}

export default App
