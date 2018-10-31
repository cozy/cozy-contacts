import React from 'react'
import { Avatar } from 'cozy-ui/transpiled/react'
import { fullContactPropTypes } from '../ContactPropTypes'
import { PropTypes } from 'prop-types'
import { ContactGroups } from './ContactGroups'
import { getFullContactName, getInitials } from '../../helpers/contacts'

const ContactIdentity = ({ contact, groups }) => (
  <div className="contact-card-identity">
    <Avatar text={getInitials(contact.name).toUpperCase()} size="medium" />
    <div className="contact-card-identity__infos">
      <h1 className="contact-card-identity__title">
        {getFullContactName(contact.name)}
      </h1>
      <ContactGroups contact={contact} allGroups={groups} />
    </div>
  </div>
)

ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired,
  groups: PropTypes.array.isRequired
}

export default ContactIdentity
