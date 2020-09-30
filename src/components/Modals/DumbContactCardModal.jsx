import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ConfirmDeleteModal from './ConfirmDeleteModal'
import ContactFormModal from './ContactFormModal'
import ContactInfo from './ContactInfo'

export const DumbContactCardModal = ({
  editMode,
  contact,
  allGroups,
  toggleConfirmDeleteModal,
  toggleEditMode,
  shouldDisplayConfirmDeleteModal,
  deleteContact
}) => {
  const { t } = useI18n()

  return (
    <>
      {!editMode && (
        <ContactInfo
          contact={contact}
          allGroups={allGroups}
          toggleEditMode={toggleEditMode}
          toggleConfirmDeleteModal={toggleConfirmDeleteModal}
        />
      )}
      {editMode && (
        <ContactFormModal
          contact={contact}
          onClose={toggleEditMode}
          title={t('edit-contact')}
          afterMutation={toggleEditMode}
        />
      )}

      {shouldDisplayConfirmDeleteModal && (
        <ConfirmDeleteModal
          contact={contact}
          toggleConfirmDeleteModal={toggleConfirmDeleteModal}
          deleteContact={deleteContact}
        />
      )}
    </>
  )
}

export default DumbContactCardModal
