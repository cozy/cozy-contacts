import React, { memo } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { models } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ContactCozy from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactCozy'
import ContactEmail from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactEmail'
import ContactIdentity from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactIdentity'
import ContactPhone from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactPhone'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactWithSelection from './ContactSelection'

const { getPrimaryCozy, getPrimaryPhone, getPrimaryEmail } = models.contact

/**
 * Returns whether a document has been updated
 * @param {object} document - Initial document
 * @param {object} nextDocument - Potentially modified document
 * @returns {boolean}
 */
export const hasDocBeenUpdated = (document, nextDocument) =>
  document._rev !== nextDocument._rev ||
  get(document, 'cozyMetadata.updatedAt') !==
    get(nextDocument, 'cozyMetadata.updatedAt')

const areContactListItemEqual = (props, nextProps) => {
  const { contact, ...otherProps } = props

  const hasOtherPropsBeenChanged = Object.entries(otherProps).some(
    ([key, otherProp]) => {
      return key !== 'navigate' && otherProp !== nextProps[key]
    }
  )

  if (
    hasDocBeenUpdated(contact, nextProps.contact) ||
    hasOtherPropsBeenChanged
  ) {
    return false
  }
  return true
}

const ContactListItem = ({ contact, divider, navigate }) => {
  const email = getPrimaryEmail(contact) || undefined
  const phone = getPrimaryPhone(contact) || undefined
  const cozyUrl = getPrimaryCozy(contact) || undefined
  const { isMobile } = useBreakpoints()

  return (
    <ListItem
      className="u-c-pointer"
      data-testid="contact-listItem"
      divider={divider}
      onClick={() => navigate(`/${contact._id}`)}
    >
      <ContactWithSelection contact={contact} />
      <ContactIdentity contact={contact} />
      {!isMobile && <ContactEmail email={email} />}
      {!isMobile && <ContactPhone phone={phone} />}
      {!isMobile && <ContactCozy cozyUrl={cozyUrl} />}
    </ListItem>
  )
}

ContactListItem.propTypes = {
  contact: fullContactPropTypes.isRequired,
  divider: PropTypes.bool
}
ContactListItem.defaultProps = {
  selection: null
}

export default memo(ContactListItem, areContactListItemEqual)
