import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useClient, useQuery, useQueryAll } from 'cozy-client'
import AddModal from 'cozy-ui-plus/dist/Contacts/AddModal'
import { useSelectedGroup } from 'cozy-ui-plus/dist/Contacts/GroupsSelect/GroupsSelectProvider'

import { createOrUpdateContact } from '@/connections/allContacts'
import { makeContactWithIdentitiesAddresses } from '@/helpers/contacts'
import {
  buildContactsQueryByFamilyNameGivenNameEmailCozyUrl,
  buildIdentitiesQueryByContact
} from '@/queries/queries'

const EditModal = () => {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const [searchParams] = useSearchParams()
  const client = useClient()
  const { selectedGroup } = useSelectedGroup()

  const backToRoot = searchParams.get('backToRoot')

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

  const onClose = () => (backToRoot ? navigate('/') : navigate(`/${contactId}`))

  return (
    <AddModal
      contacts={contacts}
      contact={contactWithIdentitiesAddresses}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )
}

export default EditModal
