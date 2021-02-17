import React from 'react'
import PropTypes from 'prop-types'

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

  const refs = contacts.reduce((acc, value) => {
    acc[value._id] = React.createRef();
    return acc;
  }, {});

  return <ContentResult contacts={contacts} refs={refs} allGroups={allGroupsResult.data} />
}

ContentRework.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool.isRequired,
  contactsWithIndexesResult: PropTypes.object.isRequired,
  contactsWithNoIndexesResult: PropTypes.object.isRequired,
  allGroupsResult: PropTypes.object.isRequired
}

export default ContentRework
