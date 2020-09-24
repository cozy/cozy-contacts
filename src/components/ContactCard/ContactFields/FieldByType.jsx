import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { Birthday, Location, Email, Phone, Cozy, Default } from './FieldTypes'

const FieldByType = ({ value, type }) => {
  const { t, f } = useI18n()
  if (!value) return false

  switch (type) {
    case 'birthday':
      return <Birthday value={value} f={f} />
    case 'address':
      return <Location value={value} t={t} />
    case 'email':
      return <Email address={value.address} />
    case 'phone':
      return <Phone number={value.number} />
    case 'cozy':
      return <Cozy url={value.url} />
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
