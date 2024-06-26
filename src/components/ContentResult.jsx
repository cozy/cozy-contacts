import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import flag from 'cozy-flags'
import Input from 'cozy-ui/transpiled/react/Input'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactsList from './ContactsList/ContactsList.jsx'
import ContactsDiplayedContext from './Contexts/ContactsDiplayed'
import SearchContext from './Contexts/Search'
import SelectedGroupContext from './Contexts/SelectedGroup'
import GroupsSelect from './GroupsSelect/GroupsSelect'
import Header from './Header'
import SearchInput from './Search/SearchInput'
import Toolbar from './Toolbar'
import {
  filterContactsByGroup,
  hasSelectedGroup,
  translatedDefaultSelectedGroup
} from '../helpers/groups'
import { filterContactsBySearch, delayedSetThreshold } from '../helpers/search'

const groupsSelectCustomStyles = {
  container: base => ({
    ...base,
    width: '100%'
  }),
  noOptionsMessage: base => ({ ...base, textAlign: 'left' })
}

const setGroupsSelectOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups

const ControlDefaultWithTestId = ({ ...props }) => {
  return (
    <ControlDefault
      {...props}
      innerProps={{
        ...props.innerProps,
        'data-testid': 'selectBox-controlDefault'
      }}
    />
  )
}

export const ContentResult = ({ contacts, allGroups }) => {
  const { t } = useI18n()
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext)
  const { searchValue } = useContext(SearchContext)
  const { setContactsDisplayed } = useContext(ContactsDiplayedContext)
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

  const handleSearchThreshold = ev => {
    const thresholdValue = parseFloat(ev.target.value)
    delayedSetThreshold(thresholdValue)
  }

  // If the currently selected group is deleted, the default filter is set.
  useEffect(() => {
    if (hasSelectedGroup(selectedGroup) && !allGroups.includes(selectedGroup)) {
      setSelectedGroup(translatedDefaultSelectedGroup(t))
    }
  }, [allGroups, selectedGroup, setSelectedGroup, t])

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
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <>
              {flag('search-threshold') && (
                <div>
                  <Input onChange={handleSearchThreshold} defaultValue="0.3" />
                </div>
              )}
              <SearchInput />
              <GroupsSelect
                allGroups={groupsSelectOptions}
                value={selectedGroup}
                onChange={setSelectedGroup}
                noOptionsMessage={() => t('filter.no-group')}
                styles={groupsSelectCustomStyles}
                closeMenuOnSelect={true}
                components={{
                  Control: ControlDefaultWithTestId
                }}
              />
            </>
          }
          right={<Toolbar />}
        />
      )}
      <Content>
        <ContactsList contacts={filteredContacts} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContentResult
