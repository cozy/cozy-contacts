import React from 'react'
import PropTypes from 'prop-types'

import ContactListItem from './ContactListItem'
import { useNavigate } from 'react-router-dom'

const ContactsSubList = ({ contacts }) => {
  const navigate = useNavigate()
  return (
    <>
      {contacts.map((contact, index) => (
        <ContactListItem
          id={contact._id}
          key={contact._id}
          contact={contact}
          divider={index !== contacts.length - 1}
          navigate={navigate}
        />
      ))}
    </>
  )
}

ContactsSubList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ContactsSubList
