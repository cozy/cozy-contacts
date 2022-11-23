import React, { useState } from 'react'

import { useClient, useQuery } from 'cozy-client'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { buildContactsQueryById } from '../../queries/queries'

import { getConnectedAccounts } from '../../helpers/contacts'
import ConfirmDeleteActions from '../Common/ConfirmDeleteActions'
import { deleteContact } from '../../connections/allContacts'
import { useEffect } from 'react'

const ConfirmDeleteModal = () => {
  const navigate = useNavigate()
  const client = useClient()
  const { contactId } = useParams()
  const { t } = useI18n()

  const contactsQueryById = buildContactsQueryById(contactId)
  const resultContactsQueryById = useQuery(
    contactsQueryById.definition,
    contactsQueryById.options
  )

  const [contact, setContact] = useState()

  useEffect(() => {
    if (!contact && resultContactsQueryById.data) {
      setContact(resultContactsQueryById.data)
    }
  }, [contact, resultContactsQueryById])

  const onClose = () => navigate(`/${contactId}`)

  const onDeleteContact = async (contactParam = null) => {
    navigate('/')
    await deleteContact(client, contactParam ? contactParam : contact)
    onDeleteContact && onDeleteContact(contactParam ? contactParam : contact)
  }

  return (
    <ConfirmDialog
      open={true}
      onClose={onClose}
      title={t('delete-confirmation.title', {
        smart_count: 1
      })}
      content={t(
        contact && getConnectedAccounts(contact).length > 0
          ? 'delete-confirmation.description-google'
          : 'delete-confirmation.description-simple',
        {
          smart_count: 1
        }
      )}
      actions={
        <ConfirmDeleteActions
          onCancel={onClose}
          onDelete={() => onDeleteContact(contact)}
        />
      }
    />
  )
}

export default ConfirmDeleteModal
