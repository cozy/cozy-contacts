import React from 'react'
import PropTypes from 'prop-types'

import { TableCell } from 'cozy-ui/transpiled/react/Table'

const ContactCozy = ({ cozyUrl }) => (
  <TableCell className="contact-cozyurl u-ellipsis">{cozyUrl}</TableCell>
)
ContactCozy.propTypes = {
  cozyUrl: PropTypes.string
}
ContactCozy.defaultProps = {
  cozyUrl: '—'
}

export default ContactCozy
