import React from 'react'
import { PropTypes } from 'prop-types'
import Modal, {
  ModalHeader,
  ModalDescription
} from 'cozy-ui/transpiled/react/Modal'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import ContactForm from '../ContactCard/ContactForm'
import { fullContactPropTypes } from '../ContactPropTypes'
import withContactsMutations from '../../connections/allContacts'

const ContactFormModal = ({
  contact,
  onClose,
  title,
  createContact,
  afterMutation,
  updateContact
}) => (
  <Modal
    overflowHidden={true}
    dismissAction={onClose}
    into="body"
    size="xlarge"
  >
    <ModalHeader>{title}</ModalHeader>
    <ModalDescription className="u-mt-half">
      <ContactForm
        contact={contact}
        onSubmit={async formData => {
          const createOrUpdate = contact ? updateContact : createContact
          const updatedContact = {
            ...contact,
            ...formData
          }
          try {
            const resp = await createOrUpdate(updatedContact)
            afterMutation(resp.data)
          } catch (err) {
            console.warn(err)
            Alerter.error('error.save')
          }
        }}
        onCancel={onClose}
      />
    </ModalDescription>
  </Modal>
)

ContactFormModal.propTypes = {
  afterMutation: PropTypes.func.isRequired,
  contact: fullContactPropTypes,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
}

ContactFormModal.defaultProps = {
  contact: null
}

export { ContactFormModal as DumbContactFormModal }

export default withContactsMutations(ContactFormModal)
