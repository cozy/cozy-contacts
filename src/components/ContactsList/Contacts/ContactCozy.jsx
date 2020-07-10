import React from 'react'
import PropTypes from 'prop-types'
const ContactCozy = ({ cozyUrl }) => (
  <div className="contact-cozyurl u-ellipsis">{cozyUrl}</div>
)
ContactCozy.propTypes = {
  cozyUrl: PropTypes.string
}
ContactCozy.defaultProps = {
  cozyUrl: '—'
}

export default ContactCozy
