import createArtistsService from './ArtistsService'

describe('get all artists', async () => {
  const setupMockFetch = function (ok, jsonRes, status) {
    const mockRes = {
      ok: ok === undefined ? true : ok,
      status: status === undefined ? 200 : status,
      json: jest.fn()
        .mockReturnValue(Promise.resolve(jsonRes || {}))
    }
    return jest.fn()
      .mockReturnValueOnce(Promise.resolve(mockRes))
  }

  it('fetches artists from correct url', async () => {
    expect.assertions(2)

    const mockFetch = setupMockFetch()

    const artistsService = createArtistsService(mockFetch)

    await artistsService.getAllArtists()

    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0][0]).toBe('/api/v1/artists')
  })

  it('handles invalid response', async () => {
    expect.assertions(1)

    const status = 404
    const mockFetch = setupMockFetch(false, {}, status)

    const artistsService = createArtistsService(mockFetch)

    await expect(artistsService.getAllArtists()).rejects.toEqual(
      new Error(
        'Tried to GET /api/v1/artists, returned status ' + status + '.'
      )
    )
  })

  it('transforms returned data correctly', async () => {
    expect.assertions(1)

    const dataFromAPI = {
      'abc1234': 'Kero Kero Bonito'
    }
    const expectedResponse = [
      { id: 'abc1234', name: 'Kero Kero Bonito' }
    ]

    const mockFetch = setupMockFetch(true, dataFromAPI)

    const artistsService = createArtistsService(mockFetch)

    await expect(artistsService.getAllArtists())
      .resolves.toEqual(expectedResponse)
  })

  it('sorts by artist name', async () => {
    expect.assertions(1)

    const dataFromAPI = {
      'abc1234': 'Kero Kero Bonito',
      'testId2': 'Brockhampton',
      '1234abc': 'death grips'
    }
    const expectedResponse = [
      { id: 'testId2', name: 'Brockhampton' },
      { id: '1234abc', name: 'death grips' },
      { id: 'abc1234', name: 'Kero Kero Bonito' }
    ]

    const mockFetch = setupMockFetch(true, dataFromAPI)

    const artistsService = createArtistsService(mockFetch)

    await expect(artistsService.getAllArtists())
      .resolves.toEqual(expectedResponse)
  })
})
