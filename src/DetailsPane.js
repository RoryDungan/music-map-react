import React from 'react'
import { Row, Col } from 'antd'

export default function DetailsPane (props) {
  if (!props.artist) {
    return (
      <div style={{ textAlign: 'center' }}>
        <i>No artist selected.</i>
      </div>
    )
  }

  const name = props.artist.name
  const image = props.artist.imageUrl
  const description = props.artist.description

  return (
    <div>
      <Row>
        <h1>{ name }</h1>
      </Row>
      <Row>
        <Col>{ description }</Col>
        <Col><img src={ image } alt='' /></Col>
      </Row>
    </div>
  )
}
