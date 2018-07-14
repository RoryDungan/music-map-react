import React, { Component } from 'react'
import logo from './logo.svg'
import ArtistsSelect from './ArtistsSelect'
import DetailsPane from './DetailsPane'
import MusicMap from './MusicMap'
import './App.css'

class App extends Component {
  constructor () {
    super()

    // Set initial state
    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    this.props.artistsService.getAllArtists()
      .then(artists => {
        if (this.shouldCancel) {
          return
        }

        this.setState({
          ...this.state,
          artists
        })
      })
      .catch(ex => console.error('Error requesting artists: ' + ex.message))
  }

  componentWillUnmount () {
    this.shouldCancel = true
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
        <MusicMap artist={ this.state.selectedArtistDetails }/>
        <ArtistsSelect artists={ this.state.artists } onChange={ id => this.setSelectedArtist(id) }/>
        <DetailsPane artist={ this.state.selectedArtistDetails }/>
      </div>
    )
  }
}

export default App
