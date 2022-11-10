import React from 'react'
import PropTypes from 'prop-types'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { fullContactPropTypes } from '../ContactPropTypes'
import { getConnectedAccounts } from '../../helpers/contacts'
import ConfirmDeleteActions from '../Common/ConfirmDeleteActions'

const ConfirmDeleteModal = ({
  contact,
  toggleConfirmDeleteModal,
  onDeleteContact
}) => {
  const { t } = useI18n()
  return (
    <ConfirmDialog
      open={true}
      onClose={toggleConfirmDeleteModal}
      title={t('delete-confirmation.title', {
        smart_count: 1
      })}
      content={t(
        getConnectedAccounts(contact).length > 0
          ? 'delete-confirmation.description-google'
          : 'delete-confirmation.description-simple',
        {
          smart_count: 1
        }
      )}
      actions={
        <ConfirmDeleteActions
          onCancel={toggleConfirmDeleteModal}
          onDelete={() => onDeleteContact(contact)}
        />
      }
    />
  )
}

ConfirmDeleteModal.propTypes = {
  contact: fullContactPropTypes.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ConfirmDeleteModal
