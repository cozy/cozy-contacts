import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactsEmptyList from './ContactsEmptyList'
import CategorizedList from './CategorizedList'
import UncategorizedList from './UncategorizedList'
import withSelection from '../Selection/selectionContainer'
import SearchContext from '../Contexts/Search'

const ContactsList = ({ contacts, clearSelection, selection, selectAll }) => {
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const List = searchValue.length > 0 ? UncategorizedList : CategorizedList
  const areAllContactsSelected = contacts.length === selection.length

  const handleAllContactSelection = () => {
    areAllContactsSelected ? clearSelection() : selectAll(contacts)
  }

  return (
    <div className="list-wrapper">
      <List
        contacts={contacts}
        areAllContactsSelected={areAllContactsSelected}
        handleAllContactSelection={handleAllContactSelection}
      />
    </div>
  )
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withSelection(ContactsList)
