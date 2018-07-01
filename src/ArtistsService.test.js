import createArtistsService from './ArtistsService'

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

describe('get all artists', async () => {
  it('fetches artists from correct url', async () => {
    expect.assertions(2)

    const mockFetch = setupMockFetch()

    const artistsService = createArtistsService(mockFetch)

    await artistsService.getAllArtists()

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/artists')
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

describe('get a specific artist stats', () => {
  it('fetches url for artist id', async () => {
    expect.assertions(2)

    const artistId = '12345'
    const expectedUrl = '/api/v1/artist/' + artistId

    const mockFetch = setupMockFetch()

    const artistsService = createArtistsService(mockFetch)

    await artistsService.getArtistStats(artistId)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl)
  })

  it('returns data about specified artist', async () => {
    expect.assertions(1)

    const artistId = '12345'
    const data = { 'AUS': 1, 'USA': 0.5 }

    const mockFetch = setupMockFetch(true, data)

    const artistsService = createArtistsService(mockFetch)

    await expect(artistsService.getArtistStats(artistId))
      .resolves.toEqual(data)
  })

  it('throws error if it could not get data from api', async () => {
    expect.assertions(1)

    const responseCode = 500
    const mockFetch = setupMockFetch(false, undefined, responseCode)

    const artistsService = createArtistsService(mockFetch)

    await expect(artistsService.getArtistStats('1234'))
      .rejects.toEqual(new Error(
        'Tried to GET /api/v1/artist/1234, returned status ' + responseCode + '.'
      ))
  })
})
