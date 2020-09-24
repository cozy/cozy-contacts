import React from 'react'

import { getFormattedAddress } from '../../../../helpers/contacts'

export const Location = ({ value, t }) => {
  let location = getFormattedAddress(value, t)
  const osmUrl = 'https://nominatim.openstreetmap.org/search?format=html&q='
  let url = `${osmUrl}${encodeURI(location)}`
  return (
    <a href={url} className="u-link" target="_blank" rel="noopener noreferrer">
      {location}
    </a>
  )
}

export const Email = ({ address }) => {
  return (
    <a href={`mailto:${address}`} className="u-link">
      {address}
    </a>
  )
}

export const Phone = ({ number }) => {
  return (
    <a href={`tel:${number}`} className="u-link">
      {number}
    </a>
  )
}

export const Cozy = ({ url }) => {
  return (
    <a href={url} className="u-link">
      {url}
    </a>
  )
}

export const Birthday = ({ value, t, f }) => {
  return f(new Date(value), t('formatted.date'))
}

export const Default = ({ value }) => {
  if (typeof value !== 'object') return value.toString()
  return Object.keys(value)
    .map(label => `${label}: ${value[label]}`)
    .join(', ')
}
