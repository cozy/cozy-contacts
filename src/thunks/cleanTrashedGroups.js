import { Q } from 'cozy-client'
import { DOCTYPE_CONTACT_GROUPS, DOCTYPE_CONTACTS } from '../helpers/doctypes'

const cleanTrashedGroups = () => async (dispatch, getState, { client }) => {
  const { data: trashedGroups } = await client.query(
    Q(DOCTYPE_CONTACT_GROUPS)
      .where({ trashed: true })
      .indexFields(['trashed'])
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

const removeGroupFromAllContacts = async (client, groupId) => {
  const { data, next: hasMore } = await client.query(
    Q(DOCTYPE_CONTACTS)
      .where({
        relationships: {
          groups: {
            data: {
              $elemMatch: {
                _id: groupId,
                _type: DOCTYPE_CONTACT_GROUPS
              }
            }
          }
        }
      })
      .indexFields(['relationships.groups.data'])
  )

  const contacts = client.hydrateDocuments(DOCTYPE_CONTACTS, data)

  const groupRemovals = contacts.map(contact => {
    return contact.groups.removeById(groupId)
  })

  await Promise.all(groupRemovals)

  if (hasMore) return removeGroupFromAllContacts(client, groupId)
}

export default cleanTrashedGroups
