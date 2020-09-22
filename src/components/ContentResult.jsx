import React from 'react'
import { PropTypes } from 'prop-types'

import { isQueryLoading } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'

import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import { reworkContacts } from '../helpers/contacts'

export const ContentResult = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult
}) => {
  const dataHaveBeenLoaded =
    !isQueryLoading(contactsWithIndexesResult) &&
    !isQueryLoading(contactsWithNoIndexesResult) &&
    !contactsWithIndexesResult.hasMore &&
    !contactsWithNoIndexesResult.hasMore

  if (!dataHaveBeenLoaded)
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  return (
    <>
      {contacts.length >= 1 && <Header right={<Toolbar />} />}
      <Content>
        <ContactsList contacts={contacts} />
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
