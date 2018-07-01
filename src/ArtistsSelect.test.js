import React from 'react'
import Select from 'antd/lib/select'
import ArtistsSelect from './ArtistsSelect'
import enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

describe('ArtistsSelect', () => {
  let props
  let mountedArtistsSelect

  const artistsSelect = () => {
    if (!mountedArtistsSelect) {
      mountedArtistsSelect = mount(
        <ArtistsSelect {...props} />
      )
    }

    return mountedArtistsSelect
  }

  beforeEach(() => {
    props = {
      artists: undefined
    }
    mountedArtistsSelect = undefined
  })

  it('renders select element', () => {
    expect(artistsSelect().find(Select).length).toBe(1)
  })
})
