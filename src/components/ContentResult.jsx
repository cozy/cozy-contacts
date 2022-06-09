import React, { useContext, useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'

import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import Chip from 'cozy-ui/transpiled/react/Chips'
import Input from 'cozy-ui/transpiled/react/Input'
import flag from 'cozy-flags'

import SelectedGroupContext from './Contexts/SelectedGroup'
import SearchContext from './Contexts/Search'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import GroupsSelect from './GroupsSelect/GroupsSelect'
import SearchInput from './Search/SearchInput'
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup
} from '../helpers/groups'
import { filterContactsBySearch, delayedSetThreshold } from '../helpers/search'
import { categorizeContacts } from '../helpers/contactList'

const setGroupsSelectCustomStyles = isMobile => ({
  container: base => ({
    ...base,
    ...(!isMobile && { maxWidth: '24rem' })
  }),
  noOptionsMessage: base => ({ ...base, textAlign: 'left' })
})

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
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const { isMobile } = useBreakpoints()

  const groupsSelectCustomStyles = setGroupsSelectCustomStyles(isMobile)
  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

  const handleSearchThreshold = ev => {
    const thresholdValue = parseFloat(ev.target.value)
    delayedSetThreshold(thresholdValue)
  }

  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const alphabetListRefs = Object.fromEntries(
    Object.keys(categorizedContacts).map(header => [header, createRef()])
  );

  const scrollToSelectedItem = ref => { 
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

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
  }, [contacts, searchValue, selectedGroup, setFilteredContacts])

  return (
    <>
      {contacts.length >= 1 && (
        <div>
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
                  className="u-w-100 u-maw-6"
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

          <div className="alphabet-list">
            {Object.entries(alphabetListRefs).map(([header, ref]) => (
                <Chip 
                  className="chip-list"
                  key={`alphabet-${header}`}
                  label={header.toUpperCase()}
                  clickable
                  onClick={() => scrollToSelectedItem(ref)}
                />
              ))}
          </div> 
        </div>
      )}
      <Content>
        <ContactsList contacts={filteredContacts} alphabetListRefs={alphabetListRefs} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContentResult
