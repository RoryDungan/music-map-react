import React from 'react'
import Select, { Option } from 'antd/lib/select'
import ArtistsSelect from './ArtistsSelect'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe('ArtistsSelect', () => {
  let props
  let mountedArtistsSelect

  const artistsSelect = () => {
    if (!mountedArtistsSelect) {
      mountedArtistsSelect = shallow(
        <ArtistsSelect {...props} />
      )
    }

    return mountedArtistsSelect
  }

  beforeEach(() => {
    props = {
      artists: []
    }
    mountedArtistsSelect = undefined
  })

  it('renders select element', () => {
    expect(artistsSelect().find(Select).length).toBe(1)
  })

  it('creates options for supplied artists', () => {
    props = {
      artists: [
        { id: '1', name: 'Aphex Twin' },
        { id: '2', name: 'Death From Above 1979' }
      ]
    }

    const testObject = artistsSelect()

    expect(testObject.find(Option).length).toBe(2)
  })

  it('shows artist name', () => {
    const testArtist = 'FKA Twigs'

    props = {
      artists: [
        { id: '0', name: testArtist }
      ]
    }

    const testObject = artistsSelect()

    expect(testObject.find(Option).first().childAt(0).text())
      .toEqual(testArtist)
  })

  it('uses artist id to identify options', () => {
    const testId = '512'

    props = {
      artists: [
        { id: testId, name: 'Queens of the Stone Age' }
      ]
    }

    const testObject = artistsSelect()

    expect(testObject.find(Option).first().key()).toBe(testId)
  })

  it('passes onChange event through to Select', () => {

    props = {
      artists: [
        { id: 'asdf', name: 'Sza' }
      ],
      onChange: id => id
    }

    const testObject = artistsSelect()

    const selectProps = testObject.find(Select).first().props()

    expect(selectProps.onChange).toEqual(props.onChange)
  })
})
