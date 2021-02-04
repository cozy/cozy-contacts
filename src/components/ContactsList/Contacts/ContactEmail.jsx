import React from 'react'
import PropTypes from 'prop-types'

import { TableCell } from 'cozy-ui/transpiled/react/Table'

const ContactEmail = ({ email }) => (
  <TableCell className="contact-email u-ellipsis">{email}</TableCell>
)
ContactEmail.propTypes = {
  email: PropTypes.string
}
ContactEmail.defaultProps = {
  email: '—'
}

export default ContactEmail
