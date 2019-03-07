import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import createArtistsService from './ArtistsService'

ReactDOM.render(
  <App artistsService={createArtistsService(fetch)}/>,
  document.getElementById('root')
)
