import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient, useQuery, useQueryAll } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactForm, {
  getSubmitContactForm
} from '../../components/ContactCard/ContactForm'
import SelectedGroupContext from '../../components/Contexts/SelectedGroup'
import { createOrUpdateContact } from '../../connections/allContacts'
import { makeContactWithIdentitiesAddresses } from '../../helpers/contacts'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildIdentitiesQueryByContact
} from '../../queries/queries'

const ContactFormModal = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const client = useClient()
  const { contactId } = useParams()

  const { selectedGroup } = useContext(SelectedGroupContext)
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)
  // Tip to avoid that, when submitting the form, the fields are filled with old information for a short time.
  const [contactWithNewData, setContactWithNewData] = useState(null)

  const contactsQueryByFamilyNameGivenNameEmailCozyUrl =
    buildContactsQueryByFamilyNameGivenNameEmailCozyUrl()

  const contacts = useQueryAll(
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.definition,
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.options
  )
  const currentContact = contacts?.data?.find(
    contact => contact._id === contactId
  )

  const isContactsQueryEnabled =
    currentContact && currentContact.me && currentContact.address?.length === 0
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

  /**
   * @param {import('cozy-client/types/types').IOCozyContact} formData - Contact document (except _id, _rev & _type attrs to create a new contact)
   */
  const handleFormSubmit = async formData => {
    setContactWithNewData(formData)
    setIsFormBeingSubmitted(true)
    try {
      await createOrUpdateContact({
        client,
        isUpdated: !!currentContact,
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
    currentContact,
    identities
  )

  return (
    <FixedDialog
      open
      onClose={onClose}
      size="large"
      title={currentContact ? t('edit-contact') : t('create_contact')}
      content={
        <ContactForm
          contact={contactWithNewData || contactWithIdentitiesAddresses}
          onSubmit={handleFormSubmit}
          contacts={contacts}
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
