import {
  buildContactGroupsTrashedQuery,
  buildContactsQueryByGroupId
} from '../queries/queries'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'

const cleanTrashedGroups = () => {
  return async (dispatch, getState, { client }) => {
    const contactGroupsTrashedQuery = buildContactGroupsTrashedQuery()

    const { data: trashedGroups } = await client.query(
      contactGroupsTrashedQuery.definition
    )
    //eslint-disable-next-line
    for (const trashedGroup of trashedGroups) {
      await removeGroupFromAllContacts(client, trashedGroup._id)
      await client.destroy(trashedGroup)
    }

    dispatch({
      type: 'CLEAN_TRASHED_GROUPS',
      groups: trashedGroups
    })
  }
}

const removeGroupFromAllContacts = async (client, groupId) => {
  const contactQueryByGroupId = buildContactsQueryByGroupId(groupId)

  const { data, next: hasMore } = await client.query(
    contactQueryByGroupId.definition
  )

  const contacts = client.hydrateDocuments(DOCTYPE_CONTACTS, data)

  const groupRemovals = contacts.map(contact => {
    return contact.groups.removeById(groupId)
  })

  await Promise.all(groupRemovals)

  if (hasMore) return removeGroupFromAllContacts(client, groupId)
}

export default cleanTrashedGroups
