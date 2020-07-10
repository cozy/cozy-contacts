import React from 'react'
import PropTypes from 'prop-types'

const ContactName = ({ firstname, lastname }) => (
  <div className="u-ellipsis">
    <span className="contact-firstname">{firstname}</span>
    &nbsp;
    <span className="contact-lastname">{lastname}</span>
  </div>
)
ContactName.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  me: PropTypes.bool
}
ContactName.defaultProps = {
  firstname: '',
  lastname: '',
  me: false
}
export default ContactName
