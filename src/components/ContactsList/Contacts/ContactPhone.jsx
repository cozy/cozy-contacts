import React from 'react'
import PropTypes from 'prop-types'

const ContactPhone = ({ phone }) => <div className="contact-phone">{phone}</div>
ContactPhone.propTypes = {
  phone: PropTypes.string
}
ContactPhone.defaultProps = {
  phone: '—'
}

export default ContactPhone
