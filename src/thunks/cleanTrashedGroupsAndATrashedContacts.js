import {
  deleteTrashedContacts,
  removeGroupFromAllContacts
} from '../connections/allContacts'
import { deleteGroupById } from '../connections/allGroups'
import { buildContactGroupsTrashedQuery } from '../queries/queries'

/**
 * Clean trashed groups and associated trashed contacts
 *
 * @param {Object} client - CozyClient
 */
const cleanTrashedGroupsAndATrashedContacts = async client => {
  const contactGroupsTrashedQuery = buildContactGroupsTrashedQuery()

  const { data: trashedGroups } = await client.query(
    contactGroupsTrashedQuery.definition(),
    contactGroupsTrashedQuery.options
  )
  for (const trashedGroup of trashedGroups) {
    await removeGroupFromAllContacts(client, trashedGroup._id)
    await deleteGroupById(client, trashedGroup._id)
  }
  await deleteTrashedContacts(client)
}

export default cleanTrashedGroupsAndATrashedContacts
