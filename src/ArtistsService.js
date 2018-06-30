const apiUrl = '/api/v1'

const getAllArtists = async function (fetch) {
  const url = apiUrl + '/artists'
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }
  const resJSON = await res.json()

  const artists = []
  for (const k of Object.keys(resJSON)) {
    artists.push({ id: k, name: resJSON[k] })
  }

  return artists.sort((a, b) => a.name.localeCompare(b.name))
}

const getArtistStats = async function (fetch, artistId) {
  const url = apiUrl + '/' + artistId
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }

  return res.json()
}

export const createGetAllArtists = function (fetch) {
  return () => getAllArtists(fetch)
}
