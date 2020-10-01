import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import filter from 'lodash/filter'

import { isQueryLoading, useQuery, hasQueryBeenLoaded } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ContactsContext from './Context'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import { reworkContacts } from '../helpers/contacts'

import ContactGroups from './ContactCard/ContactGroups'
import { queryAllGroups } from '../helpers/queries'

export const ContentResult = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult
}) => {
  const { t } = useI18n()
  const { selectedGroup, setSelectedGroup, defaultGroup } = useContext(
    ContactsContext
  )

  const resultAllGroups = useQuery(
    queryAllGroups.definition,
    queryAllGroups.options
  )

  const dataHaveBeenLoaded =
    !isQueryLoading(contactsWithIndexesResult) &&
    !isQueryLoading(contactsWithNoIndexesResult) &&
    !contactsWithIndexesResult.hasMore &&
    !contactsWithNoIndexesResult.hasMore &&
    (!isQueryLoading(resultAllGroups) || hasQueryBeenLoaded(resultAllGroups))

  if (!dataHaveBeenLoaded)
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  let filteredContacts = contacts

  if (selectedGroup._id) {
    const filters = ['groups', { data: [selectedGroup] }]
    filteredContacts = filter(contacts, filters)
  }

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <ContactGroups
              allGroups={resultAllGroups.data}
              value={selectedGroup}
              onChange={setSelectedGroup}
              noOptionsMessage={() => t('filter.none')}
              preliminaryOptions={[defaultGroup]}
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
  contactsWithNoIndexesResult: PropTypes.object.isRequired
}

export default ContentResult
