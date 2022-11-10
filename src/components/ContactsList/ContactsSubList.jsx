import React from 'react'
import PropTypes from 'prop-types'

import ContactListItem from './ContactListItem'

const ContactsSubList = ({ contacts }) => {
  return (
    <>
      {contacts.map((contact, index) => (
        <ContactListItem
          id={contact._id}
          key={contact._id}
          contact={contact}
          divider={index !== contacts.length - 1}
        />
      ))}
    </>
  )
}

ContactsSubList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ContactsSubList
