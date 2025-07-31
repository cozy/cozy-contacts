import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'

import { getConnectedAccounts } from '../../helpers/contacts'
import ConfirmDeleteActions from '../Common/ConfirmDeleteActions'

/**
 * Displays a confirmation dialog before deleting contacts
 *
 * @param  {object} options
 * @param  {array} options.selection - Array of contacts to delete
 * @param  {function} options.clearSelection - Function to clear the selection
 * @param  {function} options.showModal - Function to show the confirmation modal
 * @param  {function} options.hideModal - Function to hide the confirmation modal
 * @param  {object} options.client - CozyClient instance
 * @param  {object} options.t - Translation function
 * @returns {object} Object with action
 */
export const trash = ({ clearSelection, showModal, hideModal, client, t }) => {
  const label = t('SelectionBar.trash_action')
  const icon = TrashIcon

  return {
    name: 'trash',
    label,
    icon,
    action: docs => {
      const hasConnectedAccounts = doc => {
        return getConnectedAccounts(doc).length > 0
      }

      const allContactsConnected = docs.every(hasConnectedAccounts)
      const someContactsConnected = docs.some(hasConnectedAccounts)

      let description = 'delete-confirmation.description-simple'

      if (allContactsConnected)
        description = 'delete-confirmation.description-google'
      else if (someContactsConnected)
        description = 'delete-confirmation.description-mixed'

      const handleDelete = async () => {
        await Promise.all(docs.map(contact => client.destroy(contact)))
        clearSelection()
        hideModal()
      }

      showModal(
        <ConfirmDialog
          open
          onClose={hideModal}
          title={t('delete-confirmation.title', {
            smart_count: docs.length
          })}
          content={t(description, {
            smart_count: docs.length
          })}
          actions={
            <ConfirmDeleteActions
              onCancel={hideModal}
              onDelete={handleDelete}
            />
          }
        />
      )
    }
  }
}
