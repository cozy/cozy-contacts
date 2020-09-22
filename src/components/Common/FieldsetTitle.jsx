import React from 'react'
import PropTypes from 'prop-types'

const FieldsetTitle = ({ title }) => (
  <h3 className="u-title-h2 u-mt-1-half u-mb-1">{title}</h3>
)

FieldsetTitle.propTypes = {
  title: PropTypes.string
}

export default FieldsetTitle
