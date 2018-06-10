import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { getAllArtists } from './ArtistsService'

ReactDOM.render(
  <App getAllArtists={getAllArtists}/>,
  document.getElementById('root')
)

registerServiceWorker()
