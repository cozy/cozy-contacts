import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'cozy-ui/transpiled/react/Modal'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { fullContactPropTypes } from '../ContactPropTypes'
import { getConnectedAccounts } from '../../helpers/contacts'

const ConfirmDeleteModal = ({
  contact,
  toggleConfirmDeleteModal,
  deleteContact
}) => {
  const { t } = useI18n()
  return (
    <Modal
      into="body"
      title={t('delete-confirmation.title', {
        smart_count: 1
      })}
      description={t(
        getConnectedAccounts(contact).length > 0
          ? 'delete-confirmation.description-google'
          : 'delete-confirmation.description-simple',
        {
          smart_count: 1
        }
      )}
      primaryText={t('delete')}
      primaryType="danger"
      primaryAction={() => deleteContact(contact)}
      secondaryText={t('cancel')}
      secondaryAction={toggleConfirmDeleteModal}
      dismissAction={toggleConfirmDeleteModal}
    />
  )
}

ConfirmDeleteModal.propTypes = {
  contact: fullContactPropTypes.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
}

export default ConfirmDeleteModal
