import React from 'react'
import PropTypes from 'prop-types'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactInfoTitle from './ContactInfoTitle'
import ContactInfoContent from './ContactInfoContent'
import SpinnerContact from '../Common/Spinner'

const ContactInfoModal = ({
  contact,
  allGroups,
  toggleEditMode,
  toggleConfirmDeleteModal,
  onClose,
  dataHaveBeenLoaded
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      size="large"
      title={
        !dataHaveBeenLoaded ? (
          '...'
        ) : (
          <ContactInfoTitle
            contact={contact}
            allGroups={allGroups}
            toggleEditMode={toggleEditMode}
            toggleConfirmDeleteModal={toggleConfirmDeleteModal}
          />
        )
      }
      content={
        !dataHaveBeenLoaded ? (
          <SpinnerContact size="xxlarge" />
        ) : (
          <ContactInfoContent contact={contact} allGroups={allGroups} />
        )
      }
    />
  )
}

ContactInfoModal.propTypes = {
  contact: fullContactPropTypes,
  allGroups: PropTypes.array,
  toggleEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  dataHaveBeenLoaded: PropTypes.bool
}

export default ContactInfoModal
