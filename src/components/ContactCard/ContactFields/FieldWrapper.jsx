import React from 'react'
import PropTypes from 'prop-types'

import FieldByType from './FieldByType'

const FieldWrapper = ({ type, value }) => {
  const label = value.type || value.label || null

  return (
    <div className="u-mb-half u-breakword u-fz-medium">
      <FieldByType value={value} type={type} />
      {label && <span className="u-ph-half u-dn-s">·</span>}
      {label && <span className="u-fz-small u-coolgrey u-db-s">{label}</span>}
    </div>
  )
}

FieldWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}

export default FieldWrapper
