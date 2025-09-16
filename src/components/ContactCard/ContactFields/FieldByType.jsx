import PropTypes from 'prop-types'
import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  Birthday,
  Location,
  Email,
  Impp,
  Phone,
  Cozy,
  Default,
  Relationship
} from './FieldTypes'

const FieldByType = ({ value, type }) => {
  const { t, f } = useI18n()
  if (!value) return false

  switch (type) {
    case 'birthday':
      return <Birthday value={value} f={f} t={t} />
    case 'address':
      return <Location value={value} t={t} />
    case 'email':
      return <Email address={value.address} />
    case 'impp':
      return <Impp uri={value.uri} />
    case 'phone':
      return <Phone number={value.number} />
    case 'cozy':
      return <Cozy url={value.url} />
    case 'relationship':
      return <Relationship name={value.name} id={value.id} />
    default:
      return <Default value={value} />
  }
}

FieldByType.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}

export default FieldByType
