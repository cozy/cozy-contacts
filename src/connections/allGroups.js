import { DOCTYPE_CONTACT_GROUPS } from '../helpers/doctypes'

export const createGroup = (client, attributes) =>
  client.create(DOCTYPE_CONTACT_GROUPS, attributes)

export const updateGroup = (client, group) => client.save(group)

export const deleteGroup = (client, group) => client.destroy(group)
