import React from 'react'
import PropTypes from 'prop-types'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactListItem from './ContactListItem'

const ContactsSubList = ({ contacts, refs }) => {

  return (
    <List>
      {contacts.map((contact, index) => (
        <ContactListItem
          ref={refs[contact._id]}
          id={contact._id}
          key={contact._id}
          contact={contact}
          divider={index !== contacts.length - 1}
        />
      ))}
    </List>
  )
}

ContactsSubList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ContactsSubList
