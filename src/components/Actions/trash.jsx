import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

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
export const trash = ({
  selection,
  clearSelection,
  showModal,
  hideModal,
  client,
  t
}) => {
  const label = t('SelectionBar.trash_action')

  return {
    name: 'trash',
    label,
    icon: 'trash',
    action: () => {
      const hasConnectedAccounts = contact =>
        getConnectedAccounts(contact).length > 0

      const allContactsConnected = selection.every(hasConnectedAccounts)
      const someContactsConnected = selection.some(hasConnectedAccounts)

      let description = 'delete-confirmation.description-simple'

      if (allContactsConnected)
        description = 'delete-confirmation.description-google'
      else if (someContactsConnected)
        description = 'delete-confirmation.description-mixed'

      const handleDelete = async () => {
        await Promise.all(selection.map(contact => client.destroy(contact)))
        clearSelection()
        hideModal()
      }

      showModal(
        <ConfirmDialog
          open
          onClose={hideModal}
          title={t('delete-confirmation.title', {
            smart_count: selection.length
          })}
          content={t(description, {
            smart_count: selection.length
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
