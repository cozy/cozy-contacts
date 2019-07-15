import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'cozy-ui/transpiled/react/Avatar'
import ContactName from './ContactName'
import contactPropTypes from '../../ContactPropTypes'
import { getInitials } from '../../../helpers/contacts'

const MyselfMarker = (props, { t }) => (
  <span className="contact-myself">({t('me')})</span>
)
const ContactIdentity = ({ name, myself }) => (
  <div className="contact-identity">
    <Avatar text={getInitials(name).toUpperCase()} size="small" />
    <ContactName firstname={name.givenName} lastname={name.familyName} />
    {myself && <MyselfMarker />}
  </div>
)
ContactIdentity.propTypes = {
  name: contactPropTypes.name.isRequired,
  myself: PropTypes.bool
}
ContactIdentity.defaultProps = {
  myself: false
}

export default ContactIdentity
