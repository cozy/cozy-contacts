import React from 'react'

import { models } from 'cozy-client'
import { Avatar } from 'cozy-ui/transpiled/react/Avatar'
import { TableCell } from 'cozy-ui/transpiled/react/Table'

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
    <TableCell className="contact-identity u-ellipsis">
      <Avatar text={getInitials(contact)} size="small" />
      <ContactName displayName={displayName} familyName={name.familyName} />
      {isMyself && <MyselfMarker />}
    </TableCell>
  )
}
ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired
}

export default ContactIdentity
