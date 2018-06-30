import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createGetAllArtists } from './ArtistsService'

ReactDOM.render(
  <App getAllArtists={createGetAllArtists(fetch)}/>,
  document.getElementById('root')
)

registerServiceWorker()
