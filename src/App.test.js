import React from 'react'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import ArtistsSelect from './ArtistsSelect'

enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  it('renders without crashing', () => {
    const mockArtistsService = {
      getAllArtists: jest.fn()
        .mockReturnValue(Promise.resolve([]))
    }

    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    expect(app.find('div').hasClass('App')).toBe(true)
  })

  it('sends artists to select component', async () => {
    expect.assertions(1)

    const testArtists = [
      { id: '1', name: 'Rich Brian' },
      { id: '2', name: 'Oneohtrix Point Never' }
    ]
    const mockArtistsService = {
      getAllArtists: jest.fn()
        .mockReturnValue(Promise.resolve(testArtists))
    }

    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    // Force us to wait for the getAllArtists promise to resolve
    await Promise.resolve()

    app.update()

    expect(app.find(ArtistsSelect).props().artists).toBe(testArtists)
  })
})