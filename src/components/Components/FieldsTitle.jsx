import React from 'react'
import PropTypes from 'prop-types'

const FieldsTitle = ({ title }) => (
  <h3 className="u-title-h2 u-mt-1-half u-mb-1">{title}</h3>
)

FieldsTitle.propTypes = {
  title: PropTypes.string
}

export default FieldsTitle
