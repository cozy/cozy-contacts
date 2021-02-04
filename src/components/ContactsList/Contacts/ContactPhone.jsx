import React from 'react'
import PropTypes from 'prop-types'

import { TableCell } from 'cozy-ui/transpiled/react/Table'

const ContactPhone = ({ phone }) => (
  <TableCell className="contact-phone u-ellipsis">{phone}</TableCell>
)
ContactPhone.propTypes = {
  phone: PropTypes.string
}
ContactPhone.defaultProps = {
  phone: '—'
}

export default ContactPhone
