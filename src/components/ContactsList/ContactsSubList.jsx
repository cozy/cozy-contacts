import React from 'react'
import PropTypes from 'prop-types'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactRow from './ContactRow'

const ContactsSubList = ({ contacts }) => {
  return (
    <List>
      {contacts.map((contact, index) => (
        <ContactRow
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
