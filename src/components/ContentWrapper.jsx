import React from 'react'
import { PropTypes } from 'prop-types'

import { Query, isQueryLoading } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'

import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import {
  contactsByFamilyNameGivenNameEmailCozyUrl,
  contactsWithoutIndexes
} from '../helpers/queries'
import { reworkContacts } from '../helpers/contacts'

export const ContentWrapperResult = ({
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

const ContentWrapper = ({ hasServiceBeenLaunched }) => {
  return (
    <Query
      query={contactsByFamilyNameGivenNameEmailCozyUrl.definition}
      as={contactsByFamilyNameGivenNameEmailCozyUrl.options.as}
    >
      {contactsWithIndexesResult => {
        if (contactsWithIndexesResult.hasMore) {
          contactsWithIndexesResult.fetchMore()
        }

        return (
          <Query
            query={contactsWithoutIndexes.definition}
            as={contactsWithoutIndexes.options.as}
          >
            {contactsWithNoIndexesResult => {
              if (contactsWithNoIndexesResult.hasMore) {
                contactsWithNoIndexesResult.fetchMore()
              }

              return (
                <ContentWrapperResult
                  hasServiceBeenLaunched={hasServiceBeenLaunched}
                  contactsWithIndexesResult={contactsWithIndexesResult}
                  contactsWithNoIndexesResult={contactsWithNoIndexesResult}
                />
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

ContentWrapper.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool
}

export default ContentWrapper
