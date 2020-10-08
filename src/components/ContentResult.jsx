import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'

import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import SelectedGroupContext from './Contexts/SelectedGroup'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import { reworkContacts } from '../helpers/contacts'
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup
} from '../helpers/groups'
import GroupsSelect from './GroupsSelect/GroupsSelect'

export const ContentResult = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult,
  allGroupsResult
}) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext)

  const dataHaveBeenLoaded =
    !isQueryLoading(contactsWithIndexesResult) &&
    !isQueryLoading(contactsWithNoIndexesResult) &&
    !contactsWithIndexesResult.hasMore &&
    !contactsWithNoIndexesResult.hasMore &&
    (!isQueryLoading(allGroupsResult) || hasQueryBeenLoaded(allGroupsResult))

  if (!dataHaveBeenLoaded)
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  const filteredContactsByGroup = filterContactsByGroup(contacts, selectedGroup)

  const customStyles = {
    container: base => ({
      ...base,
      ...(!isMobile && { width: '24rem' })
    }),
    noOptionsMessage: base => ({ ...base, textAlign: 'left' })
  }

  const options =
    allGroupsResult.data.length > 0
      ? [translatedDefaultSelectedGroup(t)].concat(allGroupsResult.data)
      : allGroupsResult.data

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <GroupsSelect
              allGroups={options}
              value={selectedGroup}
              onChange={setSelectedGroup}
              noOptionsMessage={() => t('filter.no-group')}
              styles={customStyles}
            />
          }
          right={<Toolbar />}
        />
      )}
      <Content>
        <ContactsList contacts={filteredContactsByGroup} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool.isRequired,
  contactsWithIndexesResult: PropTypes.object.isRequired,
  contactsWithNoIndexesResult: PropTypes.object.isRequired,
  allGroupsResult: PropTypes.object.isRequired
}

export default ContentResult
