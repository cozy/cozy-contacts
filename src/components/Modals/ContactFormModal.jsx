import React, { useState, useContext } from 'react'
import { PropTypes } from 'prop-types'

import Modal, {
  ModalHeader,
  ModalDescription,
  ModalFooter
} from 'cozy-ui/transpiled/react/Modal'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import SelectedGroupContext from '../Context'
import ContactForm, { getSubmitContactForm } from '../ContactCard/ContactForm'
import { fullContactPropTypes } from '../ContactPropTypes'
import withContactsMutations from '../../connections/allContacts'
import { addGroupToContact } from '../../helpers/contacts'
import { hasSelectedGroup } from '../../helpers/groups'

const ContactFormModal = ({
  contact,
  onClose,
  title,
  createContact,
  afterMutation,
  updateContact,
  t
}) => {
  const { selectedGroup } = useContext(SelectedGroupContext)
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)
  const [contactInForm, setContactInForm] = useState(contact)

  const triggerFormSubmit = event => {
    const submitContactForm = getSubmitContactForm()
    submitContactForm(event)
  }

  const handleFormSubmit = async formData => {
    const createOrUpdate = contactInForm ? updateContact : createContact
    let updatedContact = {
      ...contactInForm,
      ...formData
    }

    if (hasSelectedGroup(selectedGroup, t)) {
      updatedContact = addGroupToContact(updatedContact, selectedGroup)
    }

    setIsFormBeingSubmitted(true)
    setContactInForm(updatedContact)
    try {
      const resp = await createOrUpdate(updatedContact)
      afterMutation(resp.data)
    } catch (err) {
      setIsFormBeingSubmitted(false)
      console.warn(err) // eslint-disable-line no-console
      Alerter.error('error.save')
    }
  }

  return (
    <Modal
      overflowHidden={true}
      dismissAction={onClose}
      mobileFullscreen={true}
      into="body"
      size="xlarge"
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalDescription>
        <ContactForm contact={contactInForm} onSubmit={handleFormSubmit} />
      </ModalDescription>
      <ModalFooter className="u-ta-right">
        <Button
          type="button"
          theme="secondary"
          label={t('cancel')}
          onClick={onClose}
        />
        <Button
          type="submit"
          label={t('save')}
          busy={isFormBeingSubmitted}
          onClick={triggerFormSubmit}
        />
      </ModalFooter>
    </Modal>
  )
}

ContactFormModal.propTypes = {
  afterMutation: PropTypes.func.isRequired,
  contact: fullContactPropTypes,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

ContactFormModal.defaultProps = {
  contact: null
}

export { ContactFormModal as DumbContactFormModal }

export default withContactsMutations(translate()(ContactFormModal))
