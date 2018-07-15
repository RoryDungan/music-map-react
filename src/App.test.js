import React from 'react'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import ArtistsSelect from './ArtistsSelect'
import DetailsPane from './DetailsPane'

enzyme.configure({ adapter: new Adapter() })

const createMockArtistsService = (artists = [], artistStatsFn) => ({
  getAllArtists: jest.fn()
    .mockReturnValue(Promise.resolve(artists)),
  getArtistStats: jest.fn()
    .mockImplementation(id => Promise.resolve(artistStatsFn(id)))
})

describe('App', () => {
  it('renders without crashing', () => {
    const mockArtistsService = createMockArtistsService()
    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    expect(app.find('div').hasClass('App')).toBe(true)
  })

  it('sends artists to select component', async () => {
    expect.assertions(1)

    const testArtists = [
      { id: '1', name: 'Rich Brian' },
      { id: '2', name: 'Oneohtrix Point Never' }
    ]
    const mockArtistsService = createMockArtistsService(testArtists)

    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    // Force us to wait for the getAllArtists promise to resolve
    await Promise.resolve()
    app.update()

    expect(app.find(ArtistsSelect).props().artists).toBe(testArtists)
  })

  it('defaults to displaying no artist details', () => {
    const mockArtistsService = createMockArtistsService()

    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    expect(app.find(DetailsPane).props().artist).toBe(undefined)
  })

  it('shows details for selected artist', async () => {
    expect.assertions(1)

    const testArtists = [{ id: '23', name: 'Grimes' }]
    const testArtistDetails = {
      imageUrl: 'https://last.fm/image.jpg',
      name: 'Grimes',
      streams: {
        'AUS': 1,
        'GBR': 2
      },
      description: 'cool tunes'
    }

    const mockArtistsService = createMockArtistsService(testArtists, () => testArtistDetails)

    const app = enzyme.shallow(<App artistsService={mockArtistsService}/>)

    await Promise.resolve()

    const onArtistChange = app.find(ArtistsSelect).props().onChange
    onArtistChange(testArtists[0].id)

    await Promise.resolve()
    app.update()

    expect(app.find(DetailsPane).props().artist).toBe(testArtistDetails)
  })
})
