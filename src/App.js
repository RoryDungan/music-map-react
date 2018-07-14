import React, { Component } from 'react'
import logo from './logo.svg'
import ArtistsSelect from './ArtistsSelect'
import DetailsPane from './DetailsPane'
import MusicMap from './MusicMap'
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
        <MusicMap />
        <ArtistsSelect artists={ this.getArtists() } onChange={ id => this.setSelectedArtist(id) }/>
        <DetailsPane artist={ this.state && this.state.selectedArtistDetails }/>
      </div>
    )
  }
}

export default App
