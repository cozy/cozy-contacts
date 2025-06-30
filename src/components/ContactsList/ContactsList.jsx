import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import flag from 'cozy-flags'

import CategorizedList from './CategorizedList'
import ContactsEmptyList from './ContactsEmptyList'
import UncategorizedList from './UncategorizedList'
import VirtualizedList from './VirtualizedList'
import SearchContext from '../Contexts/Search'

const ContactsList = ({ contacts }) => {
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const List = flag('contacts.virtualization.enabled')
    ? VirtualizedList
    : searchValue.length > 0
    ? UncategorizedList
    : CategorizedList

  return <List contacts={contacts} />
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default ContactsList
