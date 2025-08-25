import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelectedGroup } from 'cozy-ui/transpiled/react/Contacts/GroupsSelect/GroupsSelectProvider'
import Header from 'cozy-ui/transpiled/react/Contacts/Header'
import { Content } from 'cozy-ui/transpiled/react/Layout'

import ContactsList from './ContactsList/ContactsList.jsx'
import ContactsDiplayedContext from './Contexts/ContactsDiplayed'
import { useSearch } from './Contexts/Search'
import { filterContactsByGroup } from '../helpers/groups'
import { filterContactsBySearch } from '../helpers/search'

import { createGroup, updateGroup } from '@/connections/allGroups'
import styles from '@/styles/contacts.styl'

export const ContentResult = ({ contacts, allGroups }) => {
  const { selectedGroup } = useSelectedGroup()
  const { searchValue, setSearchValue } = useSearch()
  const navigate = useNavigate()
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
          <Header
            allGroups={allGroups}
            onContactCreate={() => navigate('/new')}
            onContactImport={() => navigate('/import')}
            onGroupCreate={createGroup}
            onGroupUpdate={updateGroup}
            onGroupDelete={group =>
              navigate(`/group/${group._id}/delete/${group.name}`)
            }
            onSearch={setSearchValue}
          />
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
