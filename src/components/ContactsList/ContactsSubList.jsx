import React from 'react'
import PropTypes from 'prop-types'

import ContactRow from './ContactRow'

const ContactsSubList = ({ contacts }) => {
  return (
    <ol className="sublist-contact">
      {contacts.map(contact => (
        <li key={`contact-${contact._id}`}>
          <ContactRow id={contact._id} key={contact._id} contact={contact} />
        </li>
      ))}
    </ol>
  )
}

ContactsSubList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ContactsSubList
