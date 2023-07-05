import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import ContactInfoContent from './ContactInfoContent'
import ContactInfoTitle from './ContactInfoTitle'
import {
  buildContactsQueryById,
  buildContactGroupsQuery
} from '../../queries/queries'
import SpinnerContact from '../Common/Spinner'

const ContactInfoModal = () => {
  const navigate = useNavigate()
  const { contactId } = useParams()

  const onClose = () => navigate('/')

  const queryContactById = buildContactsQueryById(contactId)
  const resultContactById = useQuery(
    queryContactById.definition,
    queryContactById.options
  )

  const contactGroupsQuery = buildContactGroupsQuery()
  const resultAllGroups = useQuery(
    contactGroupsQuery.definition,
    contactGroupsQuery.options
  )

  const dataHaveBeenLoaded =
    (!isQueryLoading(resultContactById) ||
      hasQueryBeenLoaded(resultContactById)) &&
    (!isQueryLoading(resultAllGroups) || hasQueryBeenLoaded(resultAllGroups))

  return (
    <Dialog
      open={true}
      onClose={onClose}
      size="large"
      title={
        !dataHaveBeenLoaded ? (
          '...'
        ) : (
          <ContactInfoTitle
            contact={resultContactById.data}
            allGroups={resultAllGroups.data}
          />
        )
      }
      content={
        !dataHaveBeenLoaded ? (
          <SpinnerContact size="xxlarge" />
        ) : (
          <ContactInfoContent
            contact={resultContactById.data}
            allGroups={resultAllGroups.data}
          />
        )
      }
    />
  )
}

export default ContactInfoModal
