import React from 'react'

import { Avatar } from 'cozy-ui/transpiled/react/Avatar'
import { models } from 'cozy-client'

import { fullContactPropTypes } from '../../ContactPropTypes'
import ContactName from './ContactName'

const { getDisplayName, getInitials } = models.contact

const MyselfMarker = (props, { t }) => (
  <span className="contact-myself">({t('me')})</span>
)

const ContactIdentity = ({ contact }) => {
  const name = contact.name || {}
  const displayName = getDisplayName(contact) || undefined
  const isMyself = contact.metadata ? !!contact.metadata.me : false

  return (
    <div className="contact-identity">
      <Avatar text={getInitials(contact)} size="small" />
      <ContactName displayName={displayName} familyName={name.familyName} />
      {isMyself && <MyselfMarker />}
    </div>
  )
}
ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired
}

export default ContactIdentity
