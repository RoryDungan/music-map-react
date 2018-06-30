import { getAllArtists, getArtistStats } from './ArtistsService'

describe('get all artists', async () => {

  const setupMockFetch = function (ok, jsonRes) {
    const mockRes = {
      ok: ok === undefined ? true : ok,
      json: jest.fn()
        .mockReturnValue(Promise.resolve(jsonRes || {}))
    }
    return jest.fn()
      .mockReturnValueOnce(Promise.resolve(mockRes))
  }

  it('fetches artists from correct url', () => {
    const mockFetch = setupMockFetch()

    const oldFetch = global.fetch
    global.fetch = mockFetch

    try {
      getAllArtists()

      expect(mockFetch.mock.calls.length).toBe(1)
      expect(mockFetch.mock.calls[0][0]).toBe('/api/v1/artists')
    } finally {
      global.fetch = oldFetch
    }
  })
})
