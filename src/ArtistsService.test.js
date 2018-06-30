import { createGetAllArtists } from './ArtistsService'

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

    const getAllArtists = createGetAllArtists(mockFetch)

    await getAllArtists()

    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0][0]).toBe('/api/v1/artists')
  })

  it('handles invalid response', async () => {
    expect.assertions(1)

    const status = 404
    const mockFetch = setupMockFetch(false, {}, status)

    const getAllArtists = createGetAllArtists(mockFetch)

    await expect(getAllArtists()).rejects.toEqual(new Error(
      'Tried to GET /api/v1/artists, returned status ' + status + '.'
    ))
  })
})
