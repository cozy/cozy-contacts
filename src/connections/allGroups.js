import { withMutations } from 'cozy-client'

const withGroupsMutations = withMutations(client => ({
  createGroup: attributes =>
    client.create('io.cozy.contacts.groups', attributes),
  updateGroup: group => client.save(group),
  deleteGroup: group => client.destroy(group)
}))

export default withGroupsMutations

export const allGroupsQuery = client =>
  client
    .find('io.cozy.contacts.groups')
    .where({
      trashed: { $exists: false }
    })
    .sortBy([{ name: 'asc' }])
    .indexFields(['name'])
