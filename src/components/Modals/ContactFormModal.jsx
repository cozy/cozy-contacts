import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient, useQuery } from 'cozy-client'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import {
  buildContactsQueryById,
  buildIdentitiesQueryByContact
} from '../../queries/queries'
import SelectedGroupContext from '../../components/Contexts/SelectedGroup'
import ContactForm, {
  getSubmitContactForm
} from '../../components/ContactCard/ContactForm'
import { createOrUpdateContact } from '../../connections/allContacts'
import { makeContactWithIdentitiesAddresses } from '../../helpers/contacts'

const ContactFormModal = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const client = useClient()
  const { contactId } = useParams()

  const { selectedGroup } = useContext(SelectedGroupContext)
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)
  // Tip to avoid that, when submitting the form, the fields are filled with old information for a short time.
  const [contactWithNewData, setContactWithNewData] = useState(null)

  const contactsQueryById = buildContactsQueryById(contactId)
  const { data: contact } = useQuery(
    contactsQueryById.definition,
    contactsQueryById.options
  )

  const isContactsQueryEnabled =
    contact && contact.me && contact.address?.length === 0
  const indentitiesContactsQueryById = buildIdentitiesQueryByContact(
    isContactsQueryEnabled
  )
  const { data: identities } = useQuery(
    indentitiesContactsQueryById.definition,
    indentitiesContactsQueryById.options
  )

  const triggerFormSubmit = event => {
    const submitContactForm = getSubmitContactForm()
    submitContactForm(event)
  }

  const onClose = () => (contactId ? navigate(`/${contactId}`) : navigate('/'))

  const handleFormSubmit = async formData => {
    setContactWithNewData({ ...contact, ...formData })
    setIsFormBeingSubmitted(true)
    try {
      await createOrUpdateContact({
        client,
        oldContact: contact,
        formData,
        selectedGroup
      })
      onClose()
    } catch (err) {
      setIsFormBeingSubmitted(false)
      console.warn(err) // eslint-disable-line no-console
      Alerter.error('error.save')
    }
  }

  const contactWithIdentitiesAddresses = makeContactWithIdentitiesAddresses(
    contact,
    identities
  )

  return (
    <FixedDialog
      open
      onClose={onClose}
      size="large"
      title={contact ? t('edit-contact') : t('create_contact')}
      content={
        <ContactForm
          contact={contactWithNewData || contactWithIdentitiesAddresses}
          onSubmit={handleFormSubmit}
        />
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
