import React from 'react'

import { Query } from 'cozy-client'

import SpinnerContact from './Common/Spinner'
import ContentResult from './ContentResult'
import {
  contactsByFamilyNameGivenNameEmailCozyUrl,
  contactsWithoutIndexes
} from '../helpers/queries'
import useService from './Hooks/useService'

const ContentWrapper = () => {
  const hasServiceBeenLaunched = useService(
    'keepIndexFullNameAndDisplayNameUpToDate'
  )

  if (hasServiceBeenLaunched === null) {
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
  }
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
                <ContentResult
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

export default ContentWrapper
