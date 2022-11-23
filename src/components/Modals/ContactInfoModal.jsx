import React from 'react'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { useNavigate, useParams } from 'react-router-dom'
import { buildContactQuery, queryAllGroups } from '../../queries/queries'

import ContactInfoTitle from './ContactInfoTitle'
import ContactInfoContent from './ContactInfoContent'
import SpinnerContact from '../Common/Spinner'

const ContactInfoModal = () => {
  const navigate = useNavigate()
  const { contactId } = useParams()

  const onClose = () => navigate('/')

  const queryContactById = buildContactQuery(contactId)
  const resultContactById = useQuery(
    queryContactById.definition,
    queryContactById.options
  )
  const resultAllGroups = useQuery(
    queryAllGroups.definition,
    queryAllGroups.options
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
