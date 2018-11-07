import { withMutations } from 'cozy-client'
import flow from 'lodash/flow'

export const withGroupsMutations = withMutations(client => ({
  createGroup: attributes =>
    client.create('io.cozy.contacts.groups', attributes),
  updateGroup: group => client.save(group),
  deleteGroup: group => client.destroy(group)
}))

export default flow(withGroupsMutations)
