import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient, useQuery, useQueryAll } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useSelectedGroup } from 'cozy-ui/transpiled/react/Contacts/GroupsSelect/GroupsSelectProvider'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactForm, {
  getSubmitContactForm
} from '../../components/ContactCard/ContactForm'
import { createOrUpdateContact } from '../../connections/allContacts'
import { makeContactWithIdentitiesAddresses } from '../../helpers/contacts'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildIdentitiesQueryByContact
} from '../../queries/queries'

const ContactFormModal = ({
  contacts,
  currentContact,
  contactWithIdentitiesAddresses,
  onSubmit,
  onClick,
  onClose
}) => {
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const [isBusy, setIsBusy] = useState(false)
  // Tip to prevent fields from being filled with old information for a short period of time during form submission.
  const [contactWithNewData, setContactWithNewData] = useState(null)

  /**
   * @param {import('cozy-client/types/types').IOCozyContact} formData - Contact document (except _id, _rev & _type attrs to create a new contact)
   */
  const handleFormSubmit = async formData => {
    setContactWithNewData(formData)
    setIsBusy(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setIsBusy(false)
      console.warn(err) // eslint-disable-line no-console
      showAlert({ severity: 'error', message: t('error.save') })
    }
  }

  return (
    <FixedDialog
      open
      onClose={onClose}
      size="large"
      title={currentContact ? t('edit-contact') : t('create_contact')}
      content={
        <ContactForm
          contacts={contacts}
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
            busy={isBusy}
            onClick={onClick}
          />
        </>
      }
    />
  )
}

const ContactFormModalWrapper = () => {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const client = useClient()
  const { selectedGroup } = useSelectedGroup()

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

  const contactWithIdentitiesAddresses = makeContactWithIdentitiesAddresses(
    currentContact,
    identities
  )

  const onSubmit = async formData =>
    await createOrUpdateContact({
      client,
      oldContact: currentContact,
      formData,
      selectedGroup
    })

  const triggerFormSubmit = event => {
    const submitContactForm = getSubmitContactForm()
    submitContactForm(event)
  }

  const onClose = () => (contactId ? navigate(`/${contactId}`) : navigate('/'))

  return (
    <ContactFormModal
      contacts={contacts}
      currentContact={currentContact}
      contactWithIdentitiesAddresses={contactWithIdentitiesAddresses}
      onSubmit={onSubmit}
      onClick={triggerFormSubmit}
      onClose={onClose}
    />
  )
}

export default ContactFormModalWrapper
