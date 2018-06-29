import React, { Component } from 'react'
import logo from './logo.svg'
import Button from 'antd/lib/button'
import ArtistsSelect from './ArtistsSelect.js'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.getAllArtists()
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
        <ArtistsSelect artists={ this.getArtists() }></ArtistsSelect>
      </div>
    )
  }
}

export default App
