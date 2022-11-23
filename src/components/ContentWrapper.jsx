import React from 'react'

import { useQueryAll } from 'cozy-client'

import ContentRework from './ContentRework'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildContactsQueryWithoutIndexes,
  buildContactGroupsQuery
} from '../queries/queries'

const ContentWrapper = ({ hasServiceBeenLaunched }) => {
  const contactsQueryByFamilyNameGivenNameEmailCozyUrl = buildContactsQueryByFamilyNameGivenNameEmailCozyUrl()

  const contactsWithIndexesResult = useQueryAll(
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.definition,
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.options
  )

  const contactsQueryWithoutIndexes = buildContactsQueryWithoutIndexes()

  const contactsWithNoIndexesResult = useQueryAll(
    contactsQueryWithoutIndexes.definition,
    contactsQueryWithoutIndexes.options
  )

  const contactGroupsQuery = buildContactGroupsQuery()

  const contactGroupsResult = useQueryAll(
    contactGroupsQuery.definition,
    contactGroupsQuery.options
  )

  return (
    <ContentRework
      hasServiceBeenLaunched={hasServiceBeenLaunched}
      contactsWithIndexesResult={contactsWithIndexesResult}
      contactsWithNoIndexesResult={contactsWithNoIndexesResult}
      allGroupsResult={contactGroupsResult}
    />
  )
}

export default ContentWrapper
