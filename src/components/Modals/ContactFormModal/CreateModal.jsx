import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient, useQueryAll } from 'cozy-client'
import AddModal from 'cozy-ui-plus/dist/Contacts/AddModal'
import { useSelectedGroup } from 'cozy-ui-plus/dist/Contacts/GroupsSelect/GroupsSelectProvider'

import { createOrUpdateContact } from '@/connections/allContacts'
import { buildContactsQueryByFamilyNameGivenNameEmailCozyUrl } from '@/queries/queries'

const CreateModal = () => {
  const navigate = useNavigate()
  const client = useClient()
  const { selectedGroup } = useSelectedGroup()

  const contactsQueryByFamilyNameGivenNameEmailCozyUrl =
    buildContactsQueryByFamilyNameGivenNameEmailCozyUrl()

  const contacts = useQueryAll(
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.definition,
    contactsQueryByFamilyNameGivenNameEmailCozyUrl.options
  )

  const onSubmit = async formData =>
    await createOrUpdateContact({
      client,
      formData,
      selectedGroup
    })

  const onClose = () => navigate('/')

  return <AddModal contacts={contacts} onSubmit={onSubmit} onClose={onClose} />
}

export default CreateModal
