import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const mockGetArtists = jest.fn()
    .mockReturnValue(Promise.resolve([]))
  ReactDOM.render(<App getAllArtists={mockGetArtists}/>, div)
  ReactDOM.unmountComponentAtNode(div)
})
