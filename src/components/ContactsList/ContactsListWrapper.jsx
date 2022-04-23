import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'

import ContactsEmptyList from './ContactsEmptyList'
import ContactsList from './ContactsList.jsx'
import ContactsListSpeedDial from './ContactsListSpeedDial'
import withSelection from '../Selection/selectionContainer'
import SearchContext from '../Contexts/Search'

const ContactsListWrapper = ({ contacts }) => {
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  return (
    <div className="list-content-wrapper">
      <ContactsList contacts={contacts} />
      {flag('show-speed-dial') && !searchValue && (
        <ContactsListSpeedDial filteredContacts={contacts} />
      )}
    </div>
  )
}

ContactsListWrapper.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsListWrapper.defaultProps = {}

export default withSelection(ContactsListWrapper)
