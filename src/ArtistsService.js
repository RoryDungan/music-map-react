const apiUrl = '/api/v1'

export const getAllArtists = async function (fetch) {
  if (!fetch) {
    fetch = window.fetch
  }

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

export const getArtistStats = async function (artistId) {
  const url = apiUrl + '/' + artistId
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }

  return res.json()
}
