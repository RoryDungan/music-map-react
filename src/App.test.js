import React from 'react'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const mockArtistsService = {
    getAllArtists: jest.fn()
      .mockReturnValue(Promise.resolve([]))
  }

  const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

  expect(app.find('div').hasClass('App')).toBe(true)
})
