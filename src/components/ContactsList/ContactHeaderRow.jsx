import React from 'react'
import PropTypes from 'prop-types'

const ContactHeaderRow = props => <div className="divider">{props.header}</div>

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
}
export default ContactHeaderRow
