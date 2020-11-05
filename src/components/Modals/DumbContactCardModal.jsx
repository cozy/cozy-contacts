import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ConfirmDeleteModal from './ConfirmDeleteModal'
import ContactFormModal from './ContactFormModal'
import ContactInfoModal from './ContactInfoModal'
import { fullContactPropTypes } from '../ContactPropTypes'

export const DumbContactCardModal = ({
  editMode,
  contact,
  allGroups,
  toggleConfirmDeleteModal,
  toggleEditMode,
  shouldDisplayConfirmDeleteModal,
  deleteContact,
  dataHaveBeenLoaded,
  onClose
}) => {
  const { t } = useI18n()

  return (
    <>
      <ContactInfoModal
        contact={contact}
        allGroups={allGroups}
        toggleEditMode={toggleEditMode}
        toggleConfirmDeleteModal={toggleConfirmDeleteModal}
        dataHaveBeenLoaded={dataHaveBeenLoaded}
        onClose={onClose}
      />

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

DumbContactCardModal.propTypes = {
  editMode: PropTypes.bool.isRequired,
  contact: fullContactPropTypes,
  allGroups: PropTypes.array,
  toggleEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired,
  shouldDisplayConfirmDeleteModal: PropTypes.bool.isRequired,
  deleteContact: PropTypes.func.isRequired,
  dataHaveBeenLoaded: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

export default DumbContactCardModal
