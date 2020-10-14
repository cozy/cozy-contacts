import React, { useContext, useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'

import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'

import SelectedGroupContext from './Contexts/SelectedGroup'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import GroupsSelect from './GroupsSelect/GroupsSelect'
import Search from './Search/Search'
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup
} from '../helpers/groups'

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
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const { isMobile } = useBreakpoints()

  const groupsSelectCustomStyles = setGroupsSelectCustomStyles(isMobile)
  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

  useEffect(() => {
    const filteredContactsByGroup = filterContactsByGroup(
      contacts,
      selectedGroup
    )
    setFilteredContacts(filteredContactsByGroup)
  }, [contacts, selectedGroup, setFilteredContacts])

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <>
              <Search />
              <GroupsSelect
                className="u-w-100 u-maw-6"
                allGroups={groupsSelectOptions}
                value={selectedGroup}
                onChange={setSelectedGroup}
                noOptionsMessage={() => t('filter.no-group')}
                styles={groupsSelectCustomStyles}
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
