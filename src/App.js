import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { getAllArtists } from './ArtistsService'

class App extends Component {
  constructor () {
    super()

    getAllArtists()
      .then(artists => {
        this.setState({
          artists,
          ...this.state
        })
      })
      .catch(ex => console.error('Error requesting artists: ' + ex.message))
  }

  renderArtistsList () {
    if (!this.state || !this.state.artists) {
      return <p>Loading...</p>
    }
    return (
      <ul>
        {
          this.state.artists
            .map(a => <li key={a.id}>{a.name}</li>)
        }
      </ul>
    )
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderArtistsList()}
      </div>
    )
  }
}

export default App
