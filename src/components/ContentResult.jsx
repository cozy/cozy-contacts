import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import { Content } from 'cozy-ui/transpiled/react/Layout'

import ContactsList from './ContactsList/ContactsList.jsx'
import ContactsDiplayedContext from './Contexts/ContactsDiplayed'
import { useSearch } from './Contexts/Search'
import SelectedGroupContext from './Contexts/SelectedGroup'
import Header from './Header'
import { filterContactsByGroup } from '../helpers/groups'
import { filterContactsBySearch } from '../helpers/search'

import styles from '@/styles/contacts.styl'

export const ContentResult = ({ contacts, allGroups }) => {
  const { selectedGroup } = useContext(SelectedGroupContext)
  const { searchValue } = useSearch()
  const { setContactsDisplayed } = useContext(ContactsDiplayedContext)
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  useEffect(() => {
    const filteredContactsByGroup = filterContactsByGroup(
      contacts,
      selectedGroup
    )
    const filteredContactsBySearch = filterContactsBySearch(
      filteredContactsByGroup,
      searchValue
    )
    setFilteredContacts(filteredContactsBySearch)
    setContactsDisplayed(filteredContactsBySearch)
  }, [contacts, searchValue, selectedGroup, setContactsDisplayed])

  return (
    <Content>
      {contacts.length >= 1 && (
        <div className={styles['topbar']}>
          <Header allGroups={allGroups} />
        </div>
      )}
      <ContactsList contacts={filteredContacts} />
    </Content>
  )
}

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContentResult
