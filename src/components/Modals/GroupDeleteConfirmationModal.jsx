import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

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

    if (deleteAssociatedContacts) {
      await trashedAllContactsByGroupId(client, groupId)
    }
    await trashedGroupById(client, groupId)

    Alerter.info('groups.removed', {
      name: groupName,
      buttonText: t('cancel'),
      buttonAction: () => {
        clearTimeout(timeout)
        cancelTrashGroupById(client, groupId)
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
