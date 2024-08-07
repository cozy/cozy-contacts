import { DOCTYPE_CONTACT_GROUPS } from '../helpers/doctypes'
import { buildGroupQueryById } from '../queries/queries'

export const createGroup = (client, attributes) =>
  client.create(DOCTYPE_CONTACT_GROUPS, attributes)

export const updateGroup = (client, group) => client.save(group)

export const deleteGroup = (client, group) => client.destroy(group)

/**
 * Delete group by id
 *
 * @param {Object} client - CozyClient
 * @param {Object} groupId - Group id
 * @returns {Promise<Object[]>} - Deleted group
 */
export const deleteGroupById = async (client, groupId) => {
  const groupQueryById = buildGroupQueryById(groupId)

  const { data: group } = await client.query(
    groupQueryById.definition(),
    groupQueryById.options
  )

  return client.destroy(group)
}

/**
 * Update group to trash them
 *
 * @param {Object} client - CozyClient
 * @param {Object} groupId - Group id
 * @returns {Promise<Array>} - Updated group
 */
export const trashedGroupById = async (client, groupId) => {
  const groupQueryById = buildGroupQueryById(groupId)
  const { data: group } = await client.query(
    groupQueryById.definition(),
    groupQueryById.options
  )
  const groupTrashed = {
    ...group,
    trashed: true
  }

  const { data: groupUpdated } = await client.save(groupTrashed) // updateGroup(client, groupTrashed)

  return groupUpdated
}

/**
 * Cancel trash group
 *
 * @param {Object} client - CozyClient
 * @param {String} groupId - Group id
 */
export const cancelTrashGroupById = async ({
  client,
  groupId,
  deleteAssociatedContacts,
  showAlert,
  t,
  contactsTrashCount
}) => {
  const groupQueryById = buildGroupQueryById(groupId)
  const { data: group } = await client.query(
    groupQueryById.definition(),
    groupQueryById.options
  )

  await updateGroup(client, {
    ...group,
    trashed: false
  })

  const translationKey = deleteAssociatedContacts
    ? contactsTrashCount > 0
      ? 'groups.remove_cancel_with_contacts'
      : 'groups.remove_cancel_without_contacts'
    : 'groups.remove_canceled'

  showAlert({
    severity: 'secondary',
    message: t(translationKey, {
      name: group.name,
      smart_count: contactsTrashCount
    })
  })
}
