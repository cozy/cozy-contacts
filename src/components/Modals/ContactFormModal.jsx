import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient } from 'cozy-client'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { buildContactQuery } from '../../helpers/queries'

import SelectedGroupContext from '../Contexts/SelectedGroup'
import ContactForm, { getSubmitContactForm } from '../ContactCard/ContactForm'
import { createContact, updateContact } from '../../connections/allContacts'
import { addGroupToContact } from '../../helpers/contacts'
import { hasSelectedGroup } from '../../helpers/groups'

const ContactFormModal = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const client = useClient()
  const { contactId } = useParams()

  useEffect(() => {
    const fetchContactById = async () => {
      if (contactId && !contactInForm) {
        const queryContactById = buildContactQuery(contactId)
        const resultContactById = await client.fetchQueryAndGetFromState({
          definition: queryContactById.definition,
          options: queryContactById.options
        })
        setContactInForm(resultContactById.data)
      }
    }
    fetchContactById()
  }, [client, contactId, contactInForm])

  const { selectedGroup } = useContext(SelectedGroupContext)
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)
  const [contactInForm, setContactInForm] = useState()

  const triggerFormSubmit = event => {
    const submitContactForm = getSubmitContactForm()
    submitContactForm(event)
  }

  const onClose = () => (contactId ? navigate(`/${contactId}`) : navigate('/'))

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
      await createOrUpdate(client, updatedContact)
      onClose()
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
      title={contactInForm ? t('edit-contact') : t('create_contact')}
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

export { ContactFormModal as DumbContactFormModal }

export default ContactFormModal
