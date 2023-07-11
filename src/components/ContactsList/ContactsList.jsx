import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import CategorizedList from './CategorizedList'
import ContactsEmptyList from './ContactsEmptyList'
import UncategorizedList from './UncategorizedList'
import SearchContext from '../Contexts/Search'

const ContactsList = ({ contacts }) => {
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const List = searchValue.length > 0 ? UncategorizedList : CategorizedList

  return (
    <div className="list-wrapper">
      <List contacts={contacts} />
    </div>
  )
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default ContactsList
