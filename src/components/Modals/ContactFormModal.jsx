import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient, useQuery } from 'cozy-client'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { buildContactsQueryById } from '../../queries/queries'
import SelectedGroupContext from '../../components/Contexts/SelectedGroup'
import ContactForm, {
  getSubmitContactForm
} from '../../components/ContactCard/ContactForm'
import { createOrUpdateContact } from '../../connections/allContacts'

const ContactFormModal = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const client = useClient()
  const { contactId } = useParams()

  const { selectedGroup } = useContext(SelectedGroupContext)
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)
  // Tip to avoid that, when submitting the form, the fields are filled with old information for a short time.
  const [contactWithNewData, setContactWithNewData] = useState(null)

  // Tip while waiting for `getById` to be fixed
  // There is this fix, but apparently doesn't work here https://github.com/cozy/cozy-client/commit/c5b602256f3e4cd747734fa213500191eeb2e3c9
  const contactsQueryById = buildContactsQueryById(contactId || 'undefined')
  const { data: contact } = useQuery(
    contactsQueryById.definition,
    contactsQueryById.options
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

  return (
    <FixedDialog
      open
      onClose={onClose}
      size="large"
      title={contact ? t('edit-contact') : t('create_contact')}
      content={
        <ContactForm
          contact={contactWithNewData || contact}
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
