import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
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

import { useSelectedGroup } from '@/components/GroupsSelect/GroupsSelectProvider'
import { translatedDefaultSelectedGroup } from '@/components/GroupsSelect/helpers'

const GroupDeleteConfirmationModal = () => {
  const { selectedGroup, setSelectedGroup } = useSelectedGroup()
  const [deleteAssociatedContacts, setDeleteAssociatedContacts] =
    useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const navigate = useNavigate()
  const { groupId, groupName } = useParams()
  const client = useClient()
  const { t } = useI18n()
  const { showAlert } = useAlert()

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

    // If the currently selected group is deleted, the default filter is set.
    if (groupId === selectedGroup._id) {
      setSelectedGroup(translatedDefaultSelectedGroup(t))
    }

    const translationKey = deleteAssociatedContacts
      ? contactsTrashCount > 0
        ? 'groups.removed_with_contacts'
        : 'groups.removed_without_contacts'
      : 'groups.removed'

    showAlert({
      severity: 'secondary',
      duration: alertDuration,
      message: t(translationKey, {
        name: groupName,
        smart_count: contactsTrashCount
      }),
      action: (
        <Button
          variant="text"
          size="small"
          label={t('cancel')}
          style={{ color: 'var(--secondaryContrastTextColor)' }}
          onClick={() => {
            clearTimeout(timeout)

            cancelTrashGroupById({
              client,
              groupId,
              deleteAssociatedContacts,
              showAlert,
              t,
              contactsTrashCount
            })
            if (deleteAssociatedContacts) {
              cancelTrashContactsByGroupId(client, groupId)
            }
          }}
        />
      )
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
