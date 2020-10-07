import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'

import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import ContactsContext from './Context'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import { reworkContacts } from '../helpers/contacts'
import { filterContactsByGroup } from '../helpers/groups'
import GroupsSelect from './GroupsSelect/GroupsSelect'

export const ContentResult = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult,
  allGroupsResult
}) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { selectedGroup, setSelectedGroup, defaultGroup } = useContext(
    ContactsContext
  )

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

  const filteredContacts = selectedGroup._id
    ? filterContactsByGroup(contacts, selectedGroup)
    : contacts

  const customStyles = {
    container: base => ({
      ...base,
      ...(!isMobile && { width: '24rem' })
    })
  }

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <GroupsSelect
              allGroups={allGroupsResult.data}
              value={selectedGroup}
              onChange={setSelectedGroup}
              noOptionsMessage={() => t('filter.none')}
              preliminaryOptions={[defaultGroup]}
              styles={customStyles}
            />
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
  hasServiceBeenLaunched: PropTypes.bool.isRequired,
  contactsWithIndexesResult: PropTypes.object.isRequired,
  contactsWithNoIndexesResult: PropTypes.object.isRequired,
  allGroupsResult: PropTypes.object.isRequired
}

export default ContentResult
