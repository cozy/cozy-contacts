import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import { Content } from 'cozy-ui/transpiled/react/Layout'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
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
import { filterContactsBySearch } from '../helpers/search'

const useGroupsSelectCustomStyles = () => {
  const { isMobile } = useBreakpoints()

  return {
    container: base => ({
      ...base,
      width: isMobile ? '100%' : '50%'
    }),
    noOptionsMessage: base => ({ ...base, textAlign: 'left' })
  }
}

const setGroupsSelectOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups

const ControlDefaultWithTestId = ({ ...props }) => {
  return (
    <ControlDefault
      {...props}
      innerProps={{
        ...props.innerProps,
        'data-testid': 'selectBox-controlDefault',
        className: 'u-bdrs-4'
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
  const groupsSelectCustomStyles = useGroupsSelectCustomStyles()

  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

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
          left={<Toolbar />}
          right={
            <>
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
              <SearchInput />
            </>
          }
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
