import React from 'react'

import { generateWebLink, useClient } from 'cozy-client'
import { getFormattedAddress } from 'cozy-client/dist/models/contact'

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

export const Impp = ({ uri }) => {
  return <>{uri}</>
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

export const Relationship = ({ name, id }) => {
  const client = useClient()
  const link = generateWebLink({
    slug: 'contacts',
    cozyUrl: client.getStackClient().uri,
    subDomainType: client.getInstanceOptions().subdomain,
    pathname: '/',
    hash: id
  })

  return (
    <a href={link} className="u-link" target="_blank" rel="noreferrer">
      {name}
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
