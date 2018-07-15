import React from 'react'
import Select, { Option } from 'antd/lib/select'

export default function ArtistsSelect (props) {
  return (
    <Select style={{ width: '100%' }} onChange={ props.onChange }>
      {
        props.artists.map(a =>
          <Option key={ a.id }>{ a.name }</Option>
        )
      }
    </Select>
  )
}
