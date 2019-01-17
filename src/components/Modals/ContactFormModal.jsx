import React from 'react'
import { PropTypes } from 'prop-types'
import withContactsMutations from '../../connections/allContacts'
import Modal, {
  ModalHeader,
  ModalDescription
} from 'cozy-ui/transpiled/react/Modal'
import ContactForm from '../ContactCard/ContactForm'
import { fullContactPropTypes } from '../ContactPropTypes'

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
        onSubmit={async newContact => {
          let resp
          if (contact) {
            const payload = {
              _type: contact._type,
              _id: contact._id,
              _rev: contact._rev,
              ...newContact
            }
            resp = await updateContact(payload)
          } else {
            resp = await createContact(newContact)
          }
          afterMutation(resp.data)
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

export default withContactsMutations(ContactFormModal)
