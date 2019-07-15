import React from 'react'
import PropTypes from 'prop-types'
const ContactEmail = ({ email }) => <div className="contact-email">{email}</div>
ContactEmail.propTypes = {
  email: PropTypes.string
}
ContactEmail.defaultProps = {
  email: '—'
}

export default ContactEmail
