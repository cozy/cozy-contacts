import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  cancelTrashContactsByGroupId,
  trashedAllContactsByGroupId
} from '../../connections/allContacts'
import {
  cancelTrashGroupById,
  trashedGroupById
} from '../../connections/allGroups'
import cleanTrashedGroupsAndATrashedContacts from '../../thunks/cleanTrashedGroupsAndATrashedContacts'
import ConfirmDeleteActions from '../Common/ConfirmDeleteActions'

const GroupDeleteConfirmationModal = () => {
  const [deleteAssociatedContacts, setDeleteAssociatedContacts] =
    useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const navigate = useNavigate()
  const { groupId, groupName } = useParams()
  const client = useClient()
  const { t } = useI18n()

  const handleDeleteGroup = async () => {
    setIsBusy(true)
    const alertDuration = 3000
    const timeout = setTimeout(async () => {
      cleanTrashedGroupsAndATrashedContacts(client)
    }, alertDuration)

    let contactsTrashCount = 0
    if (deleteAssociatedContacts) {
      const contacts = await trashedAllContactsByGroupId(client, groupId)
      contactsTrashCount = contacts.length
    }
    await trashedGroupById(client, groupId)

    const translationKey = deleteAssociatedContacts
      ? contactsTrashCount > 0
        ? 'groups.removed_with_contacts'
        : 'groups.removed_without_contacts'
      : 'groups.removed'

    Alerter.info(translationKey, {
      name: groupName,
      smart_count: contactsTrashCount,
      buttonText: t('cancel'),
      buttonAction: () => {
        clearTimeout(timeout)

        cancelTrashGroupById(
          client,
          groupId,
          deleteAssociatedContacts,
          contactsTrashCount
        )
        if (deleteAssociatedContacts) {
          cancelTrashContactsByGroupId(client, groupId)
        }
      },
      duration: alertDuration
    })

    handleClose()
  }

  const handleClose = () => {
    navigate(`..`, { replace: true })
  }

  return (
    <ConfirmDialog
      open
      onClose={handleClose}
      title={t('delete_group_confirmation.title')}
      content={
        <Stack>
          <Typography
            dangerouslySetInnerHTML={{
              __html: t('delete_group_confirmation.content', {
                name: groupName
              })
            }}
          />
          <Checkbox
            checked={deleteAssociatedContacts}
            onChange={() => setDeleteAssociatedContacts(prev => !prev)}
            label={t('delete_group_confirmation.checkbox')}
          />
        </Stack>
      }
      actions={
        <ConfirmDeleteActions
          isBusy={isBusy}
          onCancel={handleClose}
          onDelete={handleDeleteGroup}
        />
      }
    />
  )
}

export default GroupDeleteConfirmationModal
