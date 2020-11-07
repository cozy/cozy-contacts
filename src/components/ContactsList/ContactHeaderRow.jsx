import React from 'react'
import PropTypes from 'prop-types'

const ContactHeaderRow = ({ header }) => <div className="divider">{header}</div>

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
}
export default ContactHeaderRow
