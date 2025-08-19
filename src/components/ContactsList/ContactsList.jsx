import PropTypes from 'prop-types'
import React from 'react'

import flag from 'cozy-flags'

import CategorizedList from './CategorizedList'
import ContactsEmptyList from './ContactsEmptyList'
import UncategorizedList from './UncategorizedList'
import VirtualizedList from './Virtualized/VirtualizedList'
import { useSearch } from '../Contexts/Search'

const ContactsList = ({ contacts }) => {
  const { searchValue } = useSearch()

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
