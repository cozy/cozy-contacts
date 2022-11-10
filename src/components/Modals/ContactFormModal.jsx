import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'

import { withClient } from 'cozy-client'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import SelectedGroupContext from '../Contexts/SelectedGroup'
import ContactForm, { getSubmitContactForm } from '../ContactCard/ContactForm'
import { fullContactPropTypes } from '../ContactPropTypes'
import { createContact, updateContact } from '../../connections/allContacts'
import { addGroupToContact } from '../../helpers/contacts'
import { hasSelectedGroup } from '../../helpers/groups'

const ContactFormModal = ({
  contact,
  onClose,
  title,
  afterMutation,
  t,
  client
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

    if (hasSelectedGroup(selectedGroup)) {
      updatedContact = addGroupToContact(updatedContact, selectedGroup)
    }

    setIsFormBeingSubmitted(true)
    setContactInForm(updatedContact)
    try {
      const resp = await createOrUpdate(client, updatedContact)
      afterMutation(resp.data)
    } catch (err) {
      setIsFormBeingSubmitted(false)
      console.warn(err) // eslint-disable-line no-console
      Alerter.error('error.save')
    }
  }

  return (
    <FixedDialog
      open={true}
      onClose={onClose}
      size="large"
      title={title}
      content={
        <ContactForm contact={contactInForm} onSubmit={handleFormSubmit} />
      }
      actions={
        <>
          <Button variant="secondary" label={t('cancel')} onClick={onClose} />
          <Button
            className="u-ml-half"
            type="submit"
            label={t('save')}
            busy={isFormBeingSubmitted}
            onClick={triggerFormSubmit}
          />
        </>
      }
    />
  )
}

ContactFormModal.propTypes = {
  afterMutation: PropTypes.func.isRequired,
  contact: fullContactPropTypes,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
}

ContactFormModal.defaultProps = {
  contact: null
}

export { ContactFormModal as DumbContactFormModal }

export default flow(
  withClient,
  translate()
)(ContactFormModal)
