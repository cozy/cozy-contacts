import React from 'react'
import PropTypes from 'prop-types'

import ContactsSubList from './ContactsSubList'

const UncategorizedList = ({ contacts }) => {
  return (
    <ol className="list-contact">
      <li key="no-category">
        <ContactsSubList contacts={contacts} />
      </li>
    </ol>
  )
}

UncategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default UncategorizedList
