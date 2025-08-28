import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useClient, useQuery, useQueryAll } from 'cozy-client'
import { useSelectedGroup } from 'cozy-ui/transpiled/react/Contacts/GroupsSelect/GroupsSelectProvider'

import { createOrUpdateContact } from '../../connections/allContacts'
import { makeContactWithIdentitiesAddresses } from '../../helpers/contacts'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildIdentitiesQueryByContact
} from '../../queries/queries'

import AddModal from '@/components/AddModal'
import { getSubmitContactForm } from '@/components/AddModal/ContactForm'

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

  const contact = contacts?.data?.find(contact => contact._id === contactId)

  const isContactsQueryEnabled =
    contact && contact.me && contact.address?.length === 0

  const indentitiesContactsQueryById = buildIdentitiesQueryByContact(
    isContactsQueryEnabled
  )
  const { data: identities } = useQuery(
    indentitiesContactsQueryById.definition,
    indentitiesContactsQueryById.options
  )

  const contactWithIdentitiesAddresses = makeContactWithIdentitiesAddresses(
    contact,
    identities
  )

  const onSubmit = async formData =>
    await createOrUpdateContact({
      client,
      oldContact: contact,
      formData,
      selectedGroup
    })

  const triggerFormSubmit = event => {
    const submitContactForm = getSubmitContactForm()
    submitContactForm(event)
  }

  const onClose = () => (contactId ? navigate(`/${contactId}`) : navigate('/'))

  return (
    <AddModal
      contacts={contacts}
      contact={contactWithIdentitiesAddresses}
      onSubmit={onSubmit}
      onClick={triggerFormSubmit}
      onClose={onClose}
    />
  )
}

export default ContactFormModalWrapper
