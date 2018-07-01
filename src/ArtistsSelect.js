import React from 'react'
import Select, { Option } from 'antd/lib/select'

export default function ArtistsSelect (props) {
  const artists = props.artists || []

  return (
    <Select>
      {
        artists.map(a =>
          <Option key={ a.id }>{ a.name }</Option>
        )
      }
    </Select>
  )
}
