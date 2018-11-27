import { withMutations } from 'cozy-client'
import { DOCTYPE_CONTACT_GROUPS } from '../helpers/doctypes'

const withGroupsMutations = withMutations(client => ({
  createGroup: attributes => client.create(DOCTYPE_CONTACT_GROUPS, attributes),
  updateGroup: group => client.save(group),
  deleteGroup: group => client.destroy(group)
}))

export default withGroupsMutations

export const allGroupsQuery = client =>
  client
    .find(DOCTYPE_CONTACT_GROUPS)
    .where({
      trashed: { $exists: false }
    })
    .sortBy([{ name: 'asc' }])
    .indexFields(['name'])
