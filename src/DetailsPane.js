import React from 'react'
import './DetailsPane.css'

export default function DetailsPane (props) {
  if (!props.artist) {
    return (
      <div className='no-selection'>
        <i>No artist selected.</i>
      </div>
    )
  }

  const name = props.artist.name
  const image = props.artist.imageUrl
  const description = props.artist.description

  return (
    <div>
      <div className='artist-title'>
        <h1>{ name }</h1>
      </div>
      <div className='artist-details'>
        <div className='artist-description'>{ description }</div>
        <div className='artist-image'><img src={ image } alt='' /></div>
      </div>
    </div>
  )
}
