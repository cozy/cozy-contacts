import React from 'react'

import { useQueryAll } from 'cozy-client'

import ContentResult from './ContentResult'
import ContentRework from './ContentRework'
import { reworkContacts } from '../helpers/contacts'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildContactsQueryWithoutIndexes,
  buildContactGroupsQuery
} from '../queries/queries'

export const loader =
  ({ client }) =>
  async () => {
    const contactsQueryByFamilyNameGivenNameEmailCozyUrl =
      buildContactsQueryByFamilyNameGivenNameEmailCozyUrl()
    const contactsQueryWithoutIndexes = buildContactsQueryWithoutIndexes()
    const contactGroupsQuery = buildContactGroupsQuery()

    const contactGroupsResult = client.queryAll(
      contactGroupsQuery.definition,
      contactGroupsQuery.options
    )
    const contactsWithNoIndexesResult = client.queryAll(
      contactsQueryWithoutIndexes.definition,
      contactsQueryWithoutIndexes.options
    )
    const contactsWithIndexesResult = client.queryAll(
      contactsQueryByFamilyNameGivenNameEmailCozyUrl.definition,
      contactsQueryByFamilyNameGivenNameEmailCozyUrl.options
    )
    return Promise.all([
      contactsWithIndexesResult,
      contactsWithNoIndexesResult,
      contactGroupsResult
    ])
  }

let countContentWrapper = 0
const ContentWrapper = ({ hasServiceBeenLaunched }) => {
  const contactsQueryByFamilyNameGivenNameEmailCozyUrl =
    buildContactsQueryByFamilyNameGivenNameEmailCozyUrl()

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

  console.log('==========')
  console.log('contactsWithIndexesResult : ', contactsWithIndexesResult)
  console.log('contactsWithNoIndexesResult : ', contactsWithNoIndexesResult)
  console.log('contactGroupsResult : ', contactGroupsResult)
  console.log('==========')

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  countContentWrapper++
  console.log('ContentWrapper render', countContentWrapper)
  return (
    <ContentResult contacts={contacts} allGroups={contactGroupsResult.data} />
  )

  // return (
  //   <ContentRework
  //     hasServiceBeenLaunched={hasServiceBeenLaunched}
  //     contactsWithIndexesResult={contactsWithIndexesResult}
  //     contactsWithNoIndexesResult={contactsWithNoIndexesResult}
  //     allGroupsResult={contactGroupsResult}
  //   />
  // )
}

export default ContentWrapper
