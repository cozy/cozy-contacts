import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-final-form'

import ContactsListModal from 'cozy-ui/transpiled/react/ContactsListModal'

export const RelatedContactList = ({ name, onClose, contacts }) => {
  const { change } = useForm()

  /**
   * @param {import('cozy-client/types/types').IOCozyContact} contact
   */
  const onClickContactsListModal = contact => {
    change(name, contact.displayName)
    change(`${name}Id`, contact._id)
    onClose()
  }

  return (
    <ContactsListModal
      dismissAction={onClose}
      onItemClick={contact => onClickContactsListModal(contact)}
      contacts={contacts}
    />
  )
}

RelatedContactList.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  contacts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
}
