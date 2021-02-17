import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import Input from 'cozy-ui/transpiled/react/Input'
import flag from 'cozy-flags'
import { categorizeContacts } from '../helpers/contactList'
import SelectedGroupContext from './Contexts/SelectedGroup'
import SelectedLetterContext from './Contexts/SelectedLetter'
import SearchContext from './Contexts/Search'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import GroupsSelect from './GroupsSelect/GroupsSelect'
import LetterSelect from './LetterSelect/LetterSelect'
import SearchInput from './Search/SearchInput'
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup,
  translatedDefaultSelectedLetter
} from '../helpers/groups'
import { filterContactsBySearch, delayedSetThreshold } from '../helpers/search'

const setGroupsSelectCustomStyles = isMobile => ({
  container: base => ({
    ...base,
    ...(!isMobile && { maxWidth: '24rem' })
  }),
  noOptionsMessage: base => ({ ...base, textAlign: 'left' })
})

const setGroupsSelectOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups

const setLettersSelectOptions = (allLetters, defaultSelectedLetter) =>
  allLetters.length > 0 ? [defaultSelectedLetter].concat(allLetters) : allLetters

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

const ControlDefaultWithTestId2 = ({ ...props }) => {
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

export const ContentResult = ({ contacts, refs, allGroups }) => {
  const { t } = useI18n()
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext)
  const { selectedLetter, setSelectedLetter } = useContext(SelectedLetterContext)
  const { searchValue } = useContext(SearchContext)
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const { isMobile } = useBreakpoints()

  const groupsSelectCustomStyles = setGroupsSelectCustomStyles(isMobile)
  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const allLetters = Object.keys(categorizedContacts).map(key => ({name:key}))
  const lettersSelectOptions = setLettersSelectOptions(
    allLetters,
    translatedDefaultSelectedLetter(t)
  )

  const handleSearchThreshold = ev => {
    const thresholdValue = parseFloat(ev.target.value)
    delayedSetThreshold(thresholdValue)
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

              <LetterSelect
                className="u-w-100 u-maw-6"
                refs={refs}
                allLetters={lettersSelectOptions}
                value={selectedLetter}
                onChange={setSelectedLetter}
                noOptionsMessage={() => t('filter.no-letter')}
                closeMenuOnSelect={true}
                components={{
                  Control: ControlDefaultWithTestId2
                }}
              />
            </>
          }
          right={<Toolbar />}
        />
      )}
      <Content>
        <ContactsList refs={refs} contacts={filteredContacts} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  refs: PropTypes.object.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContentResult
