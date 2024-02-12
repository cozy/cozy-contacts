import PropTypes from 'prop-types'
import React from 'react'

import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

import SpinnerContact from './Common/Spinner'
import ContentResult from './ContentResult'
import { reworkContacts } from '../helpers/contacts'

const ContentRework = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult,
  allGroupsResult
}) => {
  const dataHaveBeenLoaded =
    !isQueryLoading(contactsWithIndexesResult) &&
    !isQueryLoading(contactsWithNoIndexesResult) &&
    !contactsWithIndexesResult.hasMore &&
    !contactsWithNoIndexesResult.hasMore &&
    (!isQueryLoading(allGroupsResult) || hasQueryBeenLoaded(allGroupsResult))

  if (!dataHaveBeenLoaded) {
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
  }

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  console.info(' ')
  console.info('WithIndexes ', contactsWithIndexesResult.data)
  console.info('WithNoIndexes ', contactsWithNoIndexesResult.data)
  console.info(' ')

  return <ContentResult contacts={contacts} allGroups={allGroupsResult.data} />
}

ContentRework.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool.isRequired,
  contactsWithIndexesResult: PropTypes.object.isRequired,
  contactsWithNoIndexesResult: PropTypes.object.isRequired,
  allGroupsResult: PropTypes.object.isRequired
}

export default ContentRework
