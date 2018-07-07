import React from 'react'
import enzyme from 'enzyme'
import DetailsPane from './DetailsPane'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe('DetailsPane', () => {
  it('shows message when no artist selected', () => {
    const testObject = enzyme.shallow(<DetailsPane />)

    expect(testObject.find('i').text()).toEqual('No artist selected.')
  })

  it('renders supplied artist details', () => {
    const testArtist = {
      name: 'Violent Soho',
      description: 'Brisbane based rock band',
      imageUrl: 'https://last.fm/photo.jpg'
    }

    const testObject = enzyme.shallow(<DetailsPane artist={testArtist}/>)

    expect(testObject.find('h1').text()).toEqual(testArtist.name)
    expect(testObject.find('img').prop('src')).toBe(testArtist.imageUrl)
    expect(testObject.findWhere(c => c.text() === testArtist.description).length).toBe(1)
  })
})
