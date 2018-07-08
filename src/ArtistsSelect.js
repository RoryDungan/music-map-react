import React from 'react'
import Select, { Option } from 'antd/lib/select'

export default function ArtistsSelect (props) {
  const artists = props.artists || []

  return (
    <Select style={{ width: '100%' }} onChange={ props.onChange }>
      {
        artists.map(a =>
          <Option key={ a.id }>{ a.name }</Option>
        )
      }
    </Select>
  )
}
