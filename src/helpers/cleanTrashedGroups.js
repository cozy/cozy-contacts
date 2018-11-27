import { DOCTYPE_CONTACT_GROUPS, DOCTYPE_CONTACTS } from './doctypes'

const cleanTrashedGroups = () => async (dispatch, getState, { client }) => {
  const { data: trashedGroups } = await client.query(
    client.find(DOCTYPE_CONTACT_GROUPS).where({ trashed: true })
  )
  for (const trashedGroup of trashedGroups) {
    await removeGroupFromAllContacts(client, trashedGroup._id)
    await client.destroy(trashedGroup)
  }

  dispatch({
    type: 'CLEAN_TRASHED_GROUPS',
    groups: trashedGroups
  })
}

const removeGroupFromAllContacts = async (client, groupId) => {
  const { data: contacts, next: hasMore } = await client.query(
    client.find(DOCTYPE_CONTACTS).where({
      groups: {
        $elemMatch: {
          _id: groupId,
          _type: DOCTYPE_CONTACT_GROUPS
        }
      }
    })
  )

  const groupRemovals = contacts.map(contact => {
    const contactWithoutGroup = removeGroupFromContact(contact, groupId)
    return client.save(contactWithoutGroup)
  })

  await Promise.all(groupRemovals)

  if (hasMore) return removeGroupFromAllContacts(client, groupId)
}

const removeGroupFromContact = (contact, groupId) => ({
  ...contact,
  groups: contact.groups.filter(group => group._id !== groupId)
})

export default cleanTrashedGroups
