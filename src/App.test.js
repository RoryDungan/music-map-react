import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const mockArtistsService = {
    getAllArtists: jest.fn()
      .mockReturnValue(Promise.resolve([]))
  }

  ReactDOM.render(<App artistsService={mockArtistsService}/>, div)
  ReactDOM.unmountComponentAtNode(div)
})
