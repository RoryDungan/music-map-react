const apiUrl = '/api/v1'

const getAllArtists = async function (fetch) {
  const url = apiUrl + '/artists'
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }
  const resJSON = await res.json()

  return Object.keys(resJSON)
    .map(k => ({ id: k, name: resJSON[k] }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

const getArtistStats = async function (fetch, artistId) {
  const url = apiUrl + '/artist/' + artistId
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }

  return res.json()
}

export default function (fetch) {
  return {
    getAllArtists: () => getAllArtists(fetch),
    getArtistStats: artistId => getArtistStats(fetch, artistId)
  }
}
