const apiUrl = 'http://localhost:3000/api/v1'

export const getAllArtists = async function () {
  const url = apiUrl + '/artists'
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }
  const resJSON = res.json()

  const artists = []
  for (const k of Object.keys(resJSON)) {
    artists.push({ id: k, name: resJSON[k] })
  }

  return artists.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    }
    return 0
  })
}

export const getArtistStats = async function (artistId) {
  const url = apiUrl + '/' + artistId
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Tried to GET ${url}, returned status ${res.status}.`)
  }

  return res.json()
}
